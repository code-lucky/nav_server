import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryNav } from 'src/api/entitys/category_nav.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryNavService {
    @InjectRepository(CategoryNav)
    private navRepository: Repository<CategoryNav>

    async getCategoryNavList() {
        try {
            const select = ['category_nav.cid as id', 'category.name as `name`',
                'category_nav.label as label', 'category_nav.icon as icon',
                'category_nav.link as link', 'category_nav.desc as `desc`',
                'category_nav.status as `status`', 'category_nav.create_date as createDate',
                'category_nav.update_date as updateDate']
            return this.navRepository.createQueryBuilder('category_nav').
                leftJoinAndSelect('category_nav.navList', 'category').
                select(select).
                getRawMany()
        } catch (error) {
            throw new HttpException('出现异常，请联系管理员', HttpStatus.BAD_GATEWAY)
        }
    }
}
