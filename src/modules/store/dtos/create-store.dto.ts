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
import { StoreType } from "../../../schemas/Store.schema";
import { AddressDto } from "./address.dto";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStoreDto {
    @ApiProperty({ example: "Loja X", description: "Nome da loja" })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: "loja_x@gmail.com", description: "Email da loja" })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        example: "81912341234",
        description: "Número de telefone da loja",
    })
    @IsNotEmpty()
    @IsPhoneNumber("BR")
    phoneNumber: string;

    @ApiProperty({ example: true, description: "Retirar na loja" })
    @IsNotEmpty()
    @IsBoolean()
    takeOutInStore: boolean;

    @ApiProperty({
        example: 1,
        description: "Tempo de preparo de envio em dias",
    })
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    shippingTimeInDays: number;

    @ApiProperty({
        enum: StoreType,
        description: "Tipo de loja",
    })
    @IsEnum(StoreType)
    type: StoreType;

    @ApiProperty({
        type: () => AddressDto,
        description: "Endereço completo da loja",
    })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;
}
