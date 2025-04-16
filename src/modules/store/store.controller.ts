import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { StoreService } from "./store.service";
import { CreateStoreDto } from "./dtos/create-store.dto";
import { Store } from "src/schemas/Store.schema";
import { StoreByCepResponse } from "./dtos/store-by-cep.dto";

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

    @Get("stores/cep/:cep")
    async getStoresByCep(
        @Param("cep") cep: string,
    ): Promise<StoreByCepResponse> {
        return await this.storeService.findStoresByCep(cep);
    }
}
