import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsNotEmpty } from "class-validator";

export class PaginationQueryDto {
    @ApiProperty({ description: "Limite de itens da paginação", example: 5 })
    @IsNotEmpty()
    @IsNumberString()
    limit: string;

    @ApiProperty({ description: "Offset da paginação", example: 0 })
    @IsNotEmpty()
    @IsNumberString()
    offset: string;
}
