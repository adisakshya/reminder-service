import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";
import {BaseEntity} from './base.entity';

@Entity({
    name: 'user'
})
export class User extends BaseEntity  {

    @Column({
        type: 'varchar',
        length: 30,
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 30
    })
    name: string;

}