import { isEmpty } from "lodash";
import { v4 } from "uuid";
import Args, { CollectionResponse } from "./args";
import { AppDataSource } from "../../data-source"
import { Collection as CollectionEntity } from "./entity";
import { filterItems } from "../../helpers/filter";
import { generateKey, setSpaceToDash } from "../../helpers/mixins";
import slugify from "../../helpers/slugify";

// Provide resolver functions for your schema fields
export const Query = {
  getCollection: async (_: any, args: any) => {
    const { uuid } = args;
    const collectionEntity = AppDataSource.getRepository(CollectionEntity)
    return await collectionEntity.findOne({ where: { uuid: uuid } });
  },
  getCollections: async (_: any, args: Args): Promise<CollectionResponse> => {
    const collectionEntity = AppDataSource.getRepository(CollectionEntity)
    const { offset = 0, limit = 10, slug, type, sortBy } = args;
    const where = {}
    const order = {}
    if (slug) {
      Object.assign(where, {
        slug
      })
    }
    if (sortBy) {
      Object.assign(order, {
        [sortBy]: 'DESC'
      })
    }
    const obj = {}
    if (order && !isEmpty(order)) {
      Object.assign(obj, order)
    }
    if (where && !isEmpty(where)) {
      Object.assign(obj, where)
    }
    const [data, total] = await collectionEntity.findAndCount({
      ...obj,
      take: 10,
      skip: 0
    })
    const filteredData = filterItems(
      data,
      limit,
      offset,
      slug,
      type
    );
    const res = new CollectionResponse({
      total: total,
      ...filteredData,
    })
    return {
      ...res,
      limit: limit | 10,
      page: filteredData ? Number(offset * limit / filteredData.length ) : 0
    };
  }
}

export const Mutation = {
  addCollection: async (_: any, args: any) => {
    try {
      try {
        const generate = Math.floor(generateKey(100))
        const { title, image } = args;
        const collection = new CollectionEntity()
        collection.title = title
        collection.uuid = v4()
        collection.slug = slugify(title) ? `${setSpaceToDash(slugify(title))}_${generate}` : 
        `${setSpaceToDash(title)}_${generate}`
        collection.image = image
        const collectionRepository = AppDataSource.getRepository(CollectionEntity)
        return await collectionRepository.save(collection);
      } catch (error) {
        return {};
      }
    } catch (error) {
      return false;
    }
  },
  editCollection: async (_: any, args: any) => {
    try {
      const { title, slug } = args;
      const collectionEntity = AppDataSource.getRepository(CollectionEntity)
      const collection = await collectionEntity.findOneBy({
        slug: slug,
      })
      if (!collection || !slug || slug.length == 0) {
        return {};
      }
      if (title) {
        collection.title = title
      }
      return await collectionEntity.save(collection);
    } catch (error) {
      return {};
    }
  },
  deleteCollection: async (_: any, args: any) => {
    try {
      const {slug } = args;
      const collectionEntity = AppDataSource.getRepository(CollectionEntity)
      const collection = await collectionEntity.findOneBy({
        slug: slug,
      })
      if (!collection || !slug || slug.length == 0) {
        return false;
      }
      collection.softRemove()
      await collectionEntity.save(collection)
      return true;
    } catch (error) {
      return false;
    }
  }
}
