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

export enum Status {
  EDITORIAL = "editorial",
  FAVORITE = "favorite",
}

type Gallery = {
  image: string
}

@Entity()
export class Video extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  uuid: string

  @Column("char", { length: 50 })
  title: string;

  @Column()
  description: string;

  @Column({ type: "int" })
  episode: number;

  @Column({ type: "int" })
  rates: number;

  @Column({ type: "int" })
  rank: number;

  @Column({ type: "simple-array" }, )
  collections: string[];

  @Column("char", { length: 20 })
  type: string;

  @Column({ type: "simple-array" }, )
  categories: string[];

  @Column({ type: "simple-json" }, )
  gallery: Gallery[];
  
  @Column({default: null})
  image: string;

  @Column("char", { length: 60 })
  slug: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.FAVORITE
  })
  status: Status

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updateDate: Date;
  
  @DeleteDateColumn()
  deletedDate: Date;
}
