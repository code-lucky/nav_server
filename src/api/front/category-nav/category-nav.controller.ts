import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryNavService } from './category-nav.service';

@Controller('category-nav')
export class CategoryNavController {
  constructor(private readonly categoryNavService: CategoryNavService) {}

  @Get('getNavList')
  async getNavList() {
    return this.categoryNavService.getCategoryNavList()
  }
}
