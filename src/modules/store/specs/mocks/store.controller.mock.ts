import { StoreType } from "../../../../schemas/Store.schema";
import { CreateStoreDto } from "../../dtos/create-store.dto";
import { PaginationQueryDto } from "../../dtos/pagination-query.dto";
import { StoreByCepResponse } from "../../interfaces/store-by-cep.interface";
import { StoreFindAllResponse } from "../../interfaces/store-find-all.interface";
import { AddressDto } from "./../../dtos/address.dto";

export const storeFindAllResponse: StoreFindAllResponse = {
    stores: [
        {
            _id: "68000d573490d6376428f566",
            name: "Nome Teste",
            email: "emailteste@gmail.com",
            phoneNumber: "11111111111",
            takeOutInStore: true,
            shippingTimeInDays: 1,
            type: "LOJA",
            address: {
                zip_code: "99999999",
                street: "Rua Teste",
                number: "123",
                neighborhood: "Bairro Teste",
                city: "Cidade Teste",
                state: "Estado Teste",
                country: "Brasil",
                fullAddress: "Teste de endereço completo",
                lat: "-1.038504",
                long: "-1.936097",
            },
        },
        {
            _id: "68000d573490d6376428f566",
            name: "Nome Teste 2",
            email: "emailteste2@gmail.com",
            phoneNumber: "11111111111",
            takeOutInStore: true,
            shippingTimeInDays: 1,
            type: "PDV",
            address: {
                zip_code: "99999999",
                street: "Rua Teste",
                number: "123",
                neighborhood: "Bairro Teste",
                city: "Cidade Teste",
                state: "Estado Teste",
                country: "Brasil",
                fullAddress: "Teste de endereço completo",
                lat: "3.038504",
                long: "-1.936097",
            },
        },
    ] as any,
    limit: 2,
    offset: 0,
    total: 2,
};

export const storeByCepResponse: StoreByCepResponse = {
    stores: [
        {
            name: "Loja Teste",
            city: "Cidade Teste",
            cep: "12345678",
            type: "PDV",
            distance: "10 km",
            value: [
                {
                    prazo: "3 dias úteis",
                    price: "R$ 15,00",
                    description: "Motoboy",
                },
            ],
        },
        {
            name: "Loja Teste 2",
            city: "Cidade Teste 2",
            cep: "12345678",
            type: "LOJA",
            distance: "74 km",
            value: [
                {
                    prazo: "5 dias úteis",
                    price: "R$ 27,00",
                    description: "PAC",
                },
                {
                    prazo: "7 dias úteis",
                    price: "R$ 30,00",
                    description: "Sedex",
                },
            ],
        },
    ],
    pins: [
        {
            title: "Loja Teste",
            position: { lat: 1.234, lng: 5.678 },
        },
        {
            title: "Loja Teste 2",
            position: { lat: 2.234, lng: 8.678 },
        },
    ],
    limit: 10,
    offset: 0,
    total: 2,
};

export const paginationQuery: PaginationQueryDto = { limit: "2", offset: "0" };

export const cep = "12345-678";

const addressDto: AddressDto = {
    zip_code: "99999999",
    street: "Rua Teste",
    number: "123",
    neighborhood: "Bairro Teste",
    city: "Cidade Teste",
    state: "Estado Teste",
    country: "Brasil",
    fullAddress: "Rua Teste, 100 - Centro, Cidade X, Estado Y, Brasil",
    lat: "3.038504",
    long: "-1.936097",
};

export const createStoreDtoMock: CreateStoreDto = {
    name: "Loja Teste",
    email: "emailteste@gmail.com",
    phoneNumber: "11111111111",
    takeOutInStore: true,
    type: StoreType.PDV,
    shippingTimeInDays: 3,
    address: addressDto,
};
