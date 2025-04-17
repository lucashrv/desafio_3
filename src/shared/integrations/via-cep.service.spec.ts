import { Test, TestingModule } from "@nestjs/testing";
import { HttpService } from "@nestjs/axios";
import { ViaCepService } from "./via-cep.service";
import {
    NotFoundException,
    UnprocessableEntityException,
} from "@nestjs/common";
import { of } from "rxjs";

const cep = "12345-678";

const dataMock = {
    logradouro: "Rua Teste",
    bairro: "Bairro Teste",
    localidade: "Cidade Teste",
    uf: "PE",
};

describe("ViaCepService", () => {
    let viaCepService: ViaCepService;

    const httpServiceMock = {
        get: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ViaCepService,
                {
                    provide: HttpService,
                    useValue: httpServiceMock,
                },
            ],
        }).compile();

        viaCepService = module.get<ViaCepService>(ViaCepService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getAddressByCep", () => {
        it("Deve retornar os dados do endereço quando o CEP for válido", async () => {
            httpServiceMock.get.mockReturnValue(of({ data: dataMock }));

            const result = await viaCepService.getAddressByCep(cep);

            expect(result).toEqual(dataMock);
            expect(httpServiceMock.get).toHaveBeenCalledWith(
                "https://viacep.com.br/ws/12345678/json/",
            );
        });

        it("Deve lançar UnprocessableEntityException se o CEP for inválido", async () => {
            const invalidCep = "12345-67";

            await expect(
                viaCepService.getAddressByCep(invalidCep),
            ).rejects.toThrow(UnprocessableEntityException);

            expect(httpServiceMock.get).not.toHaveBeenCalled();
        });

        it("Deve lançar NotFoundException se o CEP não for encontrado", async () => {
            httpServiceMock.get.mockReturnValue(
                of({ data: { erro: true }, status: 200 }),
            );

            await expect(viaCepService.getAddressByCep(cep)).rejects.toThrow(
                NotFoundException,
            );
            expect(httpServiceMock.get).toHaveBeenCalledWith(
                "https://viacep.com.br/ws/12345678/json/",
            );
        });
    });
});
