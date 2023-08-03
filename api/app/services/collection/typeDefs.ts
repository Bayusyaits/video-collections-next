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
  }
  extend type Query {
    getCollection(id: Int!): Collection
  }
  extend type Mutation {
    addCollection(title: String!, image: Int!): Collection!
    editCollection(
      title: String!
      slug: String!
    ): Collection!
    deleteCollection(
      slug: String!
    ): Boolean!
  }

  type PaginateCollection {
    hasMore: Boolean
    items: [Collection!]!
    page: Int
    limit: Int
    total: Int
  }

  type Collection {
    id: Int!
    title: String!
    slug: String!
    image: Int!
  }
`;