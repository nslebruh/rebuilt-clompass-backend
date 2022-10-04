import * as express from "express"
import { AppDataSource } from "../data-source"
import * as Entity from "../entity"
import { getRelationQuery } from "../functions"
import { postStudentValidator, postSubjectValidator, postTeacherValidator } from "../functions/validation"

const router = express.Router()

router.post("/student", async (req, res) => {
    const body = req.body
    console.log(body)
    try {
        const validatedBody = postStudentValidator(body, "postStudentBody")
        const student = new Entity.Student
        student.firstName = validatedBody.firstName
        student.lastName = validatedBody.lastName
        student.age = validatedBody.age
        student.ssid = validatedBody.ssid
        student.year = validatedBody.year
        student.form = validatedBody.form
        validatedBody.subjects ? student.subjects = await getRelationQuery(Entity.Subject, "subject", true, validatedBody.subjects).getMany() : null
        //validatedBody.subjects ? student.subjects = await AppDataSource.getRepository(Entity.Subject).createQueryBuilder("subject").where("subject.id IN (:...subjects)" , {subjects: validatedBody.subjects}).getMany() : null
        const data = await AppDataSource.manager.save(student)
        console.log("data saved")
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
        const validatedBody = postSubjectValidator(body, "postSubjectBody")
        const subject = new Entity.Subject
        subject.description = validatedBody.description
        subject.form = validatedBody.form
        subject.name = validatedBody.name
        subject.year = validatedBody.year
        validatedBody.students ? subject.students = await getRelationQuery(Entity.Student, "student", true, validatedBody.students).getMany() : null
        validatedBody.teacher ? subject.teachers = await getRelationQuery(Entity.Teacher, "teacher", false, validatedBody.teacher).getOne() : null

        const data = await AppDataSource.manager.save(subject)
        console.log("data saved")
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
        const validatedBody = postTeacherValidator(body, "postTeacherBody")
        const teacher = new Entity.Teacher
        teacher.firstName = validatedBody.firstName
        teacher.lastName = validatedBody.lastName
        teacher.ssid = validatedBody.ssid
        validatedBody.subjects ? teacher.subjects = await AppDataSource.getRepository(Entity.Subject).createQueryBuilder("subject").where("subject.id IN (:...subjects)" , {subjects: validatedBody.subjects}).getMany() : null
        const data = await AppDataSource.manager.save(teacher)
        console.log("data saved")
        console.log(data)
        res.status(200).jsonp(data)
    } catch (error) {
        console.log(error)
        res.status(400).send("Bad request bozo")
    }
})

export {router}