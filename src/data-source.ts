import "reflect-metadata"
import { Student, Subject, LearningTask, Lesson, Teacher, LearningTaskSubmission, SubjectResource, StudentLearningTask, Event, Auth, Session, EventCategory, Permission, EventType} from "./entity"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "containers-us-west-48.railway.app",
    port: 5553,
    username: "root",
    password: "WU0VH2mHKhxsle6jKKzZ",
    database: "railway",
    entities: [Student, Subject, LearningTask, Lesson, Teacher, LearningTaskSubmission, SubjectResource, StudentLearningTask, Event, Auth, Session, EventCategory, Permission, EventType],
    migrations: [],
    synchronize: true,
    
})
