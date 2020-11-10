import {PagingQuery, WriteHeaders, EntityResponse} from "@common/dto";
import {Reminder} from "@entity/reminder.entity";
import {Injectable, Logger} from "@nestjs/common";
import {customAlphabet} from "nanoid";
import {CreateReminder, UpdateReminder} from "./reminder.dto";
import {plainToClass} from "class-transformer";
import Boom = require("@hapi/boom");
import _ = require("lodash");
import { EventService } from "@event/event.service";

@Injectable()
export class ReminderService {

    private readonly generateID = customAlphabet('1234567890' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz', 22);

    constructor(private readonly eventService: EventService,
                private readonly logger: Logger) {
    }

    public async create(req: CreateReminder, headers: WriteHeaders): Promise<EntityResponse> {
        const {userId, userName} = headers;
        const {date, isRecurring, notifyOffset, notifyType, message, url} = req;
        const transformedDate = date.setSeconds(0,0) - notifyOffset*60*1000;
        const currentTime = new Date().getTime();
        if(transformedDate - currentTime <= 60*1000) {
            throw Boom.badData("Difference between effective due-date and current-date must be greater than 1 minute", {reason: "INVALID_DUEDATE"});
        }
        this.logger.log(`Creating reminder for user ${userId}`);
        const reminder = await Reminder.create({
            id: this.generateID(), date: new Date(transformedDate), isRecurring, notifyOffset, notifyType, message, userId, url
        }).save();
        this.logger.log(`Reminder created for user ${userId}`);
        await this.eventService.reminderCreated({
            userId,
            itemId: reminder.id,
            eventData: {reminder},
            userEmail: userName
        });
        return plainToClass(EntityResponse, {id: reminder.id});
    }

    public async update(id: string, req: UpdateReminder, headers: WriteHeaders): Promise<Reminder> {
        const {userId, userName} = headers;
        const reminder = await this.findById(userId, id);
        if (!reminder) {
            throw  Boom.notFound("Missing Reminder", {reason: "MISSING_REMINDER"});
        }
        const {date, notifyOffset, notifyType} = req;
        const transformedDate = date.setSeconds(0,0) - notifyOffset*60*1000;
        const currentTime = new Date().getTime();
        if((reminder.notifyOffset != notifyOffset || reminder.date != new Date(transformedDate)) && (transformedDate - currentTime <= 60*1000)) {
            throw Boom.notFound("Difference between effective due-date and current-date must be greater than 1 minute", {reason: "INVALID_DUEDATE"});
        }
        this.logger.log(`Updating reminder ${reminder.id} for user ${userId}`);
        await Reminder.update(reminder.id, {date: new Date(transformedDate), notifyOffset, notifyType});
        this.logger.log(`Updated reminder ${reminder.id} for user ${userId}`);
        await reminder.reload();
        await this.eventService.reminderUpdated({
            userId,
            itemId: reminder.id,
            eventData: {reminder},
            userEmail: userName
        });
        return reminder;
    }

    public async delete(id: string, headers: WriteHeaders): Promise<void> {
        const {userId, userName} = headers;
        const reminder = await this.findById(userId, id);
        if (!reminder) {
            throw  Boom.notFound("Missing Reminder", {reason: "MISSING_REMINDER"});
        }
        this.logger.log(`Deleting reminder ${reminder.id} for user ${userId}`);
        const deletedReminderId = reminder.id;
        await reminder.remove();
        await this.eventService.reminderDeleted({
            userId,
            itemId: deletedReminderId,
            eventData: {reminder},
            userEmail: userName
        });
        this.logger.log(`Deleted reminder ${reminder.id} for user ${userId}`);
    }

    public async findById(userId: string, id: string): Promise<Reminder> {
        this.logger.log(`Getting reminder ${id} for user ${userId}`);
        const reminder = await Reminder.findById(id);
        if (!reminder) {
            throw  Boom.notFound("Missing Reminder", {reason: "MISSING_REMINDER"});
        }
        this.logger.log(`Checking if the user ${userId} is the owner of the reminder ${id}`);
        if (reminder.userId !== userId) {
            throw Boom.forbidden("You are not the creator of this reminder", {reason: "PERMISSION_DENIED"});
        }
        return reminder;
    }

    public fetchInPages(userId: string, {limit, offset}: PagingQuery): Promise<[Reminder[], number]> {
        return Reminder.fetchAllByUserInPages(userId, limit, offset);
    }

}
