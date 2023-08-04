import { isEmpty } from "lodash";
import { v4 } from "uuid"
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
        const { 
          payload: {
            title, image, type, episode, rates, rank,
            status, description, categories, gallery
          }
        } = args;
        const video = new VideoEntity()
        video.uuid = v4()
        if (episode) {
          video.episode = episode
        }
        if (rates) {
          video.rates = rates
        }
        if (rank) {
          video.rank = rank
        }
        if (type) {
          video.type = type
        }
        if (description) {
          video.description = description
        }
        if (status && ['editorial','favorite'].includes(status)) {
          video.status = status
        }
        if (categories) {
          video.categories = categories
        }
        if (gallery && Array.isArray(gallery)) {
          video.gallery = gallery
        }
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
      const { 
        payload: {
          title, uuid, image, type, episode, rates, rank,
          status, description, categories, gallery
        }
      } = args;      
      const videoEntity = AppDataSource.getRepository(VideoEntity)
      const video = await videoEntity.findOneBy({
        uuid: uuid,
      })
      if (!video || !uuid || uuid.length == 0) {
        return {};
      }
      if (episode) {
        video.episode = episode
      }
      if (rates) {
        video.rates = rates
      }
      if (title) {
        video.title = title
      }
      if (image) {
        video.image = image
      }
      if (rank) {
        video.rank = rank
      }
      if (type) {
        video.type = type
      }
      if (description) {
        video.description = description
      }
      if (status && ['editorial','favorite'].includes(status)) {
        video.status = status
      }
      if (categories) {
        video.categories = categories
      }
      if (gallery && Array.isArray(gallery)) {
        video.gallery = gallery
      }
      return await videoEntity.save(video);
    } catch (error) {
      return {};
    }
  },
  deleteVideo: async (_: any, args: any) => {
    try {
      const { uuid } = args;
      const videoEntity = AppDataSource.getRepository(VideoEntity)
      const video = await videoEntity.findOneBy({
        uuid: uuid,
      })
      if (!video || !uuid || uuid.length == 0) {
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
