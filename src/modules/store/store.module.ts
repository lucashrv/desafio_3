import { Module } from "@nestjs/common";
import { StoreService } from "./store.service";
import { StoreController } from "./store.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Store, StoreSchema } from "src/schemas/Store.schema";
import { StoreRepository } from "src/repositories/store.repository";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Store.name,
                schema: StoreSchema,
            },
        ]),
        HttpModule,
    ],
    providers: [StoreService, StoreRepository],
    controllers: [StoreController],
})
export class StoreModule {}
