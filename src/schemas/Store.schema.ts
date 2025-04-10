import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum StoreType {
    PDV = "PDV",
    LOJA = "LOJA",
}

@Schema({ _id: false })
export class Address {
    @Prop({ required: true, maxlength: 9 })
    zip_code: string;

    @Prop({ required: true })
    street: string;

    @Prop({ required: true })
    neighborhood: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    state: string;

    @Prop({ required: true })
    country: string;

    @Prop({ required: true })
    fullAddress: string;

    @Prop({ required: true })
    lat: string;

    @Prop({ required: true })
    long: string;
}

const AddressSchema = SchemaFactory.createForClass(Address);

@Schema()
export class Store extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ required: true })
    takeOutInStore: boolean;

    @Prop({ required: true })
    shippingTimeInDays: number;

    @Prop({ required: true, enum: StoreType })
    type: string;

    @Prop({ required: true, type: AddressSchema })
    address: Address;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
