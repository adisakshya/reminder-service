import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";
import {IsBoolean, IsDate, IsIn, IsNumber, IsOptional, IsString, Min, IsUrl, Max} from "class-validator";

export class CreateReminder {

    @ApiProperty({
        description: "Date and time on which user is to be reminded in RFC 3339 format",
        required: true
    })
    @IsDate()
    @Type(() => Date)
    date: Date;

    @ApiProperty({
        description: "Defines if the reminder is recurring",
        required: false
    })
    @IsBoolean()
    @IsOptional()
    isRecurring: boolean = false;

    @ApiProperty({
        description: "Minutes before which user is to be notified of this event",
        required: false
    })
    @IsNumber()
    @Min(0)
    @IsOptional()
    notifyOffset: number = 0;

    @ApiProperty({
        description: "Type of notification user would like to have",
        required: true
    })
    @IsIn(["push", "email"])
    notifyType: "push" | "email" = "push";

    @ApiProperty({
        description: "Reminder message",
        required: true
    })
    @IsString()
    message: string;

    @ApiProperty({
        description: "Reminder URL",
        required: false
    })
    @IsUrl()
    @IsOptional()
    url: string;
}

export class UpdateReminder {

    @ApiProperty({
        description: "Date and time on which user is to be reminded in RFC 3339 format",
        required: false
    })
    @IsDate()
    @Type(() => Date)
    date: Date;

    @ApiProperty({
        description: "Time before which user is to be notified of this event",
        required: false
    })
    @IsNumber()
    @Min(0)
    @IsOptional()
    notifyOffset: number = 10;

    @ApiProperty({
        description: "Type of notification user would like to have",
        required: true
    })
    @IsIn(["push", "email"])
    @IsOptional()
    notifyType: "push" | "email" = "push";
}
