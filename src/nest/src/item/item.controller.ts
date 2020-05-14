import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateItemDto } from './create-item-dto';
import { Item } from '../database/entity/item.entity';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
    constructor(private itemService: ItemService) {}

    @Post()
    create(@Body() createItemDto: CreateItemDto): Promise<Item> {
        return this.itemService.create(createItemDto);
    }

    @Get()
    findAll(): Promise<Item[]> {
        return this.itemService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id:string): Promise<Item> {
        return this.itemService.findOne(id);
    }

    @Delete(':id')
    delete(@Param('id') id:string): Promise<void> {
        return this.itemService.remove(id);
    }
}
