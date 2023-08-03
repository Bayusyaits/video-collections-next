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
      id
      title
      slug
      episode
      description
      isCencor
      type
      image
      categories {
        id
        title
        slug
      }
    }
    hasMore
  }
}
`;