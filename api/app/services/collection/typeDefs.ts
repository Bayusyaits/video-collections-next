// Construct a schema, using GraphQL schema language
export const typeDefs = `
  extend type Query {
    getCollections(
      slug: String!
      search: String
      sortBy: String
      type: String
      offset: Int
      limit: Int
      ): PaginateCollection
    getCollection(uuid: String!): Collection
  }
  extend type Mutation {
    addCollection(payload: PayloadAddCollection): Collection!
    editCollection(payload: PayloadEditCollection): Collection!
    deleteCollection(
      uuid: String!
    ): Boolean!
  }

  type PaginateCollection {
    hasMore: Boolean
    items: [Collection!]!
    page: Int
    limit: Int
    total: Int
  }

  input PayloadAddCollection {
    title: String!
    slug: String!
    image: Int!
  }

  input PayloadEditCollection {
    uuid: String!
    title: String
    slug: String
    image: Int
  }
  
  type Collection {
    id: Int!
    title: String!
    slug: String!
    image: Int!
  }
`;