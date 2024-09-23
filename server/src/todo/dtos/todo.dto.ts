import { IsString, IsBoolean, IsOptional } from "class-validator";

export class TodoDTO {
    @IsString()
    data: string;

    @IsOptional()
    @IsBoolean()
    isCompleted: boolean;
}