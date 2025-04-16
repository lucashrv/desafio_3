import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Store } from "src/schemas/Store.schema";
import { CreateStoreDto } from "src/modules/store/dtos/create-store.dto";

export class StoreRepository {
    constructor(
        @InjectModel(Store.name) private readonly storeModel: Model<Store>,
    ) {}

    async create(storeData: CreateStoreDto): Promise<Store> {
        const createStore = new this.storeModel(storeData);

        return await createStore.save();
    }
    async findAll(): Promise<Store[]> {
        return await this.storeModel.find().exec();
    }
}
