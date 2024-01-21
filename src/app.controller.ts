import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { storage } from './config/storage';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Constant } from "src/utils/constant";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload_img')
  @UseInterceptors(AnyFilesInterceptor({
    storage: storage
  }))
  upload_test(@UploadedFiles() file: Express.Multer.File, @Body() body){
    console.log('body', body);
    console.log('file', file);
    return Constant.CURRENT_DATE + '/' + file[0].filename
  }
}
