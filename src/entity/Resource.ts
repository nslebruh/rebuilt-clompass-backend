import { PrimaryGeneratedColumn, Column } from "typeorm"

export abstract class Resource {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    isWebLink: boolean

    @Column()
    isFile: boolean

    @Column()
    fileLocation: string | null

    @Column()
    webLink: string | null

    @Column()
    title: string

}