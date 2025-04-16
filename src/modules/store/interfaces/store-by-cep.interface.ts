export interface ShippingOption {
    prazo: string;
    price: string;
    description: string;
}

export interface StoreItem {
    name: string;
    city: string;
    cep: string;
    type: "PDV" | "LOJA";
    distance: string;
    value: ShippingOption[];
}

export interface Pin {
    title: string;
    position: {
        lat: number;
        lng: number;
    };
}

export interface StoreByCepResponse {
    stores: StoreItem[];
    pins: Pin[];
    limit: number;
    offset: number;
    total: number;
}
