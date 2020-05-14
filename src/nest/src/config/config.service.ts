import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Item } from '../database/entity/item.entity';
import { User } from '../database/entity/user.entity';

require('dotenv').config();

class ConfigService {
    constructor(private env: {
        [k: string]: string | undefined
    }) {}

    private getValue(key: string, throwOnMissing=true): string {
        const value = this.env[key];
        if(!value && throwOnMissing) {
            throw new Error('config error - missing env.${key}');
        }
        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(key => this.getValue(key));
        return this;
    }

    public isProduction() {
        return this.getValue('MODE', false) != 'DEV';
    }

    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            'type': 'postgres',
            'host': this.getValue('POSTGRES_HOST'),
            'username': this.getValue('POSTGRES_USER'),
            'password': this.getValue('POSTGRES_PASSWORD'),
            'database': this.getValue('POSTGRES_DATABASE'),
            'ssl': this.isProduction(),
            'entities': [Item, User],
            'logging': false,
            'synchronize': true,
        };
    }
}

export const configService = new ConfigService(process.env)
    .ensureValues([
        'POSTGRES_HOST',
        'POSTGRES_PORT',
        'POSTGRES_USER',
        'POSTGRES_PASSWORD',
        'POSTGRES_DATABASE'
    ]);