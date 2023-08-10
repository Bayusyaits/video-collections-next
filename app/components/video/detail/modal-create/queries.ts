import gql from "graphql-tag";


export const POST_CREATE_COLLECTION = gql`
  mutation postCreateCollection(
    $id: String!
    $slug: String!
    $title: String!
    $image: String!
    $isActive: Boolean!
    $type: String!
  ) {
    postCreateCollection(
      id: $id
      slug: $slug
      title: $title
      type: $type
      isActive: $isActive
      image: $image
    ) {
      id
      title
      type
      isActive
      slug
      image
    }
  }
`;
export const GET_LIST_COLLECTIONS = gql`
  query getListCollections(
    $slug: String
    $sortBy: String
  ) {
    getListCollection(
      slug: $slug,
      sortBy: $sortBy
    ) {
      id
      uuid
      title
      slug
      type
      image
    }
  }
`;
