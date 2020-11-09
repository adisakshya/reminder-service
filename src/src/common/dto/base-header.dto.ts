import {Expose} from "class-transformer";
import {IsString} from "class-validator";

export class ReadHeaders {

    /**
     * Identifies the consumer making the request
     */
    @Expose()
    @IsString()
    "x-consumer-username": string;

    /**
     * Identifies the user that logins into the application
     */
    @Expose()
    @IsString()
    "x-authenticated-userid": string;

    public get userName() {
        return this["x-consumer-username"];
    }

    public get userId() {
        return this["x-authenticated-userid"];
    }

}

export class WriteHeaders extends ReadHeaders {

    /**
     * Add header attributes specific to write operations here
     */

}
