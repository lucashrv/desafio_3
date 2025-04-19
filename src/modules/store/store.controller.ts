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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { IStoreController } from "./interfaces/store-controller.interface";

@ApiTags("Store")
@Controller("api")
export class StoreController implements IStoreController {
    constructor(private storeService: StoreService) {}

    @Post("store")
    @ApiOperation({ summary: "Criar uma nova loja" })
    @ApiResponse({ status: 201, description: "Loja criada com sucesso" })
    @UsePipes(new ValidationPipe())
    async createStore(@Body() body: CreateStoreDto): Promise<Store> {
        return await this.storeService.createStore(body);
    }

    @Get("stores")
    @ApiOperation({ summary: "Pesquisar todas as lojas" })
    @ApiResponse({ status: 200, description: "Lojas retornadas com sucesso" })
    async findAllStores(
        @Query() query: PaginationQueryDto,
    ): Promise<StoreFindAllResponse> {
        return await this.storeService.findAllStores(query);
    }

    @Get("stores/cep/:cep")
    @ApiParam({ name: "cep", type: String, example: "50680000" })
    @ApiOperation({
        summary: "Pesquisar lojas com base no cep e retornar com o frete",
    })
    @ApiResponse({
        status: 200,
        description: "Lojas com frete retornadas com sucesso",
    })
    async findStoresByCep(
        @Param("cep") cep: string,
        @Query() query: PaginationQueryDto,
    ): Promise<StoreByCepResponse> {
        return await this.storeService.findStoresByCep(cep, query);
    }

    @Get("store/:id")
    @ApiParam({ name: "id", type: String })
    @ApiOperation({
        summary: "Pesquisar loja pelo id",
    })
    @ApiResponse({
        status: 200,
        description: "Loja retornada com sucesso",
    })
    async findStoreById(@Param("id") id: string): Promise<Store> {
        return await this.storeService.findStoreById(id);
    }

    @Get("stores/state/:state")
    @ApiParam({ name: "state", type: String, example: "Pernambuco" })
    @ApiOperation({
        summary: "Pesquisar lojas pelo estado",
    })
    @ApiResponse({
        status: 200,
        description: "Lojas por estado retornado com sucesso",
    })
    async findStoreByState(
        @Param("state") state: string,
        @Query() query: PaginationQueryDto,
    ): Promise<StoreFindAllResponse> {
        return await this.storeService.findStoreByState(state, query);
    }
}
