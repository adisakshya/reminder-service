import {UserItemEntity} from "@entity/base.entity";
import {Exclude} from "class-transformer";
import {Brackets, Column, Entity, Index, ManyToOne, MoreThanOrEqual} from "typeorm";

@Entity()
export class Reminder extends UserItemEntity {
    @Column({type: "timestamp with time zone"})
    date: Date;

    @Column()
    isRecurring: boolean;

    @Column()
    notifyOffset: number;

    @Column()
    notifyType: "push" | "email";

    @Column({nullable: true})
    message: string;

    @Column({nullable: true})
    url: string;

    public static findAllByUser(userId: string, since?: Date): Promise<Reminder[]> {
        return this.find({
            where: since ? ({userId, updatedAt: MoreThanOrEqual(since.toISOString())}) : ({userId}),
            order: {createdAt: "DESC"}
        });
    }

    public static async findById(id: string): Promise<Reminder | null> {
        const b = await this.createQueryBuilder("reminder")
            .where("reminder.id = :id", { id })
            .getOne();
        return b;
    }

    public static fetchAllByUserInPages(userId: string, limit: number, offset: number): Promise<[Reminder[], number]> {
        return this.findAndCount({
            where: {userId},
            skip: offset,
            take: limit,
            order: {createdAt: "DESC"}
        });
    };

    public static async update1(id: string, reminder: Partial<Reminder>): Promise<Reminder> {
        const result = await this.update(id, reminder);
        if (result.affected && result.affected === 0) {
            throw Error("No changed made to the reminder. Entity might be missing. Check " + id);
        }
        return this.findById(id);
    };
}
