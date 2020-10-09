import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {BoomExceptionFilter} from "@common/expection-filter";
import {ValidationError, ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import Boom = require("@hapi/boom");

export async function configure() {
    const app = await NestFactory.create(AppModule);
    // Global validation pipe
    app.useGlobalPipes(new ValidationPipe({
        exceptionFactory: (errors: ValidationError[]) => {
            const firstValidationError = errors[0];
            const firstValidationErrorKey = Object.keys(firstValidationError.constraints)[0];
            // Return error to be thrown
            return Boom.badRequest(firstValidationError.constraints[firstValidationErrorKey], {reason: "INVALID_REQUEST"});
        }
    }));
    // Global exception filter for Boom
    app.useGlobalFilters(app.get(BoomExceptionFilter));
    // Swagger document options
    const options = new DocumentBuilder()
        .setTitle('Reminder Service')
        .setDescription('Internal API documentation for Reminder Service')
        .setVersion('1.0.0')
        .build();
    // Swagger document
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);
    // Start service
    await app.listen(process.env.PORT ?? 3000);
}

configure();
