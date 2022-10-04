import * as express from "express"
import { AppDataSource } from "../data-source"
import * as Entity from "../entity"
import { updateStudentValidator, updateSubjectValidator, updateTeacherValidator } from "../functions/validation/"

const router = express.Router()

router.post("/student", async (req, res) => {
    const body = req.body
    console.log(body)
    try {
        const validatedBody = updateStudentValidator(body, "updateStudentBody")
        if (validatedBody.subjects && (validatedBody.subjects[0] || validatedBody.subjects[1])) {
            await AppDataSource.createQueryBuilder().relation(Entity.Student, "subjects").of(validatedBody.id).addAndRemove(validatedBody.subjects[0], validatedBody.subjects[1])
        }
        if (validatedBody.events && (validatedBody.events[0] || validatedBody.events[1])) {
            await AppDataSource.createQueryBuilder().relation(Entity.Student, "events").of(validatedBody.id).addAndRemove(validatedBody.events[0], validatedBody.events[1])
        }
        if (validatedBody.learningTasks && (validatedBody.learningTasks[0] || validatedBody.learningTasks[1])) {
            await AppDataSource.createQueryBuilder().relation(Entity.Student, "learningTasks").of(validatedBody.id).addAndRemove(validatedBody.learningTasks[0], validatedBody.learningTasks[1])
        }
        const newBody = {
            firstName: validatedBody.firstName,
            lastName: validatedBody.lastName,
            ssid: validatedBody.ssid, 
            age: validatedBody.age, 
            year: validatedBody.year, 
            form: validatedBody.form,
            school: validatedBody.school,
        }
        const query = AppDataSource.createQueryBuilder().update(Entity.Student).set(newBody).where("id = :id", {id: validatedBody.id})
        const data = await query.execute()
        console.log("data updated")
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
        const validatedBody = updateSubjectValidator(body, "updateSubjectBody")
        if (validatedBody.learningTasks && (validatedBody.learningTasks[0] || validatedBody.learningTasks[1])) {
            await AppDataSource.createQueryBuilder().relation(Entity.Subject, "learningTasks").of(validatedBody.id).addAndRemove(validatedBody.learningTasks[0], validatedBody.learningTasks[1])
        }
        if (validatedBody.teachers && (validatedBody.teachers[0] || validatedBody.teachers[1])) {
            await AppDataSource.createQueryBuilder().relation(Entity.Subject, "teachers").of(validatedBody.id).addAndRemove(validatedBody.teachers[0], validatedBody.teachers[1])
        }
        if (validatedBody.students && (validatedBody.students[0] || validatedBody.students[1])) {
            await AppDataSource.createQueryBuilder().relation(Entity.Subject, "students").of(validatedBody.id).addAndRemove(validatedBody.students[0], validatedBody.students[1])
        }
        if (validatedBody.lessons && (validatedBody.lessons[0] || validatedBody.lessons[1])) {
            await AppDataSource.createQueryBuilder().relation(Entity.Subject, "lessons").of(validatedBody.id).addAndRemove(validatedBody.lessons[0], validatedBody.lessons[1])
        }
        if (validatedBody.resources && (validatedBody.resources[0] || validatedBody.resources[1])) {
            await AppDataSource.createQueryBuilder().relation(Entity.Subject, "resources").of(validatedBody.id).addAndRemove(validatedBody.resources[0], validatedBody.resources[1])
        }
        const newBody = {
            name: validatedBody.name,
            description: validatedBody.description,
            form: validatedBody.form,
            year: validatedBody.year
        }
        const query = AppDataSource.createQueryBuilder().update(Entity.Subject).set(newBody).where("id = :id", {id: validatedBody.id})
        const data = await query.execute()
        console.log("data updated")
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
        const validatedBody = updateTeacherValidator(body, "updateTeacherQuery")
        if (validatedBody.subjects && (validatedBody.subjects[0] || validatedBody.subjects[1])) {
            await AppDataSource.createQueryBuilder().relation(Entity.Teacher, "subjects").of(validatedBody.id).addAndRemove(validatedBody.subjects[0], validatedBody.subjects[1])
        }
        if (validatedBody.events && (validatedBody.events[0] || validatedBody.events[1])) {
            await AppDataSource.createQueryBuilder().relation(Entity.Teacher, "events").of(validatedBody.id).addAndRemove(validatedBody.events[0], validatedBody.events[1])
        }
        const newBody = {
            firstName: validatedBody.firstName,
            lastName: validatedBody.lastName,
            ssid: validatedBody.ssid,
        }
        const query = AppDataSource.createQueryBuilder().update(Entity.Teacher).set(newBody).where("id = :id", {id: validatedBody.id})
        const data = await query.execute()
        console.log("data updated")
        console.log(data)
        res.status(200).jsonp(data)
    } catch (error) {
        console.log(error)
        res.status(400).send("Bad request bozo")
    }
})



export {router}