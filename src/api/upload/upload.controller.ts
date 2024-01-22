import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { UploadService } from './upload.service';
import { storage } from 'src/config/storage';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Constant } from 'src/utils/constant';
import { RequireLogin } from 'src/decorator/custom.decorator';

@Controller('/')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('front/upload')
  @UseInterceptors(AnyFilesInterceptor({
    storage: storage
  }))
  upload_front(@UploadedFiles() file: Express.Multer.File, @Body() body){
    return Constant.CURRENT_DATE + '/' + file[0].filename
  }

  @RequireLogin()
  @Post('admin/upload')
  @UseInterceptors(AnyFilesInterceptor({
    storage: storage
  }))
  upload_admin(@UploadedFiles() file: Express.Multer.File, @Body() body){
    return Constant.CURRENT_DATE + '/' + file[0].filename
  }
}
