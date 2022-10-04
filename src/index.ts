import { AppDataSource } from "./data-source"
import * as cors from "cors"
import { TypeormStore } from "connect-typeorm"
import * as express from "express"
import * as Entity from "./entity"
import * as bodyParser from "body-parser"
import * as session from "express-session"
import favicon = require("serve-favicon")
import {object, oneOf, string} from "checkeasy"
import {genSalt, hash, compare} from "bcrypt"
import { get, post, update, remove} from "./routes"
const PORT = process.env.PORT || 3001
import * as https from "https"
import * as fs from "fs"
const img = Buffer.from("AAABAAQAEBAAAAEAIADvv70BAABGAAAAGBgAAAEAIAAMAwAAKQIAACAgAAABACAAOQMAADUFAABAQAAAAQAgAO+/vQYAAG4IAADvv71QTkcNChoKAAAADUlIRFIAAAAQAAAAEAgDAAAAKC0PUwAAAO+/vVBMVEUiIiIiIiIiIiIiIiIiIiIiIiIyUFg9cu+/vSk3Oyo6Pkjvv73vv70tQkdF77+977+9OGRvNVhiNltlS++/ve+/vUvvv73vv70xTVU5Z3MzU1xJ77+977+9Omd0JzAzQHvvv71W77+977+9VO+/ve+/vUF977+9Vu+/ve+/vUB577+9NlxmSO+/ve+/vS1DSUnvv73vv71F77+977+9KztAN19pN19qRu+/ve+/vUrvv73vv71L77+977+9SO+/ve+/vS1CSGHvv73vv70sQEZD77+977+9TO+/ve+/vSYuMFfvv73vv71O77+977+9Se+/ve+/vSQpK0Lvv73vv71K77+977+9Uu+/ve+/vT9277+9PnPvv70+de+/vVPvv73vv709cX9Q77+977+9UO+/ve+/vVDvv73vv70sP0Q0VV4lKy1N77+977+9S++/ve+/vSUrLDJPWCs8QUzvv73vv70jJiZE77+977+9JSwuSe+/ve+/vXbvv71U77+9AAAABXRSTlNJ77+977+9Su+/vWXvv71l77+9AAAA77+9SURBVHgBTe+/ve+/vVpFQQzvv73vv73Zswnvv73vv70lUu+/ve+/ve+/ve+/vVRUaO+/vUfvv73vv70s77+977+977+9PQPvv70W77+9f++/vW3vv71m77+9bW5m77+9Qe+/vSTvv70+IQPvv71n77+977+9SGfvv73vv71F34/ctX0CCQbdu++/ve+/ve+/ve+/vWsQZBPvv73vv73vv71KbxHvv73vv73vv70z77+9TCJK77+977+977+977+977+977+9Ue+/vSTvv73vv73EvB9mZu+/vSzvv701aTkCGcyf77+9SO+/vRwvbUIC77+977+9d++/ve+/vXc7RA3vv70rJu+/vVfvv70V77+977+977+9RO+/vW8UQMq0Uknvv73vv71C77+9b20aLgfbswfvv70AAAAASUVORO+/vUJg77+977+9UE5HDQoaCgAAAA1JSERSAAAAGAAAABgIAwAAANep77+977+9AAABZVBMVEUiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIyUlpO77+977+9Su+/ve+/vTNSW0rvv73vv70pNTlZ77+977+9MEtTNFdgUe+/ve+/vUzvv73vv70lKy0wSlIpNjo6Z3RD77+977+9IiMjP3bvv71V77+977+9P3fvv708bnsmLS9Z77+977+9PXF/Oml1Qn/vv71Bfe+/vUF777+9Qu+/ve+/vS9JUFDvv73vv709ce+/vUvvv73vv71f77+977+9TO+/ve+/vSQoKTtselLvv73vv71h77+977+9Se+/ve+/vVrvv73vv70zVV4xTVUzVF1a77+977+9Se+/ve+/vVjvv73vv71G77+977+9LUJHUO+/ve+/vTZbZSxARTVaZE/vv73vv70tQkhY77+977+9Kz1BV++/ve+/vSxARlfvv73vv71R77+977+9P3bvv71X77+977+9KzxBQHnvv70iIyRc77+977+9NFdhXO+/ve+/vVPvv73vv70kKCouRUxe77+977+9Vu+/ve+/vTZdaCMkJUfvv73vv70jJic7andW77+977+9LUNJTO+/ve+/vVrvv73vv71e77+977+9PnXvv71T77+977+9L0hOTe+/ve+/vV/vv73vv71c77+977+9Te+/ve+/vThkb0Tvv73vv71E77+977+9PnTvv70rPUJb77+977+9LD5DPnTvv708b31Aee+/vTBMUy5FS1Tvv73vv70kJyglLC5Bfu+/vVfvv73vv71D77+977+9JSssXO+/ve+/vUMh77+9HQAAAAd0Uk5TBu+/ve+/ve6QiO+/ve+/vUfvv73vv70AAAFPSURBVHgBbO+/ve+/vULvv71RFO+/ve+/vXXvv73vv71fyLM877+9Fu+/ve+/vXYcZe+/ve+/vQbvv73vv73vv71hFjYWQc6+77+9FwTvv71277+9ewdA77+9BwBFJwDvv71kAEnvv70h77+9HO+/ve+/vRogAO+/vUPvv73vv71U77+9C++/vWcAHAAx77+9RSjvv70FFO+/vVNRcxrvv71pDcSP77+9Wu+/ve+/vRZWBu+/vQsAAu+/vSnvv71nIe+/ve+/vWjvv73vv70QAnQF77+9LWl977+977+9Ee+/vTzvv70/Fe+/ve+/vWxCWmHEtDR7RO+/veKMu19lOO+/vXnHge+/ve+/vR8z77+9Ke+/ve+/vT/vv71mOzgu77+9HO+/vXTvv70977+9Ow4JOu+/vTUyZn9LWu+/vX9sEu+/ve+/vdia77+9OS7vv70j77+977+9AkHvv71x77+977+977+9FgYf77+977+9Vu+/ve+/vWA9AwMk77+977+9P1/vv73vv73vv70F77+9cU3vv70u77+9SiQPCj9ece+/ve+/ve+/vduP77+9Ln0s77+977+9c++/ve+/vQwMX1R0dNS+ABUxIwfvv70vKO+/vS1bBhLvv73vv71g77+977+9YO+/vQTvv73vv73vv73vv71aH2Q177+977+977+977+9P++/vWViWu+/vd6IaS7vv73vv70MEBnvv71xzoQrMe+/vQF9wow177+9AADvv73vv71k77+9R++/ve+/ve+/vQAAAABJRU5E77+9QmDvv73vv71QTkcNChoKAAAADUlIRFIAAAAgAAAAIAgDAAAARO+/ve+/ve+/vQAAAUFQTFRFAAAAIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiMlJaVu+/ve+/vV/vv73vv71V77+977+9PXLvv70kKCknMjVd77+977+9Q++/ve+/vTBMUzxvfVjvv73vv71Y77+977+9MEpRPXB+RO+/ve+/vTxue1bvv73vv71F77+977+9OGRvX++/ve+/vUXvv73vv71G77+977+9SO+/ve+/vTlkcF/vv73vv71I77+977+9Se+/ve+/vUbvv73vv702W2Vg77+977+9YO+/ve+/vUzvv73vv70vR01f77+977+9Ve+/ve+/vScwMlDvv73vv70vSVBQ77+977+9WO+/ve+/vSYvMTtseTNSW2Dvv73vv71H77+977+9VO+/ve+/vVzvv73vv71h77+977+9MU9XIiMjUe+/ve+/vWHvv73vv71S77+977+9PXHvv71g77+977+9LkVMKz1BVO+/ve+/vS1DSUvvv73vv70jJidD77+977+9Xu+/ve+/vUnvv73vv70mLjA0VV5e77+977+9QHnvv71a77+977+9JCgqW++/ve+/vV7vv73vv70sP0RS77+977+9IiMkMU5WMU1URO+/ve+/vT5177+9O2t4R++/ve+/vVLvv73vv70vSE4mLS9Aee+/vT5z77+9PnTvv71Aeu+/vV3vv73vv71Q77+977+9JCcoRO+/ve+/vV3vv73vv708bnwwSlJV77+977+9Du+/vVzvv70AAAAJdFJOUwAl77+977+9J++/ve+/vSjvv71+77+977+977+9AAAB77+9SURBVHgB77+977+9A++/vUMxFEZf3b9Nbdu2NO+/vW1777+9C++/ve+/vW7vv73vv73vv73vv70J77+9BEEk77+977+9ByRi77+9IEhl77+9Be+/vVQQ77+9V++/ve+/vWh/77+977+9aO+/vTpQdFoNUe+/vTBALmDvv73vv71gNO+/vS1WG2Dvv71a77+9Ju+/vUHvv70BI++/ve+/vWJr77+977+977+977+977+977+9Pi4nJ++/vQNgBEMkCEbvv73vv70J77+9KBjvv714IjZYEO+/vQRjEu+/vVTvv73vv71M77+9QEka77+9O2QAZC3vv71877+9UCwByJQ577+9Uu+/ve+/vRvvv71mMxTvv73vv71G77+9Vm1NC++/vVjvv73vv73vv73vv70Z77+9F0BZ77+9N++/ve+/ve+/ve+/vU7vv709Ehbvv70M77+977+977+9yqp1DX3WrO+/vSvvv71l77+9YWlxIO+/ve+/vTc277+977+977+977+9PWgN77+9Wu+/ve+/ve+/vRxsAe+/vRvvv71977+9Bsqx77+9W0bvv71JOUHvv71rOQbvv73vv73vv70L77+9FO+/vTPvv73vv705E86h77+9cUJ+77+977+9Yu+/ve+/ve+/vVVf77+9Xu+/ve+/vQBbB++/ve+/vQ5377+977+9e3rvv70Hdu+/vRt677+977+9KO+/ve+/vSjvv73vv70o77+977+9B++/ve+/vWbvv71x77+977+9R++/ve+/ve+/vWvvv73vv73vv71Z77+9Fu+/ve+/vWbvv73vv73vv71+77+9Oio077+9UVxPPu+/ve+/ve+/ve+/ve+/vTx/15Pvv71X77+977+977+9WnwH3ovvv70377+977+977+9alTvv73vv73vv71uD++/ve+/ve+/vQ/vv73vv71gJEjvv70r77+9R0/vv73vv73vv70q77+9eO+/ve+/ve+/vQHvv71YKnwC77+9GF7vv70FD2QPAAAAAElFTkTvv71CYO+/ve+/vVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAADvv73vv73vv73vv70AAAI6UExURQAAACIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiUrLUB577+9V++/ve+/vWDvv73vv71e77+977+9U++/ve+/vUPvv73vv70sPkMqODxY77+977+9Ye+/ve+/vWHvv73vv71N77+977+9KzxBYe+/ve+/vVjvv73vv70jJSVU77+977+9TO+/ve+/vT1xfz5177+9S++/ve+/vWDvv73vv71Bfe+/vUzvv73vv704ZG89cu+/vSUrLEB577+9Xu+/ve+/vVPvv73vv70pNTk9ce+/vVDvv73vv71V77+977+9IiMkUO+/ve+/vVzvv73vv70wSlFR77+977+9IiMjVe+/ve+/vSMmJl/vv73vv70+dO+/vT5z77+9YO+/ve+/vV/vv73vv701WWMxT1c1WmQxTlYrPUIxTVUrO0AvR01c77+977+9Kjs/M1NcKTg8MlJaX++/ve+/vSs9QV3vv73vv70sQEYsQEUmLS8wS1M3YWxP77+977+9OWRwOGFtQn7vv71F77+977+9UO+/ve+/vU7vv73vv70nMDIzVF1d77+977+9P3jvv70zVV5D77+977+9NlxnVe+/ve+/vSYuMETvv73vv703X2lS77+977+9SO+/ve+/vUnvv73vv71N77+977+9JCgqP3bvv71a77+977+9WO+/ve+/vS1BRyMkJVvvv73vv704Y29b77+977+9V++/ve+/vUPvv73vv70nMjU/du+/vThibiUqK0zvv73vv71O77+977+9MlBYKTc7PXB+KDU4Xu+/ve+/vVDvv73vv700V2FR77+977+9VO+/ve+/vTBKUlHvv73vv71U77+977+9Se+/ve+/vTZdaFLvv73vv71U77+977+9MExTRu+/ve+/vTllcUXvv73vv71F77+977+9OWdzRu+/ve+/vUPvv73vv70jJidc77+977+9YO+/ve+/vSYvMTZcZkLvv73vv71Be++/vVLvv73vv71d77+977+9KDQ3JSwuKjo+Kjk9OWZyOmd0N15pVe+/ve+/vT9377+9Wu+/ve+/vVjvv73vv71e77+977+9Ue+/ve+/vUjvv73vv70pNjpW77+977+9JzAzNFVeRe+/ve+/vS5FTC5GTUvvv73vv71Aeu+/vVPvv70cDgAAABl0Uk5TACrvv73vv73vv73vv70G77+977+977+9Ce+/ve+/ve+/vSvvv73vv73vv73vv73UkCzvv73vv73vv73vv709Vu+/vQAABAxJREFUeAHvv73LtQFDIQAE77+974qW77+9Q3zvv70F77+977+9BV55Ul3vv71N77+977+9T13vv73vv73vv73vv70wTu+/vTLvv73vv73vv73vv70iGxnvv73vv73vv70oMFYV77+9KO+/vVklUERULX4obe+/ve+/vSHvv71LDO+/vVnvv70Vfu+/ve+/ve+/vUnvv71me++/ve+/vR/vv73vv71hf++/ve+/ve+/ve+/vTPvv73vv71PcCbvv70c0KTvv73vv70AeO+/ve+/vSPvv71q77+977+92rZt77+9be+/ve+/vWMpXW3vv73vv73vv73vv70pxqdnZu+/vRRoa++/ve+/ve+/vdKg77+9Z2fvv73Hme+/ve+/vRnvv70rWO+/ve+/ve+/vXVpeQVW16rvv71r77+977+977+9XFvvv706LO+/vQg277+977+9asSyDTvvv70i77+9O++/ve+/vVjvv73vv70B77+9Zu+/ve+/vRHvv73vv73vv73vv73vv71T77+977+977+977+9OD3vv71v77+9O++/ve+/ve+/vSgY77+977+977+906VCa++/vWXvv73vv70VXBsFN3Arbe+/ve+/ve+/ve+/vU7vv70877+977+9Ue+/vQhP77+977+977+9Be+/ve+/ve+/vXnvv71n77+9FXR077+977+9G2/vv73vv73vv73vv73vv73vv71W77+9Ae+/ve+/ve+/vXMC77+977+977+977+977+977+9Jl/vv71hFO+/ve+/ve+/vVYVfu+/ve+/vRk/77+9Kjjvv73vv71RIDs477+977+9LO+/ve+/ve+/vQtm77+977+977+9HTEL77+9eO+/ve+/vden77+9BCrvv73vv73vv71B77+977+977+9YSMI77+977+9Fu+/ve+/vSPvv71uUO+/vWkr77+977+9Q++/vSzvv73vv73vv73vv73vv71f77+9TmLvv73vv73DuO+/vQUA77+9SO+/vUIq77+90qYg77+9TCgAXjzvv73Dge+/vUw2B3BK77+9UO+/ve+/vQjvv73vv73vv73vv70lIu+/vVIs77+9OQXvv71lM2VS77+9YTHvv70oCu+/ve+/vXHvv7042Y7vv73vv71tS8uxbca2be+/ve+/ve+/vXlpIe+/vQ7Oqlnvv71177+977+977+9X++/ve+/vT9p77+977+977+9K++/vQ/vv73vv71BEXwW77+9e++/ve+/ve+/vT/vv73vv71fRW4BKS4BSu+/vUTvv70877+9Cu+/ve+/ve+/vVpcVHPvv71SKggoFwnvv73vv70FSu+/ve+/vQLvv711EFgvGg00ShM577+977+9Ne+/vURF77+9NGvvv70077+9Jmnvv71WNO+/vQLvv73vv73vv70WCO+/ve+/vXZzZjrvv71nLO+/ve+/ve+/vUJD77+977+9JO+/vQjvv73vv73vv73ugYfvv71AEe+/vUlfPwM8HRTvv70hDF7vv73vv73vv73Tve+/ve+/ve+/ve+/vULvv70lEEzvv71377+9GAZGRDHvv73vv73vv70oRu+/vR7vv73vv70eSO+/vSUw77+9A++/vRnvv73vv73YhCjvv70w77+9Eu+/ve+/vRgXJ++/ve+/vQHvv71OLjB177+9QO+/vVnvv71QBFfvv71J77+9YU7vv71LDO+/vQ/vv73vv70/77+907Xvv70977+9Ze+/vXYvY++/ve+/ve+/ve+/vTBjFjDvv70y77+977+9Ou+/vTA2Ui1177+9xK1cUcy277+95LS877+9NlIjDe+/vUbvv73vv70277+977+9ctWB77+977+9de+/ve+/vW3vv73vv73vv71/77+977+9Se+/vWl+ASDvv73vv73vv73vv73Dj3NQ77+9Iu+/vQAL77+9DWVpee+/ve+/vVDvv73vv73vv73vv73ykqeh77+977+977+9LFNdVe+/ve+/vVbvv70b77+91pTvv73vv71a77+977+9b++/ve+/vRvvv714eu+/ve+/ve+/vVNube+/vXvaundh2YTvv70e77+9xbvvv73vv73vv70obWcv77+977+977+977+977+977+977+9Be+/vVvvv70IGBli77+977+9F3Hvv73vv70m1a8H77+977+9JBbvv716yIoX77+9BEg+Ye+/vUtUMS/vv73vv70xT++/ve+/vTDvv70uf2gHzYdZ77+9Qe+/ve+/ve+/vQot77+9PtuL77+977+977+9WNWi77+9fd+o77+9DO+/ve+/vTsH77+977+9Tu+/vX/vv71277+977+977+9zrjvv70xAO+/ve+/ve+/ve+/vU9AJnYv77+977+9X++/ve+/vVzvv70O77+9XO+/vS4P77+977+9KzDvv70DOxwUASEGZu+/vQwQ77+977+977+9Je+/vSBKWe+/vU/vv73Cjicv77+9XV/vv70777+9EO+/vSciJk7vv71uCWERUe+/vV4AGe+/vWN477+9Qe+/ve+/vQAAAABJRU5E77+9QmDvv70=", "base64")
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
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    app.use(cors({
        origin: 'https://new.clompass.com',
        methods: ['POST', 'GET'],
        credentials: true,
      }));
    
    app.use(favicon(img))
    

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
    app.use("/get",  isAuthenticated, get)
    app.use("/create", isAuthenticated, post)
    app.use("/update", isAuthenticated, update)
    app.use("/delete", isAuthenticated, remove)
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

    app.listen(PORT, () => {
        console.log("listening on port " + PORT)
    })
    //https.createServer({key: key, cert: cert}, app).listen(PORT, () => {
    //    console.log("listening on port " + PORT)
    //})


}).catch(error => console.log(error))
