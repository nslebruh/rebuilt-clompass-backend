import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, OneToOne } from "typeorm"
import { Auth } from "./Auth"
import { Event } from "./Event"
import { EventCategory } from "./EventCategory"
import { StudentLearningTask } from "./StudentLearningTask"
import { Subject } from "./Subject"

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ssid: string

    @Column({
        generatedType: "STORED",
        asExpression: 'CONCAT(firstName, " ", lastName)'
    })
    fullName: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column()
    year: number

    @Column()
    form: string

    @Column()
    school: string

    @Column()
    hasImage: boolean = false

    @Column({nullable: true})
    imageLocation: string = ""
    
    @ManyToMany(() => Subject, subject => subject.students, {onDelete: "CASCADE"})
    subjects: Subject[]

    @OneToMany(() => StudentLearningTask, (studentlearningtask) => studentlearningtask.student, {onDelete: "CASCADE"})
    learningTasks: StudentLearningTask[]

    @ManyToMany(() => Event, (event) => event.students, {onDelete: "CASCADE"})
    events: Event[]

    @OneToOne(() => Auth, (auth) => auth.student)
    auth: Auth

    @ManyToMany(() => EventCategory, (eventCategory) => eventCategory.students)
    eventCategories: EventCategory[]

    
}