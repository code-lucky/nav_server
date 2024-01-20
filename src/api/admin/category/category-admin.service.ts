import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AddCategoryDto } from './dto/add-category.dto';
import { Repository } from 'typeorm';
import { Category } from 'src/api/entitys/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryAdminService {

  @InjectRepository(Category)
  private categoryRepository: Repository<Category>

  async createCategory(category: AddCategoryDto) {
    try {
      const categoryObj = new Category()
      categoryObj.name = category.name
      categoryObj.status = category.status
      await this.categoryRepository.save(category)
      return '新增成功'
    } catch (error) {
      throw new HttpException('新增失败',HttpStatus.BAD_REQUEST)
    }
  }


  async getCategoryList(){
    return this.categoryRepository.find()
  }
}
