// Construct a schema, using GraphQL schema language
export const typeDefs = `
  extend type Query {
    getVideoCollections(
      uuid: String!
      search: String
      sortBy: String
      videoUuid: String
      userUuid: String
      offset: Int
      limit: Int
    ): PaginateVideoCollection
    getVideoCollection(uuid: String!): VideoCollection
  }
  extend type Mutation {
    addVideoCollection(
      videoUuid: String!
      collectionUuid: String!
      userUuid: String!
    ): VideoCollection!
    addBulkVideoCollection(
      collections: [String]
      videos: [String]
      userUuid: String
    ): [VideoCollection!]!
    bulkVideoCollection(
      payload: [PayloadBulkVideoCollection!]!
    ): [VideoCollection]
    editVideoCollection(
      videoUuid: String!
      collectionUuid: String!
      userUuid: String!
      uuid: String!
    ): VideoCollection!
    deleteVideoCollection(
      uuid: String!
      userUuid: String!
    ): Boolean!
  }

  type PaginateVideoCollection {
    hasMore: Boolean
    items: [VideoCollection!]!
    page: Int
    limit: Int
    total: Int
  }

  type VideoCollection {
    id: Int
    videoUuid: Video
    collectionUuid: Collection
    uuid: String
    userUuid: String
  }

  input CollectionUuid {
    uuid: String!
  }

  input PayloadBulkVideoCollection {
    videoUuid: String!
    uuid: String
    collectionUuid: CollectionUuid!
    action: String!
    userUuid: String!
  }
`;