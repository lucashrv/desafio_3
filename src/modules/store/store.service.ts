import { Injectable } from "@nestjs/common";
import { Store } from "src/schemas/Store.schema";
import { CreateStoreDto } from "./dtos/create-store.dto";
import { StoreRepository } from "./repository/store.repository";
import {
    Pin,
    StoreByCepResponse,
    StoreItem,
} from "./interfaces/store-by-cep.interface";
import { ViaCepService } from "src/shared/integrations/via-cep.service";
import { NominatimService } from "src/shared/integrations/nominatim.service";
import { GoogleRoutesService } from "src/shared/integrations/google-routes.service";
import { MelhorEnvioService } from "src/shared/integrations/melhor-envio.service";
import { PaginationQueryDto } from "./dtos/pagination-query.dto";
import { StoreFindAllResponse } from "./interfaces/store-find-all.interface";

@Injectable()
export class StoreService {
    constructor(
        private storeRepository: StoreRepository,
        private readonly viaCepService: ViaCepService,
        private readonly nominatimService: NominatimService,
        private readonly googleRoutesService: GoogleRoutesService,
        private readonly melhorEnvioService: MelhorEnvioService,
    ) {}

    async createStore(createStoreDto: CreateStoreDto): Promise<Store> {
        const viaCep = await this.viaCepService.getAddressByCep(
            createStoreDto.address.zip_code,
        );

        const nominatim = await this.nominatimService.getCoordinates({
            logradouro: viaCep.logradouro,
            number: createStoreDto.address.number,
            bairro: viaCep.bairro,
            localidade: viaCep.localidade,
            estado: viaCep.estado,
            country: createStoreDto.address.country,
        });

        const storeData: CreateStoreDto = {
            ...createStoreDto,
            address: {
                ...createStoreDto.address,
                street: viaCep.logradouro,
                neighborhood: viaCep.bairro,
                city: viaCep.localidade,
                state: viaCep.estado,
                lat: nominatim.lat,
                long: nominatim.lon,
                fullAddress: `${viaCep.logradouro}, ${createStoreDto.address.number} - ${viaCep.bairro}, ${viaCep.localidade}, ${viaCep.estado}, ${createStoreDto.address.country}`,
            },
        };

        return await this.storeRepository.create(storeData);
    }

    async findAllStores(
        query: PaginationQueryDto,
    ): Promise<StoreFindAllResponse> {
        return await this.storeRepository.findAll(query);
    }

    async findStoresByCep(
        cep: string,
        query: PaginationQueryDto,
    ): Promise<StoreByCepResponse> {
        const cleanCep = cep.replace(/\D/g, "");

        const viaCep = await this.viaCepService.getAddressByCep(cep);

        const nominatim = await this.nominatimService.getCoordinates({
            logradouro: viaCep.logradouro,
            bairro: viaCep.bairro,
            localidade: viaCep.localidade,
            estado: viaCep.estado,
        });

        const destinationCoords = {
            lat: parseFloat(nominatim.lat),
            lng: parseFloat(nominatim.lon),
        };

        const allStores = await this.storeRepository.findAll(query);

        const stores: StoreItem[] = [];
        const pins: Pin[] = [];

        for (const store of allStores.stores) {
            const storeCoords = {
                lat: parseFloat(store.address.lat),
                lng: parseFloat(store.address.long),
            };

            const distance =
                await this.googleRoutesService.getDistanceBetweenPoints(
                    storeCoords,
                    destinationCoords,
                );

            const isPDV = distance.km <= 50;

            if (isPDV) {
                stores.push({
                    name: store.name,
                    city: store.address.city,
                    cep: store.address.zip_code,
                    type: "PDV",
                    distance: `${distance.km.toFixed(2)} km`,
                    value: [
                        {
                            prazo: `${store.shippingTimeInDays} dias úteis`,
                            price: "R$ 15,00",
                            description: "Motoboy",
                        },
                    ],
                });
            } else {
                const fretes = await this.melhorEnvioService.calculateShipping(
                    store.address.zip_code,
                    cleanCep,
                );

                stores.push({
                    name: store.name,
                    city: store.address.city,
                    cep: store.address.zip_code,
                    type: "LOJA",
                    distance: `${distance.km.toFixed(2)} km`,
                    value: fretes,
                });
            }

            pins.push({
                title: store.name,
                position: storeCoords,
            });
        }

        return {
            stores,
            pins,
            limit: allStores.limit,
            offset: allStores.offset,
            total: allStores.total,
        };
    }

    async findStoreById(id: string): Promise<Store> {
        return await this.storeRepository.findById(id);
    }

    async findStoreByState(
        state: string,
        query: PaginationQueryDto,
    ): Promise<StoreFindAllResponse> {
        return await this.storeRepository.findByState(state, query);
    }
}
