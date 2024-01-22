import { Controller, Get} from '@nestjs/common';
import { CategoryNavService } from './category-nav.service';

@Controller('front/category-nav')
export class CategoryNavController {
  constructor(private readonly categoryNavService: CategoryNavService) {}

  @Get('getNavList')
  async getNavList() {
    return this.categoryNavService.getCategoryNavList()
  }

  @Get('getNavArray')
  async getNavArray(){
    return this.categoryNavService.getNavArray()
  }
}
