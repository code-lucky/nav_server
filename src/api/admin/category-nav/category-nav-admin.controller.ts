import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryNavAdminService } from './category-nav-admin.service';
import { AddNavDto } from './dto/add-nav.dto';
import { RequireLogin } from 'src/decorator/custom.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { updateNavDto } from './dto/update-nav.dto';
@Controller('admin/categorynav')
@RequireLogin()
@ApiBearerAuth()
export class CategoryNavAdminController {
  constructor(private readonly categoryNavService: CategoryNavAdminService) { }

  @Get('getNavList')
  async getNavList() {
    return this.categoryNavService.getCategoryNavList()
  }

  @Post('addNav')
  async createNav(@Body() categortNav: AddNavDto) {
    return this.categoryNavService.addNav(categortNav)
  }

  @Post('updateNav')
  async updateNavigation(@Body()updateNav: updateNavDto){
    await this.categoryNavService.updateNav(updateNav)
  }
}
