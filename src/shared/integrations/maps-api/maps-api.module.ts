import { Module } from "@nestjs/common";
import { MapsApiService } from "./maps-api.service";
import { MapsApiController } from "./maps-api.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
    imports: [HttpModule],
    providers: [MapsApiService],
    controllers: [MapsApiController],
})
export class MapsApiModule {}
