import {ApiConfigService} from "@common/api-config.service";
import {CommonModule} from "@common/common.module";
import {EventService} from "./event.service";
import {Logger, Module} from '@nestjs/common';
import * as AWS from "aws-sdk";

@Module({
    providers: [
        {
            provide: 'AWS-SNS',
            inject: [Logger, ApiConfigService],
            useFactory: () => new AWS.SNS({
                region: 'us-east-1'
            })
        },
        EventService
    ],
    imports: [CommonModule],
    exports: [EventService]
})
export class EventModule {
}
