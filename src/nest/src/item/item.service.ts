import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../database/entity/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private readonly repo: Repository<Item>
    ) {}

    public async getAll(): Promise<Item[]> {
        return await this.repo.find();
    }
}
