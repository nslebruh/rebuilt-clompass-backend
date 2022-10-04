import {int, string, boolean, alternatives, object, optional, oneOf, arrayOf, transform} from "checkeasy"


const numberParams = () => 
    object({
        sortBy: optional(object({
            type: oneOf(["greaterThan", "lessThan", "greaterThanOrEqualTo", "lessThanOrEqualTo", "equalTo"] as const),
            value: int()
        })),
        orderBy: optional(oneOf(["ASC", "DESC"] as const))
    }, {min: 1})

const stringParams = () => 
    object({
        sortBy: optional(object({
            type: oneOf(["startsWith", "endsWith", "contains"] as const),
            value: string({pattern: /^[^\;\"\']+$/mi})
        })),
        orderBy: optional(oneOf(["ASC", "DESC"] as const))
    }, {min: 1})

const teacher = () => 
    object({
        fullName: optional(alternatives([
            stringParams(),
            boolean()
        ])),

        firstName: optional(alternatives([
            stringParams(),
            boolean()
        ])),

        lastName: optional(alternatives([
            stringParams(),
            boolean()
        ])),

        code: optional(alternatives([
            stringParams(),
            boolean()
        ])),

        subjects: optional(alternatives([
            object({
                fullName: optional(alternatives([
                    stringParams(),
                    boolean()
                ])),
                name: optional(alternatives([
                    stringParams(),
                    boolean()
                ])),
        
                description: optional(alternatives([
                    stringParams(),
                    boolean()
                ])),
        
                year: optional(alternatives([
                    numberParams(),
                    boolean()
                ])),
                students: optional(alternatives([
                    object({
                        ssid: optional(alternatives([
                            stringParams(),
                            boolean()
                        ])),
                
                        fullName: optional(alternatives([
                            stringParams(),
                            boolean()
                        ])),
                
                        firstName: optional(alternatives([
                            stringParams(),
                            boolean()
                        ])),
                
                        lastName: optional(alternatives([
                            stringParams(),
                            boolean()
                        ])),
                
                        age: optional(alternatives([
                            numberParams(),
                            boolean()
                        ])),
                
                        year: optional(alternatives([
                            numberParams(),
                            boolean()
                        ])),
                
                        form: optional(alternatives([
                            stringParams(),
                            boolean()
                        ])),
                
                        school: optional(alternatives([
                            stringParams(),
                            boolean()
                        ])),
                    }, {min: 1}),
                    boolean()
                ]))
            }),
            boolean()
        ])), 
        
    }, {min: 1})

const studentLearningTask = () =>  
    object({
        name: optional(alternatives([
            stringParams(), 
            boolean()
        ])),
        
        description: optional(alternatives([
            stringParams(), 
            boolean()
        ])),

    }, {min: 1})

const learningTask = () => 
    object({
        name: optional(alternatives([
            stringParams(),
            boolean()
        ])),
        
        startDate: optional(alternatives([
            transform(int(), date => 
                new Date((new Date(date)).setMinutes(new Date(date).getMinutes() - new Date(date).getTimezoneOffset()))
            ),
            boolean()
        ])),

        endDate: optional(alternatives([
            transform(int(), date => 
                new Date((new Date(date)).setMinutes(new Date(date).getMinutes() - new Date(date).getTimezoneOffset()))
            ),
            boolean()
        ])),

        description: optional(alternatives([
            stringParams(),
            boolean()
        ])),

        subject: optional(alternatives([
            subject(),
            boolean()
        ])),

        //studentLearningTasks: optional(alternatives([
        //    arrayOf(studentLearningTask()),
        //    boolean()
        //]))
    }, {min: 1})

const subject = () => 
    object({
        fullName: optional(alternatives([
            stringParams(),
            boolean()
        ])),

        name: optional(alternatives([
            stringParams(),
            boolean()
        ])),

        description: optional(alternatives([
            stringParams(),
            boolean()
        ])),

        year: optional(alternatives([
            numberParams(),
            boolean()
        ])),
        students: optional(alternatives([
            arrayOf(object({
                ssid: optional(alternatives([
                    stringParams(),
                    boolean()
                ])),
        
                fullName: optional(alternatives([
                    stringParams(),
                    boolean()
                ])),
        
                firstName: optional(alternatives([
                    stringParams(),
                    boolean()
                ])),
        
                lastName: optional(alternatives([
                    stringParams(),
                    boolean()
                ])),
        
                age: optional(alternatives([
                    numberParams(),
                    boolean()
                ])),
        
                year: optional(alternatives([
                    numberParams(),
                    boolean()
                ])),
        
                form: optional(alternatives([
                    stringParams(),
                    boolean()
                ])),
        
                school: optional(alternatives([
                    stringParams(),
                    boolean()
                ])),
            }, {min: 1}),
            ),
            boolean()
            
        ])),
        teacher: optional(alternatives([
            object({
                fullName: optional(alternatives([
                    stringParams(),
                    boolean()
                ])),
        
                firstName: optional(alternatives([
                    stringParams(),
                    boolean()
                ])),
        
                lastName: optional(alternatives([
                    stringParams(),
                    boolean()
                ])),
        
                code: optional(alternatives([
                    stringParams(),
                    boolean()
                ])), 
            }, {min: 1}),
            boolean()       
        ]))

    }, {min: 1})

const student = () => 
    alternatives(
        [
            object({
                id: object({
                    value: int()
                })
            }),
            object({
                ssid: optional(alternatives([
                    stringParams(),
                    boolean()
                ])),
        
                fullName: optional(alternatives([
                    stringParams(),
                    boolean()
                ])),
        
                firstName: optional(alternatives([
                    stringParams(),
                    boolean()
                ])),
        
                lastName: optional(alternatives([
                    stringParams(),
                    boolean()
                ])),
        
                age: optional(alternatives([
                    numberParams(),
                    boolean()
                ])),
        
                year: optional(alternatives([
                    numberParams(),
                    boolean()
                ])),
        
                form: optional(alternatives([
                    stringParams(),
                    boolean()
                ])),
        
                school: optional(alternatives([
                    stringParams(),
                    boolean()
                ])),
        
                subjects: optional(alternatives([
                    boolean(),
                    object({
                        fullName: optional(alternatives([
                            stringParams(),
                            boolean()
                        ])),

                        name: optional(alternatives([
                            stringParams(),
                            boolean()
                        ])),
                
                        description: optional(alternatives([
                            stringParams(),
                            boolean()
                        ])),
                
                        year: optional(alternatives([
                            numberParams(),
                            boolean()
                        ])),
                        teacher: optional(alternatives([
                            object({
                                fullName: optional(alternatives([
                                    stringParams(),
                                    boolean()
                                ])),

                                firstName: optional(alternatives([
                                    stringParams(),
                                    boolean()
                                ])),
                        
                                lastName: optional(alternatives([
                                    stringParams(),
                                    boolean()
                                ])),
                        
                                ssid: optional(alternatives([
                                    stringParams(),
                                    boolean()
                                ])), 
                            }, {min: 1}),
                            boolean()      
                        ]))
                    }, {min: 1})
                ])),
            }, {min: 1})
        ]
    )

const getStudentValidator = student()
const getSubjectValidator = subject()
const getLearningTaskValidator = learningTask()
const getTeacherValidator = teacher()


export {getStudentValidator, getTeacherValidator, getSubjectValidator, getLearningTaskValidator}