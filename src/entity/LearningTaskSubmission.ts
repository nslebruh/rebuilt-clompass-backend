import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Resource } from "./Resource"
import { StudentLearningTask } from "./StudentLearningTask"

@Entity()
export class LearningTaskSubmission extends Resource {

    @ManyToOne(() => StudentLearningTask, (studentlearningtask) => studentlearningtask.submissions)
    studentLearningTask: StudentLearningTask[]

}