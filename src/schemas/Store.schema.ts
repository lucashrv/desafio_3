import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum StoreType {
    PDV = "PDV",
    LOJA = "LOJA",
}

@Schema({ _id: false })
export class Address {
    @Prop({ type: String, required: true, maxlength: 9 })
    zip_code: string;

    @Prop({ type: String, required: true })
    street: string;

    @Prop({ type: String, required: true })
    neighborhood: string;

    @Prop({ type: String, required: true })
    city: string;

    @Prop({ type: String, required: true })
    state: string;

    @Prop({ type: String, required: true })
    country: string;

    @Prop({ type: String, required: true })
    fullAddress: string;

    @Prop({ type: String, required: true })
    lat: string;

    @Prop({ type: String, required: true })
    long: string;
}

const AddressSchema = SchemaFactory.createForClass(Address);

@Schema()
export class Store extends Document {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    email: string;

    @Prop({ type: String, required: true })
    phoneNumber: string;

    @Prop({ type: Boolean, required: true })
    takeOutInStore: boolean;

    @Prop({ type: Number, required: true })
    shippingTimeInDays: number;

    @Prop({ type: String, required: true, enum: StoreType })
    type: string;

    @Prop({ type: AddressSchema, required: true })
    address: Address;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
