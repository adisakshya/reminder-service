import {CreateDateColumn, PrimaryColumn, UpdateDateColumn} from 'typeorm';

export class BaseEntity {
    @PrimaryColumn('uuid')
    id: string;

    @CreateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;

}