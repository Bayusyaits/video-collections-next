import gql from "graphql-tag";
export const PUT_BULK_VIDEO_COLLECTION = gql`
  mutation bulkVideoCollection(
    $payload: [PayloadBulkVideoCollection!]!
  ) {
    bulkVideoCollection(
      payload: $payload
    ) {
      uuid
      userUuid
    }
  }
`;
export const GET_VIDEO = gql`
  query getVideo(
    $slug: String!
  ) {
    getVideo(
      slug: $slug
    ) {
      uuid
      title
      slug
      episode
      description
      isCencor
      type
      image
      rates
      rank
      videoCategories {
        id
        uuid
        categoryUuid {
          title
        }
      }
      videoCollections {
        uuid
        collectionUuid {
          title
          uuid
        }
        id
      }
    }
  }
`;