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
export class Collection extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: null})
  @Generated("uuid")
  uuid: string

  @Column("char", { length: 50 })
  title: string;

  @Column({default: "tv"})
  type: string;

  @Column({default: null})
  image: string;

  @Column("char", { length: 60 })
  slug: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
  
  @DeleteDateColumn()
  deletedDate: Date;
}
