import { IsNotEmpty, IsString, Length } from "class-validator";

export class AddressDto {
    @IsNotEmpty()
    @IsString()
    @Length(8, 9)
    zip_code: string;

    @IsNotEmpty()
    @IsString()
    street: string;

    @IsNotEmpty()
    @IsString()
    neighborhood: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    fullAddress: string;

    @IsNotEmpty()
    @IsString()
    lat: string;

    @IsNotEmpty()
    @IsString()
    long: string;
}
