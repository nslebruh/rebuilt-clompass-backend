import { PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable, OneToMany, ManyToOne, } from "typeorm"
import { LearningTask } from "./LearningTask";
import { Lesson } from "./Lesson";
import { Student } from "./Student"
import { SubjectResource } from "./SubjectResource";
import { Teacher } from "./Teacher";

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        generatedType: "STORED",
        asExpression: "CONCAT(year, name, UPPER(form))"
    })
    fullName: string

    @Column({unique: true})
    name: string;

    @Column()
    description: string;

    @Column()
    year: number

    @Column()
    form: string

    @ManyToMany(() => Student, student => student.subjects, {onDelete: "CASCADE"})
    @JoinTable()
    students: Student[]

    @OneToMany(() => LearningTask, (learningtask) => learningtask.subject, {onDelete: "CASCADE"})
    @JoinTable()
    learningTasks: LearningTask[]

    @OneToMany(() => Lesson, (lesson) => lesson.subject, {onDelete: "CASCADE"})
    @JoinTable()
    lessons: Lesson[]

    @ManyToMany(() => Teacher, (teacher) => teacher.subjects, {onDelete: "CASCADE"})
    @JoinTable()
    teachers: Teacher[]

    @OneToMany(() => SubjectResource, (subjectresource) => subjectresource.subject, {onDelete: "CASCADE"})
    resources: SubjectResource[]
}   