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
export class VideoCollection extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default: null})
  @Generated("uuid")
  uuid: string

  @Column("char", { length: 50 })
  userUuid: string;

  @Column({default: "tv"})
  videoUuid: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
  
  @DeleteDateColumn()
  deletedDate: Date;
}
