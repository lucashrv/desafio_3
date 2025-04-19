import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class AddressDto {
    @ApiProperty({ description: "Cep da loja", example: "50600000" })
    @IsNotEmpty()
    @IsString()
    @Length(8, 9)
    zip_code: string;

    @ApiProperty({ description: "Rua da loja", example: "Rua X" })
    @IsOptional()
    @IsString()
    street: string;

    @ApiProperty({ description: "Número residencial da loja", example: "345" })
    @IsNotEmpty()
    @IsString()
    number: string;

    @ApiProperty({ description: "Bairro da loja", example: "Baixo X" })
    @IsOptional()
    @IsString()
    neighborhood: string;

    @ApiProperty({ description: "Cidade da loja", example: "Recife" })
    @IsOptional()
    @IsString()
    city: string;

    @ApiProperty({ description: "Estado da loja", example: "Pernambuco" })
    @IsOptional()
    @IsString()
    state: string;

    @ApiProperty({ description: "País da loja", example: "Brasil" })
    @IsNotEmpty()
    @IsString()
    country: string;

    @ApiProperty({
        description: "Endereço completo da loja",
        example: "Rua X, 345 - Baixo X, Recife, Pernambuco, Brasil, 50600000",
    })
    @IsOptional()
    @IsString()
    fullAddress: string;

    @ApiProperty({
        description: "Coordenada de latitude da loja",
        example: "-8.4654654",
    })
    @IsOptional()
    @IsString()
    lat: string;

    @ApiProperty({
        description: "Coordenada de longitude da loja",
        example: "-34.6649878",
    })
    @IsOptional()
    @IsString()
    long: string;
}
