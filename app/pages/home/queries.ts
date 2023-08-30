import gql from "graphql-tag";

export const GET_VIDEOS = gql`
query getVideos(
  $offset: Int
  $limit: Int
) {
  getVideos(
    offset: $offset
    limit: $limit
  ) {
    items {
      uuid
      title
      slug
      episode
      description
      isCencor
      type
      image
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
        }
        id
      }
    }
    hasMore
  }
}
`;

export const GET_VIDEO = gql`
query getVideo(
  $slug: String
) {
  getVideo(
    slug: $slug
  ) {
    items {
      uuid
      title
      slug
      episode
      description
      isCencor
      type
      image
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
        }
        id
      }
    }
    hasMore
  }
}
`;