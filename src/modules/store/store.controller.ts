import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { StoreService } from "./store.service";
import { CreateStoreDto } from "./dtos/create-store.dto";
import { Store } from "src/schemas/Store.schema";
import { StoreByCepResponse } from "./interfaces/store-by-cep.interface";
import { PaginationQueryDto } from "./dtos/pagination-query.dto";
import { StoreFindAllResponse } from "./interfaces/store-find-all.interface";

@Controller("api")
export class StoreController {
    constructor(private storeService: StoreService) {}

    @Post("store")
    @UsePipes(new ValidationPipe())
    async createStore(@Body() body: CreateStoreDto): Promise<Store> {
        return await this.storeService.createStore(body);
    }

    @Get("stores")
    async findAllStores(
        @Query() query: PaginationQueryDto,
    ): Promise<StoreFindAllResponse> {
        return await this.storeService.findAllStores(query);
    }

    @Get("stores/cep/:cep")
    async findStoresByCep(
        @Param("cep") cep: string,
        @Query() query: PaginationQueryDto,
    ): Promise<StoreByCepResponse> {
        return await this.storeService.findStoresByCep(cep, query);
    }

    @Get("store/:id")
    async findStoreById(@Param("id") id: string): Promise<Store> {
        return await this.storeService.findStoreById(id);
    }

    @Get("stores/state/:state")
    async findStoreByState(
        @Param("state") state: string,
        @Query() query: PaginationQueryDto,
    ): Promise<StoreFindAllResponse> {
        return await this.storeService.findStoreByState(state, query);
    }
}
