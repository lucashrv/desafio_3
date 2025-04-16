import { Injectable, NotFoundException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";

export interface Adress {
    logradouro: string;
    number?: string;
    bairro: string;
    localidade: string;
    estado: string;
    country?: string;
}

@Injectable()
export class GoogleRoutesService {
    private readonly apiKey = process.env.GOOGLE_MAPS_API_KEY;

    constructor(private readonly httpService: HttpService) {}

    async getDistanceBetweenPoints(
        origin: { lat: number; lng: number },
        destination: { lat: number; lng: number },
    ): Promise<{
        km: number;
        duration: string;
    }> {
        const url = "https://routes.googleapis.com/directions/v2:computeRoutes";

        const body = {
            origin: {
                location: {
                    latLng: {
                        latitude: origin.lat,
                        longitude: origin.lng,
                    },
                },
            },
            destination: {
                location: {
                    latLng: {
                        latitude: destination.lat,
                        longitude: destination.lng,
                    },
                },
            },
            travelMode: "DRIVE",
        };

        const headers = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": this.apiKey,
            "X-Goog-FieldMask": "routes.distanceMeters,routes.duration",
        };

        const googleRoutesApi = await lastValueFrom(
            this.httpService.post(url, body, {
                headers,
            }),
        );

        const route = googleRoutesApi.data.routes?.[0];

        if (!route) {
            throw new NotFoundException("Nenhuma rota de frete encontrada");
        }

        return {
            km: route.distanceMeters / 1000,
            duration: route.duration,
        };
    }
}
