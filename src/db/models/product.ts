import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: 'product' })
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamptz" })
    updatedAt: Date

    constructor(
        id: number,
        name: string,
        price: number,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id
        this.name = name
        this.price = price
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}