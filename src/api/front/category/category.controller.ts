import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('front/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get('categoryList')
  async getCategoryList() {
    return this.categoryService.getCategoryList()
  }
}
