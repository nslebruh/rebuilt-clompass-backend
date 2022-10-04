import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Auth } from "./Auth"

@Entity()
export class Permission {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Auth, (auth) => auth.permissions)
    users: Auth[]


    @Column()
    canCreateEvent: boolean

    @Column()
    canCreateSubject: boolean

    @Column()
    canCreateLearningTask: boolean

    @Column()
    canCreateStudent: boolean

    @Column()
    canCreateTeacher: boolean

    @Column()
    canCreateSubjectResource: boolean

    @Column()
    canCreateLesson: boolean

    @Column()
    canCreateEventCategory: boolean

    @Column()
    canCreateEventType: boolean


    @Column()
    canViewAnyEvent: boolean

    @Column()
    canViewAnySubject: boolean

    @Column()
    canViewAnyStudent: boolean

    @Column()
    canViewAnyTeacher: boolean

    @Column()
    canViewAnyLearningTask: boolean

    @Column()
    canViewAnyLesson: boolean

    @Column()
    canViewAnySubjectResource: boolean

    @Column()
    canViewAnyEventCategory: boolean

    @Column()
    canViewAnyEventType: boolean


    @Column()
    canEditAnyEvent: boolean

    @Column()
    canEditAnySubject: boolean

    @Column()
    canEditAnyLearningTask: boolean

    @Column()
    canEditAnyStudent: boolean

    @Column()
    canEditAnyTeacher: boolean

    @Column()
    canEditAnySubjectResource: boolean

    @Column()
    canEditAnyLesson: boolean

    @Column()
    canEditAnyEventCategory: boolean

    @Column()
    canEditAnyEventType: boolean


    @Column()
    canDeleteAnyEvent: boolean

    @Column()
    canDeleteAnySubject: boolean

    @Column()
    canDeleteAnyLearningTask: boolean

    @Column()
    canDeleteAnyStudent: boolean

    @Column()
    canDeleteAnyTeacher: boolean

    @Column()
    canDeleteAnySubjectResource: boolean

    @Column()
    canDeleteAnyLesson: boolean

    @Column()
    canDeleteAnyEventCategory: boolean

    @Column()
    canDeleteAnyEventType: boolean


}