import {UserItemEntity} from "@entity/base.entity";
import {Bookmark} from "@entity/bookmark.entity";
import {Exclude} from "class-transformer";
import {Brackets, Column, Entity, Index, ManyToOne, MoreThanOrEqual} from "typeorm";

@Entity()
export class Reminder extends UserItemEntity {
    @Column({type: "timestamp with time zone"})
    date: Date;

    @Column({nullable: true})
    timezone: string | null;

    @Column()
    mmNotifyOffset: number;

    @Column()
    notifyType: "push" | "email";

    @Column({nullable: true})
    message: string;

    public static findAllByUser(userId: string, since?: Date): Promise<Reminder[]> {
        const query = since ? ({userId, updatedAt: MoreThanOrEqual(since.toISOString())}) : ({userId});
        return this.find({
            where: query,
            order: {createdAt: "DESC"}
        });
    }

    public static findById(id: string): Promise<Reminder | null> {
        return this.createQueryBuilder("reminder")
            .where(new Brackets(qb => qb
                .where("reminder.id = :id")
            )
            .setParameters({id})
            .getOne().then(b => b ?? null);
    }

    public static findByReminderIds(ids: string[]): Promise<Reminder[]> {
        return this.findByIds(ids);
    }

    public static async update(id: string, reminder: Partial<Reminder>): Promise<Reminder> {
        const result = await this.update(id, reminder);
        if (result.affected && result.affected === 0) {
            throw Error("No changed made to the reminder. Entity might be missing. Check " + id);
        }
        return this.findByIdOrTempId(id);
    };
}
