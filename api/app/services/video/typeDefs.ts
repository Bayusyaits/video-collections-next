// Construct a schema, using GraphQL schema language
export const typeDefs = `
  extend type Query {
    getVideos(
      search: String
      sortBy: String
      type: String
      offset: Int
      limit: Int
      ): PaginateVideo
    getVideo(id: Int!): Video
  }
  extend type Mutation {
    addVideo(title: String!, image: Int!): Video!
    editVideo(
      title: String!
      slug: String!
    ): Video!
    deleteVideo(
      slug: String!
    ): Boolean!
  }

  type PaginateVideo {
    hasMore: Boolean
    items: [Video!]!
    page: Int
    limit: Int
    total: Int
  }

  type Gallery {
    image: String
  }

  type Video {
    id: Int!
    title: String!
    slug: String!
    image: String
    episode: Int
    description: String
    isCencor: Boolean
    rates: Int
    rank: Int
    type: String
    collections: [String]
    categories: [String]
    gallery: [Gallery]
  }
`;