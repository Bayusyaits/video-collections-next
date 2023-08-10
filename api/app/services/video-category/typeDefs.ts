// Construct a schema, using GraphQL schema language
export const typeDefs = `
  extend type Query {
    getVideoCategories(
      uuid: String!
      search: String
      sortBy: String
      videoUuid: String
      userUuid: String
      offset: Int
      limit: Int
    ): PaginateVideoCategory
    getVideoCategory(uuid: String!): VideoCategory
  }
  extend type Mutation {
    addVideoCategory(
      videoUuid: String!
      categoryUuid: String!
      userUuid: String!
    ): VideoCategory!
    addBulkVideoCategory(
      categories: [String]
      videos: [String]
      userUuid: String
    ): [VideoCategory!]!
    editVideoCategory(
      videoUuid: String!
      categoryUuid: String!
      userUuid: String!
      uuid: String!
    ): VideoCategory!
    deleteVideoCategory(
      uuid: String!
      userUuid: String!
    ): Boolean!
  }

  type PaginateVideoCategory {
    hasMore: Boolean
    items: [VideoCategory!]!
    page: Int
    limit: Int
    total: Int
  }

  type VideoCategory {
    id: Int
    videoUuid: String
    categoryUuid: String
    uuid: String
    userUuid: String
  }
`;