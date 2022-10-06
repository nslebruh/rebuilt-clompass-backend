import { AppDataSource } from "./data-source"
import * as cors from "cors"
import { TypeormStore } from "connect-typeorm"
import * as express from "express"
import * as Entity from "./entity"
import * as bodyParser from "body-parser"
import * as session from "express-session"
import {object, oneOf, string} from "checkeasy"
import {genSalt, hash, compare} from "bcrypt"
import { get, post, update, remove} from "./routes"
const PORT = process.env.PORT || 3001
import responseTime = require("response-time")
import * as https from "https"
import * as fs from "fs"
//const key = fs.readFileSync(__dirname + "/../../localhost-key.pem")
//const cert = fs.readFileSync(__dirname + "/../../localhost.pem")

declare module 'express-session' {
    interface SessionData {
        user: {
            id: number
            ssid: string
            type: string
        }
    }
  }

const sleep = async (ms: number) => {
    return new Promise((res, rej) => {
        setTimeout(res, ms)
    })
}

AppDataSource.initialize().then(async () => {
    

    console.log("Loading students from the database...")
    const students = await AppDataSource.manager.find(Entity.Student, {
        relations: {
            subjects: true
        }
    })
    console.log("Loading subjects from the database...")
    const subjects = await AppDataSource.manager.find(Entity.Subject, {
        relations: {
            students: true
        }
    })
    const sessions = AppDataSource.getRepository(Entity.Session)

    console.log("Loaded students: ", students)
    console.log("Loaded subjects: ", subjects)

    
    const app = express()
    app.set("trust proxy", true)
    app.use(session({
        resave: false,
        secret: "test",
        name: "test",
        cookie: {
            secure: true,
        },
        saveUninitialized: false,
        store: new TypeormStore({
            cleanupLimit: 1,
            limitSubquery: false,
            ttl: 86400,
        }).connect(sessions)
        
    }))
    app.use(cors({
        origin: 'https://new.clompass.com',
        methods: ['POST', 'GET'],
        credentials: true,
      }));
    
    app.use(responseTime())
    

    const isAuthenticated = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log("Authenticating")
        console.log(req.session)
        console.log(req.session.user)
        if (req.session.user && req.session.user.id > 0) {
            console.log("Authenticated user: " + req.session.user)
            res.locals.user = req.session.user
            next()
        } 
        else {
            res.status(401).end("Not authenticated bozo")
            return
        } 
    }

    app.get("/checkAuth", isAuthenticated, async (req, res, next) => {
        console.log("Successfully authenticated")
        res.status(200).send("Successfully authenticated")
        
    })
    app.use("/get",  isAuthenticated, bodyParser.json(), get)
    app.use("/create", isAuthenticated, bodyParser.urlencoded({extended: false}),  post)
    app.use("/update", isAuthenticated, bodyParser.urlencoded({extended: false}), update)
    app.use("/delete", isAuthenticated, bodyParser.urlencoded({extended: false}), remove)
    // test endpoint
    app.get("/api", (req, res) => {
        res.status(200).send("pog")
    })

    app.post("/signup", async (req, res, next) => {
        try {
            const {ssid, password, email, type} = req.body
            next()
        } catch (error) {
            console.log(error)
            res.status(400).send("Bad request bozo")
        }
    }, async (req, res, next) => {
        try {
            const {ssid, password, email, type} = req.body
            const auth = new Entity.Auth
            auth.email = email
            auth.ssid = ssid
            auth.type = type
            const salt = await genSalt(10)
            const hashedPassword = await hash(password, salt)
            auth.password = hashedPassword
            const data = await AppDataSource.manager.save(auth)
            console.log(data)
            res.locals.user = {id: data.id, ssid: data.ssid, type: data.type}
            req.session.regenerate(function (err) {
                if (err) next(err);
                console.log(req.body)
                
                // store user information in session, typically a user id
                req.session.user = res.locals.user
                // save the session before redirection to ensure page
                // load does not happen before session is saved
                req.session.save(function (err) {
                  if (err) return res.status(500).send("An error occured bozo")
                  console.log(req.session)
                  next()
                })
            }) 
        } catch (error) {
            console.log(error)
            res.status(400).send("Bad request bozo")
        }
    }, async (req, res) => {
        req.session.user = res.locals.user
        res.status(200).send("User created")
    })

    app.post("/signin", async (req, res, next) => {
        console.log("Initial signin req.session.userId " + req.session.user)
        const body = req.body
        try {
            object(
                {    
                    username: string(),    
                    password: string(),
                    type: oneOf(["email", "ssid"] as const)
                })(body, "signIn")
        } catch (err) {
            console.log(err)
            res.status(400).send("Bad request bozo")
            return
        }
        await AppDataSource.getRepository(Entity.Auth).createQueryBuilder("auth").where(`auth.${body.type} = :user`, {user: body.username}).execute()
            .then(async (user) => {
                if (user.length) {
                    // check user password with hashed password stored in the database
                    const validPassword = await compare(body.password, user[0].auth_password);
                    if (validPassword) {
                      console.log("Valid password")
                      res.locals.user = {id: user[0].auth_id, ssid: user[0].auth_ssid, type: user[0].auth_type}
                      req.session.regenerate(function (err) {
                        if (err) next(err);
                        console.log(res.locals.user)
        
                        // store user information in session, typically a user id
                        req.session.user = res.locals.user
                        // save the session before redirection to ensure page
                        // load does not happen before session is saved
                        req.session.save(function (err) {
                          if (err) return next(err)
                          console.log("Saved session: " + req.session)
                          next()
                        })
                      })
                    } else {
                      res.status(401).json({ error: "Password not valid" });
                    }
                } else {
                    res.status(401).json({ error: "User doesn't exist" });
                }
            })
    }, async (req, res) => {
        req.session.user = res.locals.user
        console.log(req.session)
        res.status(200).send(req.session)
})
        

    app.get('/signout', function (req, res, next) {
        // logout logic
      
        // clear the user from the session object and save.
        // this will ensure that re-using the old session id
        // does not have a logged in user
        req.session.user = null
        req.session.save(function (err) {
          if (err) next(err)
      
          // regenerate the session, which is good practice to help
          // guard against forms of session fixation
          req.session.regenerate(function (err) {
            if (err) next(err)
            next()
          })
        })
      }, async (req, res) => {
        res.status(200).send("Successfully logged out")
      })
    // Catch all endpoints 

    app.post("/*", async (req, res) => {
        console.log(req.url)
        res.status(404).send("This doesn't exist bozo")
    })

    app.get("/*", async (req, res) => {
        console.log(req.url)
        res.status(404).send("This doesn't exist bozo")
    })

    //app.listen(PORT, () => {
    //    console.log("listening on port " + PORT)
    //})
    https.createServer(/*{key: key, cert: cert},*/ app).listen(PORT, () => {
        console.log("listening on port " + PORT)
    })


}).catch(error => console.log(error))
