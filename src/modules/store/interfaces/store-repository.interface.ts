import { Store } from "../../../schemas/Store.schema";
import { CreateStoreDto } from "../dtos/create-store.dto";
import { PaginationQueryDto } from "../dtos/pagination-query.dto";
import { StoreFindAllResponse } from "../interfaces/store-find-all.interface";

export interface IStoreRepository {
    create(storeData: CreateStoreDto): Promise<Store>;
    findAll(query: PaginationQueryDto): Promise<StoreFindAllResponse>;
    findById(id: string): Promise<Store>;
    findByState(
        state: string,
        query: PaginationQueryDto,
    ): Promise<StoreFindAllResponse>;
}
