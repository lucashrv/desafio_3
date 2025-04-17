import { PaginationQueryDto } from "../../dtos/pagination-query.dto";

export const paginationQuery: PaginationQueryDto = { limit: "2", offset: "0" };

export const cep = "12345-678";

export const viaCepMock = {
    logradouro: "Rua Teste",
    bairro: "Bairro Teste",
    localidade: "Cidade Teste",
    estado: "UF",
};

export const geocodeMock = {
    lat: "1.234",
    lng: "5.678",
};

export const googleRoutesMock = (store: { lat: number; long: number }) => {
    return Promise.resolve({ km: store.lat < 2 ? 50 : 150 });
};
export const melhorEnvioMock = [
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
];
