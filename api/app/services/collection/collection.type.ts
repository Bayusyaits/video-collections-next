import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export default class Collection {
  @Field(type => Int)
  id: number;

  @Field()
  title: string;

  @Field(type => [Collection])
  children: Collection[];

  @Field(type => String)
  type: string;

  @Field(type => String)
  icon: string;

  @Field(type => String)
  slug: string;
}
