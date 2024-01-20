import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity({
    name: 'category_nav'
})
export class CategoryNav{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: '关联category表id'
    })
    cid: number;

    @Column({
        comment: 'nav名称'
    })
    label: string;

    @Column({
        comment: 'nav的图标',
    })
    icon: string;

    @Column({
        comment: 'nav的跳转链接',
        nullable: true
    })
    link: string;

    @Column({
        comment: 'nav的详情描述'
    })
    desc: string;

    @Column({
        comment: '列表状态',
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

    // 多对一关联
    @ManyToOne(()=>Category, category => category.CategoryList)
    @JoinColumn({name: 'cid', referencedColumnName: 'id'})
    navList: Category;
}