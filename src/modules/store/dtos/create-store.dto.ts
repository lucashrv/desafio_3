import {
    IsBoolean,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    Min,
    ValidateNested,
} from "class-validator";
import { StoreType } from "src/schemas/Store.schema";
import { AddressDto } from "./address.dto";
import { Type } from "class-transformer";

export class CreateStoreDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber("BR")
    phoneNumber: string;

    @IsNotEmpty()
    @IsBoolean()
    takeOutInStore: boolean;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    shippingTimeInDays: number;

    @IsEnum(StoreType)
    type: StoreType;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;
}
