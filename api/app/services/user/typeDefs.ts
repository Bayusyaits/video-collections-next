// Construct a schema, using GraphQL schema language

export const typeDefs = `
  extend type Query {
    getUser(id: Int!): User
  }
  extend type Mutation {
    addUser(firstName: String!, lastName: String, birthdayDate: String!): User!
    editUser(
      firstName: String!, 
      lastName: String, 
      birthdayDate: String!
      userName: String!
    ): User!
    deleteUser(
      userName: String!
    ): Boolean!
  }  

  type User {
    id: Int!
    firstName: String!
    lastName: String!
    birthdayDate: String!
    userName: String!
  }
`;
