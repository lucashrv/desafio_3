import { CreateStoreDto } from "../dtos/create-store.dto";
import { PaginationQueryDto } from "../dtos/pagination-query.dto";
import { Store } from "../../../schemas/Store.schema";
import { StoreByCepResponse } from "./store-by-cep.interface";
import { StoreFindAllResponse } from "./store-find-all.interface";

export interface IStoreController {
    createStore(body: CreateStoreDto): Promise<Store>;
    findAllStores(query: PaginationQueryDto): Promise<StoreFindAllResponse>;
    findStoresByCep(
        cep: string,
        query: PaginationQueryDto,
    ): Promise<StoreByCepResponse>;
    findStoreById(id: string): Promise<Store>;
    findStoreByState(
        state: string,
        query: PaginationQueryDto,
    ): Promise<StoreFindAllResponse>;
}
