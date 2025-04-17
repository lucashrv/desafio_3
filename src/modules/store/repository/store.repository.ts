import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Store } from "../../../schemas/Store.schema";
import { CreateStoreDto } from "../dtos/create-store.dto";
import { PaginationQueryDto } from "../dtos/pagination-query.dto";
import { StoreFindAllResponse } from "../interfaces/store-find-all.interface";
import { NotFoundException } from "@nestjs/common";

export class StoreRepository {
    constructor(
        @InjectModel(Store.name) private readonly storeModel: Model<Store>,
    ) {}

    async create(storeData: CreateStoreDto): Promise<Store> {
        const createStore = new this.storeModel(storeData);

        return await createStore.save();
    }

    async findAll(query: PaginationQueryDto): Promise<StoreFindAllResponse> {
        const limit = +query.limit;
        const offset = +query.offset;

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

    async findById(id: string): Promise<Store> {
        const store = await this.storeModel.findOne({ _id: id }).exec();

        if (!store) {
            throw new NotFoundException(`Loja não encontrada`);
        }

        return store;
    }

    async findByState(
        state: string,
        query: PaginationQueryDto,
    ): Promise<StoreFindAllResponse> {
        const limit = +query.limit;
        const offset = +query.offset;

        const regex = new RegExp(`^${state}$`, "i");

        const stores = await this.storeModel
            .find({ "address.state": regex })
            .skip(offset)
            .limit(limit)
            .exec();

        return {
            stores,
            limit,
            offset,
            total: stores.length,
        };
    }
}
