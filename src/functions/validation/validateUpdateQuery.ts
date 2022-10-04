import {int, string, object, optional, arrayOf, alternatives, nullable } from "checkeasy"

const updateStudentValidator = object({
    id: int(),
    firstName: optional(string({pattern: /^[^\;\"\']+$/mi})),
    lastName: optional(string({pattern: /^[^\;\"\']+$/mi})),
    ssid: optional(string({pattern: /^[^\;\"\']+$/mi})),
    year: optional(int({min: 0})),
    age: optional(int({min: 0})),
    form: optional(string({pattern: /^[^\;\"\']+$/mi})),
    school: optional(string({pattern: /^[^\;\"\']+$/mi})),
    subjects: optional(arrayOf(arrayOf(int()), {min: 2, max: 2})),
    events: optional(arrayOf(arrayOf(int()), {min: 2, max: 2})),
    learningTasks: optional(arrayOf(arrayOf(int()), {min: 2, max: 2})),
}, {min: 2})

const updateSubjectValidator = object({
    id: int(),
    name: optional(string({pattern: /^[^\;\"\']+$/mi})),
    description: optional(string({pattern: /^[^\;\"\']+$/mi})),
    year: optional(int()),
    form: optional(string({pattern: /^[^\;\"\']+$/mi})),
    students: optional(arrayOf(arrayOf(int()), {min: 2, max: 2})),
    lessons: optional(arrayOf(arrayOf(int()), {min: 2, max: 2})),
    teachers: optional(arrayOf(arrayOf(int()), {min: 2, max: 2})),
    learningTasks: optional(arrayOf(arrayOf(int()), {min: 2, max: 2})),
    resources: optional(arrayOf(arrayOf(int()), {min: 2, max: 2})),
}, {min: 2})

const updateTeacherValidator = object({
    id: int(),
    firstName: optional(string({pattern: /^[^\;\"\']+$/mi})),
    lastName: optional(string({pattern: /^[^\;\"\']+$/mi})),
    ssid: optional(string({pattern: /^[^\;\"\']+$/mi})),
    subjects: optional(arrayOf(arrayOf(int()), {min: 2, max: 2})),
    events: optional(arrayOf(arrayOf(int()), {min: 2, max: 2})),

}, {min: 2})

export {updateStudentValidator, updateSubjectValidator, updateTeacherValidator}