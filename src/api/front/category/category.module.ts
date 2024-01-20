import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/api/entitys/category.entity';
import { CategoryAdminController } from 'src/api/admin/category/category-admin.controller';
import { CategoryAdminService } from 'src/api/admin/category/category-admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category])
  ],
  controllers: [CategoryController, CategoryAdminController],
  providers: [CategoryService, CategoryAdminService],
})
export class CategoryModule { }
