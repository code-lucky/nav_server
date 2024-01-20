import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryNav } from 'src/api/entitys/category_nav.entity';
import { Repository } from 'typeorm';
import { AddNavDto } from './dto/add-nav.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryNavAdminService {
    @InjectRepository(CategoryNav)
    private navRepository: Repository<CategoryNav>

    async getCategoryNavList(){
        const select = ['category_nav.cid as id', 'category.name as `name`', 
            'category_nav.label as label', 'category_nav.icon as icon', 
            'category_nav.link as link', 'category_nav.desc as `desc`', 
            'category_nav.status as `status`', 'category_nav.create_date as createDate', 
            'category_nav.update_date as updateDate']
        return this.navRepository.createQueryBuilder('category_nav').
        leftJoinAndSelect('category_nav.navList', 'category').
        select(select).
        getRawMany()
    }

    async addNav(categoryNav: AddNavDto){
        try {
            const nav = new CategoryNav()
            nav.cid = categoryNav.cid
            nav.label = categoryNav.label
            nav.icon = categoryNav.icon
            nav.link = categoryNav.link
            nav.desc = categoryNav.desc
            nav.status = categoryNav.status
            await this.navRepository.save(nav)
            return '添加成功'
        } catch (error) {
            throw new HttpException('添加失败', HttpStatus.BAD_REQUEST)
        }
        
    }
}
