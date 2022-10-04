import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm"
import { Event } from "./Event"
import { Student } from "./Student"

@Entity()
export class EventCategory {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Event, (event) => event.categories)
    @JoinTable()
    events: Event[]

    @ManyToMany(() => Student, (student) => student.eventCategories)
    students: Student[]

}