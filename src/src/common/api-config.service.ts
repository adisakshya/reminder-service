import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class ApiConfigService {

    constructor(private readonly configService: ConfigService) {
    }

    get isProduction(): boolean {
        return this.configService.get<string>('NODE_ENV') === 'production';
    }

    get dbName(): string {
        return this.configService.get<string>('DB_NAME') ?? 'bookmarks';
    }

    get dbHost(): string {
        return this.configService.get<string>('DB_HOST') ?? '192.168.99.100';
    }

    get dbPassword(): string {
        return this.configService.get<string>('DB_PASS') ?? 'root';
    }

    get dbUser(): string {
        return this.configService.get<string>('DB_USER') ?? 'root';
    }

}