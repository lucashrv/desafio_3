import { Test, TestingModule } from "@nestjs/testing";
import { StoreService } from "../store.service";
import { StoreRepository } from "../repository/store.repository";
import { ViaCepService } from "../../../shared/integrations/via-cep.service";
import { GoogleRoutesService } from "../../../shared/integrations/google-routes.service";
import { MelhorEnvioService } from "../../../shared/integrations/melhor-envio.service";
import {
    cep,
    paginationQuery,
    viaCepMock,
    geocodeMock,
    googleRoutesMock,
    melhorEnvioMock,
} from "./mocks/store.service.mock";
import {
    createStoreDtoMock,
    storeFindAllResponse,
} from "./mocks/store.controller.mock";
import { NotFoundException } from "@nestjs/common";
import { GoogleGeocodeService } from "../../../shared/integrations/google-geocoding.service";

describe("StoreService", () => {
    let storeService: StoreService;
    let storeRepository: StoreRepository;
    let viaCepService: ViaCepService;
    let googleGeocodeService: GoogleGeocodeService;
    let googleRoutesService: GoogleRoutesService;
    let melhorEnvioService: MelhorEnvioService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                StoreService,
                {
                    provide: StoreRepository,
                    useValue: {
                        findAll: jest
                            .fn()
                            .mockResolvedValue(storeFindAllResponse),
                        create: jest.fn().mockResolvedValue(createStoreDtoMock),
                        findById: jest
                            .fn()
                            .mockResolvedValue(storeFindAllResponse.stores[0]),
                        findByState: jest
                            .fn()
                            .mockResolvedValue(storeFindAllResponse),
                    },
                },
                {
                    provide: ViaCepService,
                    useValue: {
                        getAddressByCep: jest
                            .fn()
                            .mockResolvedValue(viaCepMock),
                    },
                },
                {
                    provide: GoogleGeocodeService,
                    useValue: {
                        getCoordsFromAddress: jest
                            .fn()
                            .mockResolvedValue(geocodeMock),
                    },
                },
                {
                    provide: GoogleRoutesService,
                    useValue: {
                        getDistanceBetweenPoints: jest
                            .fn()
                            .mockImplementation(googleRoutesMock),
                    },
                },
                {
                    provide: MelhorEnvioService,
                    useValue: {
                        calculateShipping: jest
                            .fn()
                            .mockResolvedValue(melhorEnvioMock),
                    },
                },
            ],
        }).compile();

        storeService = module.get<StoreService>(StoreService);
        storeRepository = module.get(StoreRepository);
        viaCepService = module.get(ViaCepService);
        googleGeocodeService = module.get(GoogleGeocodeService);
        googleRoutesService = module.get(GoogleRoutesService);
        melhorEnvioService = module.get(MelhorEnvioService);
    });

    it("should be defined", () => {
        expect(storeService).toBeDefined();
        expect(storeRepository).toBeDefined();
        expect(viaCepService).toBeDefined();
        expect(googleGeocodeService).toBeDefined();
        expect(googleRoutesService).toBeDefined();
        expect(melhorEnvioService).toBeDefined();
    });

    describe("createStore", () => {
        it("Deve criar uma nova loja com as chamadas a API corretas", async () => {
            const result = await storeService.createStore(createStoreDtoMock);

            expect(viaCepService.getAddressByCep).toHaveBeenCalledWith(
                "99999999",
            );
            expect(
                googleGeocodeService.getCoordsFromAddress,
            ).toHaveBeenCalled();
            expect(storeRepository.create).toHaveBeenCalledWith(
                expect.any(Object),
            );
            expect(result).toEqual(createStoreDtoMock);
        });
    });

    describe("findAllStores", () => {
        it("Deve retornar todas lojas com paginação", async () => {
            const result = await storeService.findAllStores(paginationQuery);

            expect(result.stores.length).toBe(2);
            expect(result.stores[0].name).toBe("Nome Teste");
            expect(result.stores[1].name).toBe("Nome Teste 2");
        });
    });

    describe("findStoresByCep", () => {
        it("Retorno esperado de lojas 'PDV' ou 'LOJA' com seu frete e distância calculada com base no Cep", async () => {
            const result = await storeService.findStoresByCep(
                cep,
                paginationQuery,
            );

            expect(viaCepService.getAddressByCep).toHaveBeenCalledWith(cep);
            expect(
                googleGeocodeService.getCoordsFromAddress,
            ).toHaveBeenCalled();
            expect(
                googleRoutesService.getDistanceBetweenPoints,
            ).toHaveBeenCalledTimes(2);
            expect(melhorEnvioService.calculateShipping).toHaveBeenCalledWith(
                "99999999",
                "12345678",
            );
            expect(result.stores.length).toBe(2);
            expect(result.stores[0].type).toBe("PDV");
            expect(result.stores[1].type).toBe("LOJA");
            expect(result.stores[0]).toHaveProperty("distance");
            expect(result.stores[0].value[0]).toHaveProperty("price");
        });
    });

    describe("findStoreById", () => {
        it("Deve retornar a loja com o 'id' requisitado", async () => {
            const id = "68000d573490d6376428f566";

            const result = await storeService.findStoreById(id);

            expect(storeRepository.findById).toHaveBeenCalledWith(id);
            expect(result).toEqual(storeFindAllResponse.stores[0]);
        });

        it("Deve lançar erro se loja não for encontrada", async () => {
            jest.spyOn(storeRepository, "findById").mockRejectedValue(
                new NotFoundException("Loja não encontrada"),
            );

            await expect(storeService.findStoreById("invalid")).rejects.toThrow(
                "Loja não encontrada",
            );
        });
    });

    describe("findStoreByState", () => {
        it("Deve retornar todas lojas filtradas por estado com paginação", async () => {
            const state = "Estato Teste";

            const result = await storeService.findStoreByState(
                state,
                paginationQuery,
            );

            expect(storeRepository.findByState).toHaveBeenCalledWith(
                state,
                paginationQuery,
            );
            expect(result).toEqual(storeFindAllResponse);
        });

        it("Deve retornar uma lista vazia se nenhuma loja for encontrada no estado", async () => {
            const query = { limit: "5", offset: "0" };
            const state = "Acre";

            const emptyMock = {
                stores: [],
                limit: 5,
                offset: 0,
                total: 0,
            };

            jest.spyOn(storeRepository, "findByState").mockResolvedValue(
                emptyMock,
            );

            const result = await storeService.findStoreByState(state, query);

            expect(storeRepository.findByState).toHaveBeenCalledWith(
                state,
                query,
            );
            expect(result).toEqual(emptyMock);
        });
    });
});
