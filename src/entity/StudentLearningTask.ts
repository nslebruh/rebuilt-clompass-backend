import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"; 
import { LearningTask } from "./LearningTask";
import { LearningTaskSubmission } from "./LearningTaskSubmission";
import { Student } from "./Student";

@Entity()
export class StudentLearningTask {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    status: string;

    @Column({nullable: true, name: "name"})
    learningTaskName: string

    @Column({nullable: true, name: "description"})
    learningTaskDescription: string

    @Column({nullable: true, name: "endDate"})
    learningTaskEndDate: Date

    @Column({nullable: true, name: "startDate"})
    learningTaskStartDate: Date

    @OneToMany(() => LearningTaskSubmission, (learningtasksubmission) => learningtasksubmission.studentLearningTask)
    submissions: LearningTaskSubmission[]

    @ManyToOne(() => Student, (student) => student.learningTasks)
    student: Student
    
    @ManyToOne(() => LearningTask, (learningtask) => learningtask.studentLearningTasks)
    learningTask: LearningTask
}