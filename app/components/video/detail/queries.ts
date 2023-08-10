import gql from "graphql-tag";

export const GET_VIDEO = gql`
  query getVideo(
    $slug: String!
  ) {
    getVideo(
      slug: $slug
    ) {
      id
      title
      slug
      episode
      description
      isCencor
      type
      image
      rates
      rank
      collections
      gallery {
        url
      }
      videoCategories {
        id
        uuid
      }
    }
  }
`;