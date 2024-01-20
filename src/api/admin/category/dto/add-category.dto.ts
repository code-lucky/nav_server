import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddCategoryDto{

    @ApiProperty()
    @IsNotEmpty({
        message: '分类名称不能为空'
    })
    name: string;

    @ApiProperty()
    @IsNotEmpty({
        message: '分类状态不能为空'
    })
    status: number;
}