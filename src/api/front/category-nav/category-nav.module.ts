import { Module } from '@nestjs/common';
import { CategoryNavService } from './category-nav.service';
import { CategoryNavController } from './category-nav.controller';
import { CategoryNav } from 'src/api/entitys/category_nav.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryNavAdminController } from 'src/api/admin/category-nav/category-nav-admin.controller';
import { CategoryNavAdminService } from 'src/api/admin/category-nav/category-nav-admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryNav])
  ],
  controllers: [CategoryNavController, CategoryNavAdminController],
  providers: [CategoryNavService, CategoryNavAdminService],
})
export class CategoryNavModule { }
