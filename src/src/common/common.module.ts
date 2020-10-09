import {ApiConfigService} from "@common/api-config.service";
import {ConfigModule} from "@nestjs/config";
import {BoomExceptionFilter} from "./expection-filter/boom-filter";
import {Logger, Module} from '@nestjs/common';

@Module({
    providers: [
        Logger, BoomExceptionFilter, ApiConfigService
    ],
    exports: [Logger, ApiConfigService],
    imports: [ConfigModule.forRoot()]
})
export class CommonModule {
}
