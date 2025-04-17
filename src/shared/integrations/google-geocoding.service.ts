import { Injectable, NotFoundException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";

@Injectable()
export class GoogleGeocodeService {
    private readonly baseUrl =
        "https://maps.googleapis.com/maps/api/geocode/json";

    constructor(private readonly httpService: HttpService) {}

    async getCoordsFromAddress(fullAddress: string): Promise<{
        lat: string;
        lng: string;
    }> {
        const url = `${this.baseUrl}?address=${encodeURIComponent(fullAddress)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

        const googleGeocodeApi = await lastValueFrom(this.httpService.get(url));

        const coords = googleGeocodeApi.data?.results?.[0];
        if (!coords) {
            throw new NotFoundException("Endereço não encontrado.");
        }

        const { lat, lng } = coords.geometry.location;

        return {
            lat,
            lng,
        };
    }
}
