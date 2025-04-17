import { Module } from "@nestjs/common";
import { StoreService } from "./store.service";
import { StoreController } from "./store.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Store, StoreSchema } from "src/schemas/Store.schema";
import { StoreRepository } from "./repository/store.repository";
import { HttpModule } from "@nestjs/axios";
import { ViaCepService } from "src/shared/integrations/via-cep.service";
import { NominatimService } from "src/shared/integrations/nominatim.service";
import { GoogleRoutesService } from "src/shared/integrations/google-routes.service";
import { MelhorEnvioService } from "src/shared/integrations/melhor-envio.service";
import { GoogleGeocodeService } from "src/shared/integrations/google-geocoding.service";

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
    providers: [
        StoreService,
        StoreRepository,
        ViaCepService,
        NominatimService,
        GoogleRoutesService,
        MelhorEnvioService,
        GoogleGeocodeService,
    ],
    controllers: [StoreController],
})
export class StoreModule {}
