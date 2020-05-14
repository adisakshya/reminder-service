import {Module} from "@nestjs/common";
import {PingModule} from "./ping/ping.module";
import {ItemModule} from "./item/item.module";
import {UsersModule} from "./users/users.module";
import {TypeOrmModule} from '@nestjs/typeorm';
import {configService} from './config/config.service';

@Module({
    imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        PingModule,
        ItemModule,
        UsersModule,
    ]
})
export class AppModule {
}
