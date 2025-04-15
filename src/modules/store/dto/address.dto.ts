import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class AddressDto {
    @IsNotEmpty()
    @IsString()
    @Length(8, 9)
    zip_code: string;

    @IsOptional()
    @IsString()
    street: string;

    @IsNotEmpty()
    @IsString()
    number: string;

    @IsOptional()
    @IsString()
    neighborhood: string;

    @IsOptional()
    @IsString()
    city: string;

    @IsOptional()
    @IsString()
    state: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsOptional()
    @IsString()
    fullAddress: string;

    @IsOptional()
    @IsString()
    lat: string;

    @IsOptional()
    @IsString()
    long: string;
}
