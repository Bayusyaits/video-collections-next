import { isEmpty } from "lodash";
import { v4 } from "uuid";
import Args, { VideoCollectionResponse } from "./args";
import { AppDataSource } from "../../data-source"
import { VideoCollection as VideoCollectionEntity } from "./entity";
import { filterItems } from "../../helpers/filter";

// Provide resolver functions for your schema fields
export const Query = {
  getVideoCollection: async (_: any, args: any) => {
    const { id } = args;
    const videoCollectionEntity = AppDataSource.getRepository(VideoCollectionEntity)
    return await videoCollectionEntity.findOne({ where: { id: id } });
  },
  getVideoCollections: async (_: any, args: Args): Promise<VideoCollectionResponse> => {
    const videoCollectionEntity = AppDataSource.getRepository(VideoCollectionEntity)
    const { offset = 0, limit = 10, uuid, sortBy } = args;
    const where = {}
    const order = {}
    if (uuid) {
      Object.assign(where, {
        uuid
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
    const [data, total] = await videoCollectionEntity.findAndCount({
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
    const res = new VideoCollectionResponse({
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
  addVideoCollection: async (_: any, args: any) => {
    try {
      try {
        const { userUuid, videoUuid } = args;
        const videoCollection = new VideoCollectionEntity()
        videoCollection.userUuid = userUuid || '1091357a-3269-11ee-be56-0242ac120002'
        videoCollection.uuid = v4()
        videoCollection.videoUuid = videoUuid
        const videoCollectionRepository = AppDataSource.getRepository(VideoCollectionEntity)
        return await videoCollectionRepository.save(videoCollection);
      } catch (error) {
        return {};
      }
    } catch (error) {
      return false;
    }
  },
  editVideoCollection: async (_: any, args: any) => {
    try {
      const { userUuid, uuid } = args;
      const videoCollectionEntity = AppDataSource.getRepository(VideoCollectionEntity)
      const videoCollection = await videoCollectionEntity.findOneBy({
        uuid: uuid,
      })
      if (!videoCollection || !uuid || uuid.length == 0) {
        return {};
      }
      if (userUuid) {
        videoCollection.userUuid = userUuid
      }
      return await videoCollectionEntity.save(videoCollection);
    } catch (error) {
      return {};
    }
  },
  deleteVideoCollection: async (_: any, args: any) => {
    try {
      const { uuid } = args;
      const videoCollectionEntity = AppDataSource.getRepository(VideoCollectionEntity)
      const videoCollection = await videoCollectionEntity.findOneBy({
        uuid: uuid,
      })
      if (!videoCollection || !uuid || uuid.length == 0) {
        return false;
      }
      videoCollection.softRemove()
      await videoCollectionEntity.save(videoCollection)
      return true;
    } catch (error) {
      return false;
    }
  }
}
