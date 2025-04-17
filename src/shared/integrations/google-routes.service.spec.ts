import { Test, TestingModule } from "@nestjs/testing";
import { HttpService } from "@nestjs/axios";
import { NotFoundException } from "@nestjs/common";
import { of } from "rxjs";
import { GoogleRoutesService } from "./google-routes.service";

const mockResponse = {
    data: {
        routes: [
            {
                distanceMeters: 1560,
                duration: "532s",
            },
        ],
    },
};

describe("GoogleGeocodeService", () => {
    let googleRoutesService: GoogleRoutesService;

    const httpServiceMock = {
        post: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GoogleRoutesService,
                {
                    provide: HttpService,
                    useValue: httpServiceMock,
                },
            ],
        }).compile();

        googleRoutesService =
            module.get<GoogleRoutesService>(GoogleRoutesService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getDistanceBetweenPoints", () => {
        it("Deve retornar a distância e duração entre duas coordenadas", async () => {
            httpServiceMock.post.mockReturnValue(of(mockResponse));

            const result = await googleRoutesService.getDistanceBetweenPoints(
                { lat: -8.05, lng: -34.88 },
                { lat: -8.06, lng: -34.85 },
            );

            expect(result).toEqual({
                km: 1.56,
                duration: "532s",
            });
            expect(httpServiceMock.post).toHaveBeenCalled();
        });

        it("Deve lançar NotFoundException se nenhuma rota for encontrada", async () => {
            const mockResponse = {
                data: {
                    routes: [],
                },
            };

            httpServiceMock.post.mockReturnValue(of(mockResponse));

            await expect(
                googleRoutesService.getDistanceBetweenPoints(
                    { lat: 0, lng: 0 },
                    { lat: 0, lng: 0 },
                ),
            ).rejects.toThrow(NotFoundException);

            expect(httpServiceMock.post).toHaveBeenCalled();
        });
    });
});
