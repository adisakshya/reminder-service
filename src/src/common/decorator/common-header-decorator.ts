import {ReadHeaders, WriteHeaders} from "../dto/base-header.dto";
import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {plainToClass} from "class-transformer";

/**
 * Writeheader decorator
 */
export const WriteHeader = createParamDecorator((data: unknown, ctx: ExecutionContext,) => {
    // Convert request header object to WriteReader class object
    return plainToClass(WriteHeaders, ctx.switchToHttp().getRequest().headers, {excludeExtraneousValues: true});
});

/**
 * Readheader decorator
 */
export const ReadHeader = createParamDecorator((data: unknown, ctx: ExecutionContext,) => {
    // Convert request header object to ReadReader class object
    return plainToClass(ReadHeaders, ctx.switchToHttp().getRequest().headers, {excludeExtraneousValues: true});
});
