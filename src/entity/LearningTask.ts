import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany} from "typeorm"
import { Subject } from "./Subject"
import { Student } from "./Student"
import { LearningTaskSubmission } from "./LearningTaskSubmission";
import { StudentLearningTask } from "./StudentLearningTask";

@Entity()
export class LearningTask {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @ManyToOne(() => Subject, (subject) => subject.learningTasks)
    subject: Subject

    @OneToMany(() => (StudentLearningTask), (studentlearningtask) => studentlearningtask.learningTask)
    studentLearningTasks: StudentLearningTask[]
}