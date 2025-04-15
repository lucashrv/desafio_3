import {
    InternalServerErrorException,
    NotFoundException,
    UnprocessableEntityException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Store } from "src/schemas/Store.schema";
import { CreateStoreDto } from "src/modules/store/dto/create-store.dto";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";

export class StoreRepository {
    constructor(
        @InjectModel(Store.name) private readonly storeModel: Model<Store>,
        private readonly httpService: HttpService,
    ) {}

    async createStore(createStoreDto: CreateStoreDto) {
        try {
            createStoreDto.address.zip_code =
                createStoreDto.address.zip_code.replace("-", "");

            if (
                createStoreDto.address.zip_code.length !== 8 ||
                typeof +createStoreDto.address.zip_code !== "number"
            )
                throw new UnprocessableEntityException(
                    "O CEP precisa ser de 8 dígitos numéricos",
                );

            const viaCep = await lastValueFrom(
                this.httpService.get(
                    `https://viacep.com.br/ws/${createStoreDto.address.zip_code}/json/`,
                ),
            );

            if (viaCep.data?.erro)
                throw new NotFoundException("CEP não encontrado!");

            const nominatim = await lastValueFrom(
                this.httpService.get(
                    `https://nominatim.openstreetmap.org/search?q=${viaCep.data.logradouro},${viaCep.data.bairro},${viaCep.data.localidade},${viaCep.data.estado},${createStoreDto.address.country}&format=json`,
                ),
            );

            if (!nominatim.data[0])
                throw new NotFoundException(
                    "Localização não encontrada, confira o CEP e o Número do local!",
                );

            const newStore = new this.storeModel({
                ...createStoreDto,
                address: {
                    ...createStoreDto.address,
                    street: viaCep.data.logradouro,
                    neighborhood: viaCep.data.bairro,
                    city: viaCep.data.localidade,
                    state: viaCep.data.estado,
                    lat: nominatim.data[0].lat,
                    long: nominatim.data[0].lon,
                    fullAddress: `${viaCep.data.logradouro}, ${createStoreDto.address.number} - ${viaCep.data.bairro}, ${viaCep.data.localidade}, ${viaCep.data.estado}, ${createStoreDto.address.country}`,
                },
            });

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
