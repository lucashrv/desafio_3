import { Test, TestingModule } from "@nestjs/testing";
import { MapsApiController } from "./maps-api.controller";

describe("MapsApiController", () => {
    let controller: MapsApiController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MapsApiController],
        }).compile();

        controller = module.get<MapsApiController>(MapsApiController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
