import gql from "graphql-tag";


export const POST_ADD_BULK_VIDEO_COLLECTION = gql`
  mutation addBulkVideoCollection(
    $collections: [String]
    $videos: [String]
    $userUuid: String
  ) {
    addBulkVideoCollection(
      collections: $collections
      videos: $videos
      userUuid: $userUuid
    ) {
      id
      uuid
      videoUuid
      userUuid
    }
  }
`;
export const GET_LIST_VIDEO_COLLECTIONS = gql`
  query getListVideoCollections(
    $slug: String
    $sortBy: String
  ) {
    getListVideoCollection(
      slug: $slug,
      sortBy: $sortBy
    ) {
      uuid
      videoUuid
      userUuid
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
      uuid
      title
      slug
      type
      image
    }
  }
`;
