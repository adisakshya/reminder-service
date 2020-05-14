import { Controller, Get } from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
    constructor(private itemService: ItemService) {}

    @Get()
    public async getAll() {
        return await this.itemService.getAll();
    }
}
