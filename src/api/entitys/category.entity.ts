import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CategoryNav } from "./category_nav.entity";

@Entity({
    name: 'category'
})
export class Category{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: '分类名称'
    })
    name: string;

    @Column({
        comment: '分类状态',
        default: 0
    })
    status: number;

    @Column({
        comment: '是否删除',
        default: 0
    })
    delete: number;

    @CreateDateColumn({
        name:'create_date',
        comment:'创建时间'
    })
    createDate: Date;

    @UpdateDateColumn({
        name:'update_date',
        comment: '更新时间'
    })
    updateDate: Date;

    @OneToMany(()=>CategoryNav, nav => nav.navList)
    CategoryList: CategoryNav;
}