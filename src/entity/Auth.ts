import {Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne} from "typeorm"
import {Student, Teacher} from "./"
import { Permission } from "./Permission";

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    ssid: string

    @Column({unique: true})
    email: string

    @Column()
    password: string;

    @Column()
    type: string;

    /**
    * permissions stored in binary. Ex. 010 = !perm1, perm2 !perm3 
    */
    @ManyToOne(() => Permission, (permission) => permission.users)
    permissions: Permission[]
    

    @OneToOne(() => Student, (student) => student.auth, {nullable: true})
    student: Student

    @OneToOne(() => Teacher, (teacher) => teacher.auth, {nullable: true})
    teacher: Teacher



}