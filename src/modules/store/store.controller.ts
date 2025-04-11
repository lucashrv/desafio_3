import {
    Body,
    Controller,
    Get,
    Post,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { StoreService } from "./store.service";
import { CreateStoreDto } from "./dto/create-store.dto";
import { Store } from "src/schemas/Store.schema";

@Controller("api")
export class StoreController {
    constructor(private storeService: StoreService) {}

    @Post("store")
    @UsePipes(new ValidationPipe())
    async createStore(@Body() body: CreateStoreDto): Promise<Store> {
        return await this.storeService.createStore(body);
    }

    @Get("stores")
    async findAllStores(): Promise<Store[]> {
        return await this.storeService.findAllStores();
    }
}
