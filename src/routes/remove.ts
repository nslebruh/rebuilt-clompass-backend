import * as express from "express"
import { AppDataSource } from "../data-source"
import * as Entity from "../entity"
import { deleteValidator } from "../functions/validation"

const router = express.Router()

router.post("/student", async (req, res) => {
    const body = req.body
    console.log(body)
    try {
        const validatedBody = deleteValidator(body, "deleteStudentQuery")
        const data = await AppDataSource.getRepository(Entity.Student).delete(validatedBody.id)
        console.log("data deleted")
        console.log(data)
        res.status(200).jsonp(data)
    } catch (error) {
        console.log(error)
        res.status(400).send("Bad request bozo")
    }
})

router.post("/subject", async (req, res) => {
    const body = req.body
    console.log(body)
    try {
        const validatedBody = deleteValidator(body, "deleteStudentQuery")
        const data = await AppDataSource.getRepository(Entity.Subject).delete(validatedBody.id)
        console.log("data deleted")
        console.log(data)
        res.status(200).jsonp(data)
    } catch (error) {
        console.log(error)
        res.status(400).send("Bad request bozo")
    }
})

router.post("/teacher", async (req, res) => {
    const body = req.body
    console.log(body)
    try {
        const validatedBody = deleteValidator(body, "deleteStudentQuery")
        const data = await AppDataSource.getRepository(Entity.Teacher).delete(validatedBody.id)
        console.log("data deleted")
        console.log(data)
        res.status(200).jsonp(data)
    } catch (error) {
        console.log(error)
        res.status(400).send("Bad request bozo")
    }
})

export {router}