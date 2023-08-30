import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  BaseEntity,
  ManyToOne,
  JoinColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Video } from "../video/entity";
import { Category } from "../category/entity";
@Entity()
export class VideoCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column("char", {nullable: true, length: 100})
  uuid: string;

  @Column("char", {nullable: true, length: 100})
  userUuid: string;

  @ManyToOne(() => Video, (video) => video.uuid, {
    cascade: ["insert", "update", "remove", "soft-remove"],
    lazy: true
  })
  @JoinColumn([
    { name: "videoUuid", referencedColumnName: 'uuid' }
  ])
  public videoUuid: Video;
  
  @ManyToOne(() => Category, (category) => category.uuid, {
    cascade: ["insert", "update", "remove", "soft-remove"],
    lazy: true
  })
  @JoinColumn([
    { name: "categoryUuid", referencedColumnName: 'uuid' }
  ])
  public categoryUuid: Category;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
  
  @DeleteDateColumn()
  deletedDate: Date;
}
