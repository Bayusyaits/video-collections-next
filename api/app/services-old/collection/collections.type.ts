import { ObjectType, Field, Int } from 'type-graphql';
import Collection from './collection.type';
@ObjectType()
export default class CollectionsConnection {
  @Field(type => [Collection])
  items: Collection[];

  @Field(type => Int)
  totalCount: number;

  @Field()
  hasMore: boolean;
}
