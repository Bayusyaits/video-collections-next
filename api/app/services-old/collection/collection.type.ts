import { ObjectType, Field, ID } from 'type-graphql';
import PaginatedResponse from '../../helpers/paginated-response';

@ObjectType()
export default class Collection {
  @Field(type => ID)
  id: String;

  @Field()
  title: string;

  @Field(type => String)
  type: string;

  @Field(type => String)
  image: string;

  @Field(type => Boolean)
  isActive: boolean;

  @Field(type => String)
  slug: string;
}

export class AddCollection {
  @Field(type => String)
  id: string;

  @Field()
  title: string;

  @Field(type => String, {nullable: true})
  type: string;

  @Field(type => String, {nullable: true})
  image: string;

  @Field(type => Boolean, {nullable: true})
  isActive: boolean;

  @Field(type => String, {nullable: true})
  slug: string;
}

@ObjectType()
export class CollectionResponse extends PaginatedResponse(Collection) {
  // simple helper for creating new instances easily
  constructor(videoResponse: CollectionResponse) {
    super();
    Object.assign(this, videoResponse);
  }

  // you can add more fields here if you need
}
