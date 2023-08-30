import PaginatedResponse from '../../helpers/paginated-response';
import { Field, ArgsType, ObjectType } from 'type-graphql';
@ArgsType()
export default class Args {
  @Field({ defaultValue: 10 })
  limit: number;

  @Field({ defaultValue: 0 })
  offset: number;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  sortBy?: string;

  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  slug?: string;
}

@ObjectType()
export class Video {
  @Field()
  uuid: string;

  @Field()
  title: string;

  @Field()
  image: string;

  @Field()
  episode: number;

  @Field()
  rank: number;

  @Field()
  rates: number;

  // @Field(() => [Gallery])
  // gallery: Gallery[];

  @Field()
  type: string;

  @Field()
  slug: string;
}

@ObjectType()
export class Gallery {
  @Field()
  image: string;
}


// we need to create a temporary class for the abstract, generic class "instance"
@ObjectType()
export class VideoResponse extends PaginatedResponse(Video) {
  // simple helper for creating new instances easily
  constructor(categoryResponse: VideoResponse) {
    super();
    Object.assign(this, categoryResponse);
  }

  // you can add more fields here if you need
}
