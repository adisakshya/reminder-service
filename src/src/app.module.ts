import {CommonModule} from "@common/common.module";
import {ApiConfigService} from "@common/api-config.service";
import {Reminder} from "@entity/reminder.entity";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReminderModule} from "@reminder/reminder.module";
import {EventModule} from "@event/event.module";

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: (config: ApiConfigService) => ({
            type: 'postgres',
            username: config.dbUser,
            database: config.dbName,
            password: config.dbPassword,
            host: config.dbHost,
            entities: [Reminder],
            logging: !config.isProduction,
            synchronize: false,
        }),
        imports: [CommonModule],
        inject: [ApiConfigService]
    }), CommonModule, ReminderModule, EventModule],
})
export class AppModule {
}
