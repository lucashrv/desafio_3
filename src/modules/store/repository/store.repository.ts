import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Store } from "src/schemas/Store.schema";
import { CreateStoreDto } from "src/modules/store/dtos/create-store.dto";
import { PaginationQueryDto } from "../dtos/pagination-query.dto";
import { StoreFindAllResponse } from "../interfaces/store-find-all.interface";

export class StoreRepository {
    constructor(
        @InjectModel(Store.name) private readonly storeModel: Model<Store>,
    ) {}

    async create(storeData: CreateStoreDto): Promise<Store> {
        const createStore = new this.storeModel(storeData);

        return await createStore.save();
    }

    async findAll(query: PaginationQueryDto): Promise<StoreFindAllResponse> {
        const limit = +query.limit || 10;
        const offset = +query.offset || 0;

        const [stores, total] = await Promise.all([
            this.storeModel.find().skip(offset).limit(limit).exec(),
            this.storeModel.countDocuments(),
        ]);

        return {
            stores,
            limit,
            offset,
            total,
        };
    }
}
