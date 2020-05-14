import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './create-item-dto';
import { Item } from '../database/entity/item.entity';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ItemService {
    constructor(
        @InjectRepository(Item)
        private readonly itemRepository: Repository<Item>
    ) {}

    create(createItemDto: CreateItemDto): Promise<Item> {
        const item = new Item();
        item.id = uuidv4();
        item.name = createItemDto.name;
        item.description = createItemDto.description;
        item.createdAt = new Date();
        item.updatedAt = new Date();
        return this.itemRepository.save(item);
    }

    async findAll(): Promise<Item[]> {
        return await this.itemRepository.find();
    }

    findOne(id: string): Promise<Item> {
        return this.itemRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.itemRepository.delete(id);
    }
}
