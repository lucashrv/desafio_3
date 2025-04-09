import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Store } from "src/schemas/Store.schema";

@Injectable()
export class StoreService {
    constructor(@InjectModel(Store.name) private storeModel: Model<Store>) {}

    // createStore(createStoreDto){

    // }
}
