import { 
  Entity, 
  Column, 
  PrimaryColumn,
  Generated,
  BaseEntity,
  OneToMany,
  JoinColumn,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { VideoCollection } from "../video-collection/entity";
import { VideoCategory } from "../video-category/entity";

export enum Status {
  EDITORIAL = "editorial",
  FAVORITE = "favorite",
}

type Gallery = {
  image: string
}

@Entity()
export class Video extends BaseEntity {
  //https://typeorm.io/relations-faq#how-to-use-relation-id-without-joining-relation
  @PrimaryColumn("char", {length: 100})
  @Generated("uuid")
  uuid: string

  @Column("char", { length: 50 })
  title: string;

  @OneToMany(() => VideoCollection, 
    (videoCollection) => videoCollection.videoUuid,
    {
      cascade: ["insert", "update"],
    })
  @JoinColumn([
      { name: "uuid" }
  ])
  public videoCollections: VideoCollection[]

  @OneToMany(() => VideoCategory, 
    (videoCategory) => videoCategory.videoUuid,
    {
      cascade: ["insert", "update"],
    })
  @JoinColumn([
      { name: "uuid" }
  ])
  public videoCategories: VideoCategory[]

  @Column("text", {nullable: true})
  description: string;

  @Column({ type: "int", nullable: true })
  episode: number;

  @Column({ type: "int", nullable: true })
  rates: number;

  @Column({ type: "int", nullable: true })
  rank: number;

  @Column({ type: "int", default: 0 })
  isCencor: number;

  @Column("char", { length: 20, nullable: true })
  type: string;

  @Column({ type: "simple-json", default: "", nullable: true })
  gallery: Gallery[];
  
  @Column({default: null, nullable: true})
  image: string;

  @Column("char", { length: 60 })
  slug: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.FAVORITE
  })
  status: Status

  @Column({ type: 'date', nullable: true })
  publishDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
  
  @DeleteDateColumn()
  deletedDate: Date;
}
