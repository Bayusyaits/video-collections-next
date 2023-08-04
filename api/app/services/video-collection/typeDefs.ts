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
    getVideoCollection(uuid: Int!): VideoCollection
  }
  extend type Mutation {
    addVideoCollection(videoUuid: String!, image: Int!): VideoCollection!
    editVideoCollection(
      videoUuid: String!
      uuid: String!
    ): VideoCollection!
    deleteVideoCollection(
      uuid: String!
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
    id: Int!
    videoUuid: String!
    uuid: String!
    userUuid: Int!
  }
`;