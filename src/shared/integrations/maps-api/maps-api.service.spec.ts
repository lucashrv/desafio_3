import { Test, TestingModule } from "@nestjs/testing";
import { MapsApiService } from "./maps-api.service";

describe("MapsApiService", () => {
    let service: MapsApiService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MapsApiService],
        }).compile();

        service = module.get<MapsApiService>(MapsApiService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
