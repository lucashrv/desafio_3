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
export class NominatimService {
    constructor(private readonly httpService: HttpService) {}

    async getCoordinates(address: Adress): Promise<any> {
        const nominatim = await lastValueFrom(
            this.httpService.get(
                `https://nominatim.openstreetmap.org/search?q=${address.logradouro},${address.number || ""},${address.bairro},${address.localidade},${address.estado},${address.country || ""}&format=json`,
            ),
        );

        if (!nominatim.data[0])
            throw new NotFoundException(
                "Localização não encontrada, confira o CEP e o Número do local!",
            );

        return nominatim.data[0];
    }
}
