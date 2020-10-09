import {CommonModule} from "@common/common.module";
import {EventModule} from "@event/event.module";
import {Module} from "@nestjs/common";
import {ReminderController} from './reminder.controller';
import {ReminderService} from "./reminder.service";

@Module({
    controllers: [ReminderController],
    providers: [ReminderService],
    exports: [ReminderService],
    imports: [
        CommonModule,
        EventModule
    ]
})
export class ReminderModule {
}
