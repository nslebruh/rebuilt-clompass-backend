import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToOne } from "typeorm"
import { Event } from "./Event";
import { Subject } from "./Subject"

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number

    @Column() 
    period: number;

    @ManyToOne(() => Subject, (subject) => subject.lessons)
    subject: Subject

    @Column()
    studentPlan: string

    @Column()
    teacherPlan: string

    @OneToOne(() => Event)
    event: Event
}