import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Token } from "./token"

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

    @OneToMany(() => Token, token => token.user)
    tokens: Token[];


    constructor(id: number, email: string, password: string, createdAt: Date, updatedAt: Date, tokens: Token[]) {
        this.id = id
        this.email = email
        this.password = password
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.tokens = tokens
    }
}