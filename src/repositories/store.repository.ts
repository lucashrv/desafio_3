import { InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Store } from "src/schemas/Store.schema";
import { CreateStoreDto } from "src/modules/store/dto/create-store.dto";

export class StoreRepository {
    constructor(
        @InjectModel(Store.name) private readonly storeModel: Model<Store>,
    ) {}

    async createStore(createStoreDto: CreateStoreDto) {
        try {
            createStoreDto.address.zip_code =
                createStoreDto.address.zip_code.replace("-", "");

            const newStore = new this.storeModel(createStoreDto);

            return await newStore.save();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
    async findAllStore() {
        try {
            return await this.storeModel.find().exec();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
