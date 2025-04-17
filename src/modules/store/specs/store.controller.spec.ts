import { Test, TestingModule } from "@nestjs/testing";
import { StoreController } from "../store.controller";
import { StoreService } from "../store.service";
import {
    cep,
    paginationQuery,
    storeFindAllResponse,
    storeByCepResponse,
    createStoreDtoMock,
} from "./mocks/store.controller.mock";

describe("StoreController", () => {
    let storeController: StoreController;
    let storeService: StoreService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StoreController],
            providers: [
                {
                    provide: StoreService,
                    useValue: {
                        createStore: jest
                            .fn()
                            .mockResolvedValue(createStoreDtoMock),
                        findAllStores: jest
                            .fn()
                            .mockResolvedValue(storeFindAllResponse),
                        findStoresByCep: jest
                            .fn()
                            .mockResolvedValue(storeByCepResponse),
                        findStoreById: jest
                            .fn()
                            .mockResolvedValue(storeFindAllResponse.stores[0]),
                        findStoreByState: jest
                            .fn()
                            .mockResolvedValue(storeFindAllResponse),
                    },
                },
            ],
        }).compile();

        storeController = module.get<StoreController>(StoreController);
        storeService = module.get<StoreService>(StoreService);
    });

    it("should be defined", () => {
        expect(storeController).toBeDefined();
        expect(storeService).toBeDefined();
    });

    describe("createStore", () => {
        it("Deve criar uma nova loja chamando o service com o DTO correto", async () => {
            const result =
                await storeController.createStore(createStoreDtoMock);

            expect(storeService.createStore).toHaveBeenCalledWith(
                createStoreDtoMock,
            );
            expect(result).toEqual(createStoreDtoMock);
        });
    });

    describe("findAllStores", () => {
        it("Deve retornar todas lojas com paginação", async () => {
            const result = await storeController.findAllStores(paginationQuery);

            expect(result).toEqual(storeFindAllResponse);
            expect(storeService.findAllStores).toHaveBeenCalledWith(
                paginationQuery,
            );
        });
    });

    describe("findStoresByCep", () => {
        it("Deve retornar lojas próximas a partir de um CEP", async () => {
            const result = await storeController.findStoresByCep(
                cep,
                paginationQuery,
            );

            expect(result).toEqual(storeByCepResponse);
            expect(storeService.findStoresByCep).toHaveBeenCalledWith(
                cep,
                paginationQuery,
            );
        });
    });

    describe("findStoreById", () => {
        it("Deve retornar a loja com o 'id' requisitado", async () => {
            const id = "68000d573490d6376428f566";

            const result = await storeController.findStoreById(id);

            expect(result).toEqual(storeFindAllResponse.stores[0]);
            expect(storeService.findStoreById).toHaveBeenCalledWith(id);
        });
    });

    describe("findStoreByState", () => {
        it("Deve retornar todas lojas que possuam o 'state' requisitado com paginação", async () => {
            const state = "Estado Teste";

            const result = await storeController.findStoreByState(
                state,
                paginationQuery,
            );

            expect(result).toEqual(storeFindAllResponse);
            expect(result.stores[0].address.state).toEqual(
                storeFindAllResponse.stores[0].address.state,
            );
            expect(storeService.findStoreByState).toHaveBeenCalledWith(
                state,
                paginationQuery,
            );
        });
    });
});
