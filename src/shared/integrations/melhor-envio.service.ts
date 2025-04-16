import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";

@Injectable()
export class MelhorEnvioService {
    private readonly token = process.env.MELHOR_ENVIO_APY_KEY;
    private readonly email = process.env.MELHOR_ENVIO_EMAIL;

    constructor(private readonly httpService: HttpService) {}

    async calculateShipping(from: string, to: string) {
        const url = "https://melhorenvio.com.br/api/v2/me/shipment/calculate";

        const headers = {
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "User-Agent": `Aplicação ${this.email}`,
        };

        const body = {
            from: { postal_code: from },
            to: { postal_code: to },
            services: "1, 2",
            products: [
                {
                    weight: 1,
                    width: 11,
                    height: 17,
                    length: 20,
                    quantity: 1,
                },
            ],
            options: {
                receipt: false,
                own_hand: false,
                collect: false,
            },
        };

        const melhorEnvio = await lastValueFrom(
            this.httpService.post(url, body, { headers }),
        );

        return melhorEnvio.data.map((item) => {
            if (item.error) {
                return { error: item.error };
            } else {
                return {
                    codProdutoAgencia: item.id,
                    description: item.name,
                    prazo: `${item.delivery_time} dias úteis`,
                    price: `R$ ${item.price}`,
                };
            }
        });
    }
}
