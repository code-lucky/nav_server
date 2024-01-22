import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CategoryNav } from 'src/api/entitys/category_nav.entity';
import { Repository } from 'typeorm';
import { AddNavDto } from './dto/add-nav.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { updateNavDto } from './dto/update-nav.dto';
import { Category } from 'src/api/entitys/category.entity';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class CategoryNavAdminService {
    @InjectRepository(CategoryNav)
    private navRepository: Repository<CategoryNav>

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>

    @Inject(RedisService)
    private redisService: RedisService;

    async getCategoryNavList() {
        try {
            const select = ['category_nav.cid as cid', 'category.name as `name`',
                'category_nav.label as label', 'category_nav.icon as icon',
                'category_nav.link as link', 'category_nav.desc as `desc`',
                'category_nav.status as `status`', 'category_nav.create_date as createDate',
                'category_nav.update_date as updateDate', 'category_nav.id as id']
            await this.updateRedisNav()
            return this.navRepository.createQueryBuilder('category_nav').
                leftJoinAndSelect('category_nav.navList', 'category').
                select(select).
                getRawMany()
        } catch (error) {
            throw new HttpException('出现异常，请联系管理员', HttpStatus.BAD_REQUEST)
        }
    }

    async addNav(categoryNav: AddNavDto) {
        try {
            const nav = new CategoryNav()
            nav.cid = categoryNav.cid
            nav.label = categoryNav.label
            nav.icon = categoryNav.icon
            nav.link = categoryNav.link
            nav.desc = categoryNav.desc
            nav.status = categoryNav.status
            await this.navRepository.save(nav)

            // 更新redis数据
            await this.updateRedisNav()
            return '添加成功'
        } catch (error) {
            throw new HttpException('添加失败', HttpStatus.BAD_REQUEST)
        }
    }

    async updateNav(updateNav: updateNavDto) {
        try {
            const nav = new CategoryNav()
            nav.id = updateNav.id
            nav.cid = updateNav.cid
            nav.label = updateNav.label
            nav.icon = updateNav.icon
            nav.link = updateNav.link
            nav.desc = updateNav.desc
            nav.status = updateNav.status
            await this.navRepository.createQueryBuilder().
                update(CategoryNav).
                set(nav).
                where(`id = :id`, { id: nav.id }).
                execute()

            // 更新redis数据
            await this.updateRedisNav()
            return '更新成功'
        } catch (error) {
            throw new HttpException('出现异常，请联系管理员', HttpStatus.BAD_REQUEST)
        }
    }


    async updateRedisNav() {
        // 按分类获取导航数据
        var result = []

        const categoryList = await this.categoryRepository.findBy({ status: 0 })
        categoryList.forEach((item, idx) => {
            this.navRepository.findBy({ cid: item.id }).then(res=>{
                const data = {
                    title: item.name,
                    data: res 
                }
                result.push(data)
            })
        })

        setTimeout(() => {
            if (result.length != 0) {
                // 进入存入redis
                this.redisService.set('nav_list', JSON.stringify(result))
            }
        }, 50)
    }
}
