import { InputType, Field, ID } from 'type-graphql';
import Collection from './collection.type';
@InputType({ description: 'New recipe data' })
export default class AddCollectionInput implements Partial<Collection> {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field()
  image: string;

  @Field()
  type: string;

  @Field()
  isActive: boolean;
}
