import { Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, Entity, OneToOne } from "typeorm"
import { Student } from "./Student"
import { Teacher } from "./Teacher"
import { Lesson } from "./Lesson"
import { EventType } from "./EventType"
import { EventCategory } from "./EventCategory"


@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column({name: "start"})
    startDate: Date

    @Column({name: "end"})
    endDate: Date

    @Column()
    startTime: Date

    @Column()
    endTime: Date

    @Column()
    description: string

    @Column()
    location: string

    @Column()
    isRunning: boolean

    @Column()
    allDay: boolean

    @Column() 
    isRecurring: boolean

    @Column({name: "endRecur"})
    recurUntil: Date

    @Column({name: "startRecur"})
    recurFrom: Date

    @Column()
    recurForever: boolean

    @Column()
    recurrenceFrequency: number 

    @ManyToMany(() => Student, (student) => student.events)
    @JoinTable()
    students: Student[]
    
    @ManyToMany(() => Teacher, (teacher) => teacher.events)
    @JoinTable()
    teachers: Teacher[]

    @OneToOne(() => Lesson, {nullable: true})
    lesson: Lesson
    
    @ManyToOne(() => EventType, (eventType) => eventType.events)
    type: EventType

    @ManyToMany(() => EventCategory, (eventCategory) => eventCategory.events)
    categories: EventCategory[]

}

