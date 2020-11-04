import {ApiConfigService} from "@common/api-config.service";
import {Inject, Injectable, Logger} from "@nestjs/common";
import Event from "./event.dto";
import * as AWS from "aws-sdk";

@Injectable()
export class EventService {

    constructor(@Inject("AWS-SNS")
                private readonly sns: AWS.SNS,
                private readonly configService: ApiConfigService,
                private readonly logger: Logger) {
    }

    public async reminderCreated(event: Event & { userEmail: string }) {
        this.logger.log(`Recieved reminder:added event for reminder ${event.itemId}`);
        this.sns.publish({
            Message: JSON.stringify({
                userId: event.userId,
                userEmail: event.userEmail,
                itemId: event.itemId,
                eventData: event.eventData.reminder
            }),
            MessageAttributes: {
                eventItemType: {
                    DataType: 'String',
                    StringValue: 'reminder'
                },
                eventType: {
                    DataType: 'String',
                    StringValue: 'reminder:created'
                },
                userId: {
                    DataType: 'String',
                    StringValue: event.userId
                }
            },
            TopicArn: this.configService.eventTopicArn
        }).promise();
    }

    public async reminderUpdated(event: Event & { userEmail: string }) {
        this.logger.log(`Recieved reminder:update event for reminder ${event.itemId}`);
        this.sns.publish({
            Message: JSON.stringify({
                userId: event.userId,
                userEmail: event.userEmail,
                itemId: event.itemId,
                eventData: event.eventData.reminder
            }),
            MessageAttributes: {
                eventItemType: {
                    DataType: 'String',
                    StringValue: 'reminder'
                },
                eventType: {
                    DataType: 'String',
                    StringValue: 'reminder:updated'
                },
                userId: {
                    DataType: 'String',
                    StringValue: event.userId
                }
            },
            TopicArn: this.configService.eventTopicArn
        }).promise();
    }

    public async reminderDeleted(event: Event & { userEmail: string }) {
        this.logger.log(`Recieved reminder:delete event for reminder ${event.itemId}`);
        this.sns.publish({
            Message: JSON.stringify({
                userId: event.userId,
                userEmail: event.userEmail,
                itemId: event.itemId,
                eventData: event.eventData.reminder
            }),
            MessageAttributes: {
                eventItemType: {
                    DataType: 'String',
                    StringValue: 'reminder'
                },
                eventType: {
                    DataType: 'String',
                    StringValue: 'reminder:deleted'
                },
                userId: {
                    DataType: 'String',
                    StringValue: event.userId
                }
            },
            TopicArn: this.configService.eventTopicArn
        }).promise();
    }

}
