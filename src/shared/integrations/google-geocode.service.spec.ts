import { Test, TestingModule } from "@nestjs/testing";
import { HttpService } from "@nestjs/axios";
import { NotFoundException } from "@nestjs/common";
import { of } from "rxjs";
import { GoogleGeocodeService } from "./google-geocoding.service";

const fullAddress = "Rua São Mateus, Iputinga, Recife - Pernambuco";

const mockCoords = {
    geometry: {
        location: {
            lat: "-23.5614141",
            lng: "-46.6561008",
        },
    },
};

const mockResponse = {
    data: {
        results: [mockCoords],
    },
};

describe("GoogleGeocodeService", () => {
    let googleGeocodeService: GoogleGeocodeService;

    const httpServiceMock = {
        get: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GoogleGeocodeService,
                {
                    provide: HttpService,
                    useValue: httpServiceMock,
                },
            ],
        }).compile();

        googleGeocodeService =
            module.get<GoogleGeocodeService>(GoogleGeocodeService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getCoordsFromAddress", () => {
        it("Deve retornar coordenadas válidas para um endereço", async () => {
            httpServiceMock.get.mockReturnValue(of(mockResponse));

            const result =
                await googleGeocodeService.getCoordsFromAddress(fullAddress);

            expect(result).toEqual({
                lat: "-23.5614141",
                lng: "-46.6561008",
            });
            expect(httpServiceMock.get).toHaveBeenCalled();
        });

        it("deve lançar NotFoundException se o endereço não for encontrado", async () => {
            const mockResponse = {
                data: {
                    results: [],
                },
            };

            const invalidAdress = "aaaaaaaaaaaaaaaaaaaaaaaaaaa";

            httpServiceMock.get.mockReturnValue(of(mockResponse));

            await expect(
                googleGeocodeService.getCoordsFromAddress(invalidAdress),
            ).rejects.toThrow(NotFoundException);

            expect(httpServiceMock.get).toHaveBeenCalled();
        });
    });
});
