import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Event } from "./Event"

@Entity()
export class EventType {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Event, (event) => event.type)
    events: Event[]


}