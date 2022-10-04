import {int, string, object, optional, arrayOf} from "checkeasy"

const postStudentValidator = object({
    firstName: string({pattern: /^[^\;\"\']+$/mi}),
    lastName: string({pattern: /^[^\;\"\']+$/mi}),
    ssid: string({pattern: /^[^\;\"\']+$/mi}),
    year: int({min: 0}),
    age: int({min: 0}),
    form: string({pattern: /^[^\;\"\']+$/mi}),
    school: string({pattern: /^[^\;\"\']+$/mi}),
    subjects: optional(arrayOf(int()))
})

const postSubjectValidator = object({
    name: string({pattern: /^[^\;\"\']+$/mi}),
    year: int({min: 0}),
    form: string({pattern: /^[^\;\"\']+$/mi}),
    description: string({pattern: /^[^\;\"\']+$/mi}),
    students: optional(arrayOf(int())),
    teacher: optional(int())
})

const postTeacherValidator = object({
    firstName: string({pattern: /^[^\;\"\']+$/mi}),
    lastName: string({pattern: /^[^\;\"\']+$/mi}),
    ssid: string({pattern: /^[^\;\"\']+$/mi}),
    subjects: optional(arrayOf(int()))
})



export {postStudentValidator, postSubjectValidator, postTeacherValidator}