import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/api/entitys/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  @InjectRepository(Category)
  private categoryRepository: Repository<Category>

  async getCategoryList() {
    try {
      return this.categoryRepository.find()
    } catch (error) {
      throw new HttpException('出现异常，请联系管理员', HttpStatus.BAD_GATEWAY)
    }
  }
}
