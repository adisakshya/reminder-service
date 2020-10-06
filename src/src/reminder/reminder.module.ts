import {CommonModule} from "@common/common.module";
import {Module} from "@nestjs/common";
import {ReminderController} from './reminder.controller';
import {ReminderService} from "./reminder.service";

@Module({
    controllers: [ReminderController],
    providers: [ReminderService],
    exports: [ReminderService],
    imports: [
        CommonModule
    ]
})
export class ReminderModule {
}
