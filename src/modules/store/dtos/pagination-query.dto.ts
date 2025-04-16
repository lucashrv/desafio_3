import { IsNumberString, IsNotEmpty } from "class-validator";

export class PaginationQueryDto {
    @IsNotEmpty()
    @IsNumberString()
    limit: string;

    @IsNotEmpty()
    @IsNumberString()
    offset: string;
}
