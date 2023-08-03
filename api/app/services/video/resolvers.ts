import { isEmpty } from "lodash";
import Args, { VideoResponse } from "./args";
import { AppDataSource } from "../../data-source"
import { Video as VideoEntity } from "./entity";
import { filterItems } from "../../helpers/filter";
import { generateKey, setSpaceToDash } from "../../helpers/mixins";
import slugify from "../../helpers/slugify";

// Provide resolver functions for your schema fields
export const Query = {
  getVideo: async (_: any, args: any) => {
    const { id } = args;
    const videoEntity = AppDataSource.getRepository(VideoEntity)
    return await videoEntity.findOne({ where: { id: id } });
  },
  getVideos: async (_: any, args: Args): Promise<VideoResponse> => {
    const videoEntity = AppDataSource.getRepository(VideoEntity)
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
    const [data, total] = await videoEntity.findAndCount({
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
    const res = new VideoResponse({
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
  addVideo: async (_: any, args: any) => {
    try {
      try {
        const generate = Math.floor(generateKey(100))
        const { title, image } = args;
        const video = new VideoEntity()
        video.title = title
        video.slug = slugify(title) ? `${setSpaceToDash(slugify(title))}_${generate}` : 
        `${setSpaceToDash(title)}_${generate}`
        video.image = image
        const videoRepository = AppDataSource.getRepository(VideoEntity)
        return await videoRepository.save(video);
      } catch (error) {
        return {};
      }
    } catch (error) {
      return false;
    }
  },
  editVideo: async (_: any, args: any) => {
    try {
      const { title, slug } = args;
      const videoEntity = AppDataSource.getRepository(VideoEntity)
      const video = await videoEntity.findOneBy({
        slug: slug,
      })
      if (!video || !slug || slug.length == 0) {
        return {};
      }
      if (title) {
        video.title = title
      }
      return await videoEntity.save(video);
    } catch (error) {
      return {};
    }
  },
  deleteVideo: async (_: any, args: any) => {
    try {
      const {slug } = args;
      const videoEntity = AppDataSource.getRepository(VideoEntity)
      const video = await videoEntity.findOneBy({
        slug: slug,
      })
      if (!video || !slug || slug.length == 0) {
        return false;
      }
      video.softRemove()
      await videoEntity.save(video)
      return true;
    } catch (error) {
      return false;
    }
  }
}
