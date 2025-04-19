import { Store } from "../../../schemas/Store.schema";
import { CreateStoreDto } from "../dtos/create-store.dto";
import { PaginationQueryDto } from "../dtos/pagination-query.dto";
import { StoreFindAllResponse } from "../interfaces/store-find-all.interface";
import { StoreByCepResponse } from "../interfaces/store-by-cep.interface";

export interface IStoreService {
    createStore(createStoreDto: CreateStoreDto): Promise<Store>;
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
