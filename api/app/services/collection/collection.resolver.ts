import { Resolver, Query, Arg, Int } from 'type-graphql';
import loadCollections from './collection.sample';
import Collection from './collection.type';

@Resolver()
export class CollectionResolver {
  private readonly items: Collection[] = loadCollections();

  @Query(() => [Collection], { description: 'Get all the collections' })
  async collections(
    @Arg('type', type => String) type: string
  ): Promise<Collection[]> {
    return await this.items.filter(item => item.type === type);
    // return await this.items;
  }

  @Query(() => Collection)
  async collection(
    @Arg('id', type => Int) id: number
  ): Promise<Collection | undefined> {
    return await this.items.find(item => item.id === id);
  }
}
