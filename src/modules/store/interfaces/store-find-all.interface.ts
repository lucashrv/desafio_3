import { Store } from "src/schemas/Store.schema";

export interface StoreFindAllResponse {
    stores: Store[];
    limit: number;
    offset: number;
    total: number;
}
