import {Module} from "@nestjs/common";
import {PingModule} from "./ping/ping.module";
import {TypeOrmModule} from '@nestjs/typeorm';
import {configService} from './config/config.service';

@Module({
    imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        PingModule
    ]
})
export class AppModule {
}
