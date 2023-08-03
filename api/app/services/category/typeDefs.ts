// Construct a schema, using GraphQL schema language
export const typeDefs = `
  type Query {
    getCategories(
      slug: String!
      search: String
      sortBy: String
      type: String
      offset: Int
      limit: Int
      ): PaginateCategory
  }
  extend type Query {
    getCategory(id: Int!): Category
  }
  type Mutation {
    addCategory(title: String!, icon: Int!): Category!
    editCategory(
      title: String!
      slug: String!
    ): Category!
    deleteCategory(
      slug: String!
    ): Boolean!
  }

  type PaginateCategory {
    hasMore: Boolean
    items: [Category!]!
    page: Int
    limit: Int
    total: Int
  }

  type Category {
    id: Int!
    title: String!
    slug: String!
    icon: Int!
  }
`;