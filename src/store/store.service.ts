import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Store } from "src/schemas/Store.schema";
import { CreateStoreDto } from "./dto/create-store.dto";

@Injectable()
export class StoreService {
    constructor(@InjectModel(Store.name) private storeModel: Model<Store>) {}

    async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
        createStoreDto.address.zip_code =
            createStoreDto.address.zip_code.replace("-", "");

        const newStore = new this.storeModel(createStoreDto);

        return await newStore.save();
    }

    async findAllStores(): Promise<Store[]> {
        return await this.storeModel.find().exec();
    }
}
