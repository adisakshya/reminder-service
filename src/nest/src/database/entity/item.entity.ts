import {Entity, Column} from 'typeorm';
import {BaseEntity} from './base.entity';

@Entity({
    name: 'item'
})
export class Item extends BaseEntity {
    @Column({
        type: 'varchar',
        length: 30
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 300
    })
    description: string;
}