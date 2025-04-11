import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { StoreModule } from "./modules/store/store.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            useFactory: (config: ConfigService) => ({
                uri: config.get<string>("MONGO_URI"),
            }),
            inject: [ConfigService],
        }),
        StoreModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
