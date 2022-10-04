import {Entity, Column, ManyToOne} from "typeorm"
import { Resource } from "./Resource";
import { Subject } from "./Subject";

@Entity()
export class SubjectResource extends Resource {
    @ManyToOne(() => Subject, (subject) => subject.resources)
    subject: Subject
}