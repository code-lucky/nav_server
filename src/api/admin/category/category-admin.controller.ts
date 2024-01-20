import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryAdminService } from './category-admin.service';
import { AddCategoryDto } from './dto/add-category.dto';
import { RequireLogin } from 'src/decorator/custom.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('admin/category')
@RequireLogin()
@ApiBearerAuth()
export class CategoryAdminController {
  constructor(private readonly categoryService: CategoryAdminService) { }

  @Post('addCategory')
  async addCategory(@Body() category: AddCategoryDto) {
    return this.categoryService.createCategory(category)
  }

  @Get('categoryList')
  async getCategoryList() {
    return this.categoryService.getCategoryList()
  }
}
