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
    getVideo(slug: String!): Video
  }
  
  extend type Mutation {
    addVideo(payload: PayloadAddVideo): Video!
    editVideo(payload: PayloadEditVideo): Video!
    deleteVideo(
      uuid: String!
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

  input PayloadAddVideo {
    title: String!
    image: String!
    episode: Int
    description: String
    isCencor: Int
    rates: Int
    rank: Int
    type: String
  }

  input PayloadEditVideo {
    uuid: String!
    slug: String
    title: String
    image: String
    episode: Int
    description: String
    isCencor: Int
    rates: Int
    rank: Int
    type: String
  }

  type Video {
    uuid: String!
    title: String!
    slug: String!
    image: String
    episode: Int
    description: String
    isCencor: Int
    rates: Int
    rank: Int
    type: String
    gallery: [Gallery]
    videoCollections: [VideoCollection]
    videoCategories: [VideoCategory]
  }
`;