import { isEmpty } from "lodash";
import { v4 } from "uuid";
import Args, { VideoCategoryResponse } from "./args";
import { AppDataSource } from "../../data-source"
import { VideoCategory as VideoCategoryEntity } from "./entity";
import { filterItems } from "../../helpers/filter";

// Provide resolver functions for your schema fields
export const Query = {
  getVideoCategory: async (_: any, args: any) => {
    const { uuid } = args;
    const videoCategoryEntity = AppDataSource.getRepository(VideoCategoryEntity)
    return await videoCategoryEntity.findOne({ where: { uuid: uuid } });
  },
  getVideoCategories: async (_: any, args: Args): Promise<VideoCategoryResponse> => {
    const videoCategoryEntity = AppDataSource.getRepository(VideoCategoryEntity)
    const { offset = 0, limit = 10, uuid, sortBy } = args;
    const where = {}
    const order = {}
    if (uuid) {
      Object.assign(where, {
        uuid
      })
    }
    // if (videoUuid) {
    //   Object.assign(where, videoUuid: {
    //     uuid: videoUuid
    //   })
    // }
    // if (categoryUuid) {
    //   Object.assign(where, categoryUuid: {
    //     uuid: categoryUuid
    //   })
    // }
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
    const [data, total] = await videoCategoryEntity.findAndCount({
      ...obj,
      take: 10,
      skip: 0
    })
    const filteredData = filterItems(
      data,
      limit,
      offset,
      '',
      ''
    );
    const res = new VideoCategoryResponse({
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
  addVideoCategory: async (_: any, args: any) => {
    try {
      try {
        const { userUuid, videoUuid, categoryUuid } = args;
        const videoCategory = new VideoCategoryEntity()
        videoCategory.userUuid = userUuid || 'de4e31bd-393d-40f7-86ae-ce8e25d81b00'
        videoCategory.uuid = v4()
        videoCategory.videoUuid = videoUuid
        videoCategory.categoryUuid = categoryUuid
        const videoCategoryRepository = AppDataSource.getRepository(VideoCategoryEntity)
        return await videoCategoryRepository.save(videoCategory);
      } catch (error) {
        return {};
      }
    } catch (error) {
      return false;
    }
  },
  addBulkVideoCategory: async (_: any, args: any) => {
    try {
      let arr = []
      try {
        const { categories, videos, userUuid } = args;
        if (categories && Array.isArray(categories) && categories.length &&
          videos && Array.isArray(videos) && videos.length && userUuid) {
          const videoCategoryEntity = AppDataSource.getRepository(VideoCategoryEntity)
          for (let i = 0; i < videos.length; i++) {
            for (let k = 0; k < categories.length; k++) {
              const el = {
                userUuid: userUuid,
                videoUuid: {
                  uuid: videos[i]
                },
                categoryUuid: {
                  uuid: categories[k]
                }
              }
              const check =  await videoCategoryEntity.findOne({ 
                where: {...el},
                relations: {
                  videoUuid: true,
                },
              });
              if (!check) {
                const res = await Mutation.addVideoCategory('', {
                  userUuid: userUuid,
                  videoUuid: videos[i],
                  categoryUuid: categories[k]
                })
                arr.push(res)
              }
            }
          }
        }
        return arr
      } catch (error) {
        return {};
      }
    } catch (error) {
      return false;
    }
  },
  editVideoCategory: async (_: any, args: any) => {
    try {
      const { userUuid, uuid, videoUuid, categoryUuid } = args;
      const videoCategoryEntity = AppDataSource.getRepository(VideoCategoryEntity)
      const videoCategory = await videoCategoryEntity.findOneBy({
        uuid: uuid,
        userUuid: userUuid
      })
      if (!videoCategory || !uuid || uuid.length == 0) {
        return {};
      }
      if (videoUuid) {
        videoCategory.videoUuid = videoUuid
      }
      if (categoryUuid) {
        videoCategory.categoryUuid = categoryUuid
      }
      return await videoCategoryEntity.save(videoCategory);
    } catch (error) {
      return {};
    }
  },
  deleteVideoCategory: async (_: any, args: any) => {
    try {
      const { uuid, userUuid } = args;
      const videoCategoryEntity = AppDataSource.getRepository(VideoCategoryEntity)
      const videoCategory = await videoCategoryEntity.findOneBy({
        uuid: uuid,
        userUuid: userUuid
      })
      if (!videoCategory || !uuid || uuid.length == 0) {
        return false;
      }
      videoCategory.softRemove()
      await videoCategoryEntity.save(videoCategory)
      return true;
    } catch (error) {
      return false;
    }
  }
}
