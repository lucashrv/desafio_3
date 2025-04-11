import { Injectable } from "@nestjs/common";
import { Store } from "src/schemas/Store.schema";
import { CreateStoreDto } from "./dto/create-store.dto";
import { StoreRepository } from "src/repositories/store.repository";

@Injectable()
export class StoreService {
    constructor(private storeRepository: StoreRepository) {}

    async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
        return await this.storeRepository.createStore(createStoreDto);
    }

    async findAllStores(): Promise<Store[]> {
        return await this.storeRepository.findAllStore();
    }
}
