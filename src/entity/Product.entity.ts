import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()

export class Product {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    category: string;

    @Column('decimal')
    priece: number;

    @Column()
    stock: number
}

