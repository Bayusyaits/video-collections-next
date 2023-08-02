import { Resolver, Query, Arg, Args, Mutation } from 'type-graphql';
import loadCollections from './collection.sample';
import Collection, { CollectionResponse } from './collection.type';
import Collections from './collections.type'
import AddCollectionInput from './collection.input_type'
import { filterItems, getRelatedItems } from '../../helpers/filter';
import GetCollectionsArgs from './collection.args_type';
import { shuffle } from 'lodash';

@Resolver()
export class CollectionResolver {
  public items: Collection[] = loadCollections();

  @Query(() => [Collections], { description: 'Get all the collections' })
  async collections(
    @Args()
    { limit, offset, type }: GetCollectionsArgs
  ): Promise<Collections> {
    let collections = this.items;
    if (type) {
      collections = collections.filter(collection => collection.type === type);
    }
    collections = shuffle(collections);

    // return await collections.slice(0, limit);
    const hasMore = collections.length > offset + limit;

    return {
      items: collections.slice(offset, offset + limit),
      totalCount: this.items.length,
      hasMore,
    };
  }


  @Query(() => Collection)
  listCollection(
    @Arg('slug', type => String) slug?: string,
    @Arg('type', { nullable: true }) type?: string
  ): Collection[] {
    if (slug) {
      return this.items.filter(item => item.slug === slug);
    } else if (type) {
      return this.items.filter(item => item.type === type);
    } else {
      return this.items
    }
  }

  @Query(() => Collection)
  async collection(
    @Arg('slug', (type) => String) slug: string
  ): Promise<Collection | undefined> {
    return await this.items.find((item) => item.slug === slug);
  }
  @Query(() => [Collection], { description: 'Get the Related collections' })
  async relatedCollections(
    @Arg('slug', (slug) => String) slug?: string,
    @Arg('type', { nullable: true }) type?: string
  ): Promise<any> {
    const relatedItem = await getRelatedItems(type, slug, this.items);
    return relatedItem;
  }
  @Mutation(() => Collection, { description: 'Add Collection' })
  async postCreateCollection(
    @Arg('id', (id) => String) id: string,
    @Arg('title', (title) => String) title: string,
    @Arg('image', (image) => String) image: string,
    @Arg('slug', (slug) => String) slug: string,
    @Arg('isActive', (isActive) => Boolean) isActive: boolean,
    @Arg('type', (type) => String) type: string
  ): Promise<Collection> {
    return await {
      id,
      title,
      image,
      slug,
      isActive,
      type
    };
  }
}

