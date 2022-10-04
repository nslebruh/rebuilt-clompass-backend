import * as express from "express"
import { AppDataSource } from "../data-source"
import * as Entity from "../entity"
import { createQuery } from "../functions"
import {getStudentValidator, getSubjectValidator, getTeacherValidator, jsonString} from "../functions/validation"

const validateJsonString = jsonString()
console.log(validateJsonString('{"test":1}', "test"))

const router = express.Router()

router.get("/student", async (req, res) => {
    console.log("unformatted: ", req.query.params)
    try {
        const validatedParamsString = validateJsonString(req.query.params, "studentQuery")
        console.log("validated params string: ", validatedParamsString)
        const validatedParams = JSON.parse(validatedParamsString)
        const validatedQuery = getStudentValidator(validatedParams, "validatedStudentQuery")
        console.log(`Good query. ${JSON.stringify(validatedQuery)}`)
        const query = createQuery(validatedQuery, Entity.Student, "student")
        const data = await query.getMany()
        res.status(200).jsonp(data)
    } catch (error) {
        console.log(error)
        res.status(400).send("Bad request bozo")
    }
})

router.get("/subject", async (req, res) => {
    console.log("unformatted: ", req.query.params)
    try {
        const validatedParamsString = validateJsonString(req.query.params, "subjectQuery")
        console.log("validated params string: ", validatedParamsString)
        const validatedParams = JSON.parse(validatedParamsString)
        const validatedQuery = getSubjectValidator(validatedParams, "validatedSubjectQuery")
        console.log(`Good query. ${JSON.stringify(validatedQuery)}`)
        const query = createQuery(validatedQuery, Entity.Subject, "subject")
        const data = await query.getMany()
        res.status(200).jsonp(data)
    } catch (error) {
        console.log(error)
        res.status(400).send("Bad request bozo")
    }
})

router.get("/teacher", async (req, res) => {
    console.log("unformatted: ", req.query.params)
    try {
        const validatedParamsString = validateJsonString(req.query.params, "teacherQuery")
        console.log("validated params string: ", validatedParamsString)
        const validatedParams = JSON.parse(validatedParamsString)
        const validatedQuery = getTeacherValidator(validatedParams, "validatedTeacherQuery")
        console.log(`Good query. ${JSON.stringify(validatedQuery)}`)
        const query = createQuery(validatedQuery, Entity.Teacher, "teacher")
        const data = await query.getMany()
        res.status(200).jsonp(data)
    } catch (error) {
        console.log(error)
        res.status(400).send("Bad request bozo")
    }
})

export {router}
