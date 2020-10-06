import {ReadHeader, WriteHeader} from "@common/decorator";
import {PagingQuery, PagingResponse, EntityResponse, ReadHeaders, WriteHeaders} from "@common/dto";
import {ApiCommonHeader, ApiWriteHeader} from "@common/swagger";
import {Reminder} from "@entity/reminder.entity";
import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UseInterceptors
} from '@nestjs/common';
import {ApiOperation, ApiTags} from "@nestjs/swagger";

import {CreateReminder, UpdateReminder} from "./reminder.dto";
import {ReminderService} from "./reminder.service";

@UseInterceptors(ClassSerializerInterceptor)
@ApiCommonHeader()
@ApiTags("Reminders")
@Controller('reminders')
export class ReminderController {

    constructor(private readonly reminderService: ReminderService) {
    }

    @ApiOperation({
        summary: "Get all Reminder",
        operationId: "reminder:get_all",
        description: "Get all reminder for the user"
    })
    @Get()
    public async fetchInPages(@ReadHeader() header: ReadHeaders, @Query() query: PagingQuery): Promise<PagingResponse> {
        const [reminders, total] = await this.reminderService.fetchInPages(header.userId, query);
        return new PagingResponse("reminders", reminders, {
            limit: query.limit,
            offset: query.offset,
            total: total
        });
    }

    @ApiWriteHeader()
    @ApiOperation({
        summary: "New Reminder",
        operationId: "reminder:create",
        description: "Creates a new reminder in the given bookmark"
    })
    @Post()
    public create(@WriteHeader() header: WriteHeaders, @Body() body: CreateReminder): Promise<EntityResponse> {
        return this.reminderService.create(body, header);
    }

    @ApiWriteHeader()
    @ApiOperation({
        summary: "Delete Reminder",
        operationId: "reminder:delete",
        description: "Deletes an existing reminder"
    })
    @Delete(":id")
    public async delete(@WriteHeader() header: WriteHeaders, @Param("id") id: string): Promise<void> {
        await this.reminderService.delete(id, header);
    }

    @ApiWriteHeader()
    @ApiOperation({
        summary: "Update Reminder",
        operationId: "reminder:update",
        description: "Updates an existing reminder"
    })
    @Post(":id")
    public update(@WriteHeader() header: WriteHeaders, @Body() body: UpdateReminder, @Param("id") id: string): Promise<Reminder> {
        return this.reminderService.update(id, body, header);
    }

}
