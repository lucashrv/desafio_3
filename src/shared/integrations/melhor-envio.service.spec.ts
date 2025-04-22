import { Test, TestingModule } from "@nestjs/testing";
import { HttpService } from "@nestjs/axios";
import { of } from "rxjs";
import { MelhorEnvioService } from "./melhor-envio.service";

const mockResponse = {
    data: [
        {
            id: "123",
            name: "PAC",
            delivery_time: 5,
            price: "20.00",
        },
        {
            id: "456",
            name: "SEDEX",
            delivery_time: 2,
            price: "35.00",
        },
    ],
};

describe("MelhorEnvioService", () => {
    let melhorEnvioService: MelhorEnvioService;

    const httpServiceMock = {
        post: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MelhorEnvioService,
                {
                    provide: HttpService,
                    useValue: httpServiceMock,
                },
            ],
        }).compile();

        melhorEnvioService = module.get<MelhorEnvioService>(MelhorEnvioService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("calculateShipping", () => {
        it("Deve retornar uma lista de opções de frete", async () => {
            httpServiceMock.post.mockReturnValue(of(mockResponse));

            const result = await melhorEnvioService.calculateShipping(
                "12345678",
                "87654321",
                1,
            );

            expect(result).toEqual([
                {
                    codProdutoAgencia: "123",
                    description: "PAC",
                    prazo: "6 dias úteis",
                    price: "R$ 20.00",
                },
                {
                    codProdutoAgencia: "456",
                    description: "SEDEX",
                    prazo: "3 dias úteis",
                    price: "R$ 35.00",
                },
            ]);
            expect(httpServiceMock.post).toHaveBeenCalled();
        });

        it("Deve retornar erro quando um item possui erro na resposta", async () => {
            const mockResponse = {
                data: [
                    {
                        error: "Frete não disponível",
                    },
                ],
            };

            httpServiceMock.post.mockReturnValue(of(mockResponse));

            const result = await melhorEnvioService.calculateShipping(
                "00000000",
                "11111111",
                1,
            );

            expect(result).toEqual([
                {
                    error: "Frete não disponível",
                },
            ]);
        });
    });
});
