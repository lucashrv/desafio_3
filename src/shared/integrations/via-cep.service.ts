import {
    Injectable,
    NotFoundException,
    UnprocessableEntityException,
} from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";

@Injectable()
export class ViaCepService {
    constructor(private readonly httpService: HttpService) {}

    async getAddressByCep(cep: string): Promise<any> {
        const cleanCep = cep.replace(/\D/g, "");

        if (cleanCep.length !== 8 || typeof +cleanCep !== "number")
            throw new UnprocessableEntityException(
                `O Cep precisa conter 8 dígitos numéricos`,
            );

        const viaCep = await lastValueFrom(
            this.httpService.get(`https://viacep.com.br/ws/${cleanCep}/json/`),
        );

        if (viaCep.data.erro) {
            throw new NotFoundException(`CEP ${cep} não encontrado`);
        }

        return {
            ...viaCep.data,
        };
    }
}
