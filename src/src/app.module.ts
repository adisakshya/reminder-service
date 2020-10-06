import {CommonModule} from "@common/common.module";
import {ApiConfigService} from "@common/api-config.service";
import {Reminder} from "@entity/reminder.entity";
import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReminderModule} from "@reminder/reminder.module";

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: (config: ApiConfigService) => ({
            type: 'postgres',
            username: config.dbUser,
            database: config.dbName,
            password: config.dbPassword,
            host: config.dbHost,
            port: 5431,
            entities: [Reminder],
            logging: !config.isProduction,
            synchronize: true,
        }),
        imports: [CommonModule],
        inject: [ApiConfigService]
    }), CommonModule, ReminderModule],
})
export class AppModule {
}
