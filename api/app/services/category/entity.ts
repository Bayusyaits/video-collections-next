import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  Generated,
  BaseEntity,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  uuid: string

  @Column("char", { length: 50 })
  title: string;

  @Column("char", {
    length: 100,
    default: null
  })
  icon: string;

  @Column("char", { length: 60 })
  slug: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
  
  @DeleteDateColumn()
  deletedDate: Date;
}
