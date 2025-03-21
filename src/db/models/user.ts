import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: "user" })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true
    })
    email: string

    @Column()
    password: string

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt: Date


    constructor(id: number, email: string, password: string, createdAt: Date, updatedAt: Date) {
        this.id = id
        this.email = email
        this.password = password
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}