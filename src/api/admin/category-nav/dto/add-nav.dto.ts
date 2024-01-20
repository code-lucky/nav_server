import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddNavDto{

    @ApiProperty()
    @IsNotEmpty({
        message: '请选择分类'
    })
    cid: number;
    
    @ApiProperty()
    @IsNotEmpty({
        message: '导航名称不能为空'
    })
    label: string;

    @ApiProperty()
    @IsNotEmpty()
    icon: string;

    @ApiProperty()
    @IsNotEmpty()
    link: string;
    
    @ApiProperty()
    @IsNotEmpty()
    desc: string;

    @ApiProperty()
    @IsNotEmpty({
        message: '导航状态不能为空'
    })
    status: number;

}