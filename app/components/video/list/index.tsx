import React, { useState } from "react";
import { useQuery, gql } from '@apollo/client';
import VideoListView from "./VideoList";
import { useRouter } from "next/router";

const GET_VIDEOS = gql`
  query getVideos(
    $offset: Int
    $limit: Int
  ) {
    videos(
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

type VideosProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  type: string;
  fetchLimit?: number;
  loadMore?: boolean;
};
const VideoListContainer: React.FC<VideosProps> = ({
  type,
  fetchLimit = 10,
  loadMore = true,
}) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const router = useRouter();
  const { loading, error, data, fetchMore } = useQuery(GET_VIDEOS, {
    variables: {
      type: 'anime',
      // text: router.query.text,
      // category: router.query.category,
      offset: 0,
      limit: fetchLimit,
    },
  }) 
  const handleLoadMore = () => {
    setLoadingMore(true);
    fetchMore({
      variables: {
        offset: Number(data.videos.items.length),
        limit: fetchLimit,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setLoadingMore(false);
        if (!fetchMoreResult) {
          return prev;
        }
        return {
          videos: {
            __typename: prev.videos.__typename,
            items: [...prev.videos.items, ...fetchMoreResult.videos.items],
            hasMore: fetchMoreResult.videos.hasMore,
          },
        };
      },
    });
  };
  const handleCollection = (slug: number) => {
    console.log('handleCollection', slug)
  }
  const handler = {
    handleCollection,
    handleLoadMore,
    error,
    loading,
    data,
    loadMore,
    loadingMore,
    type
  }

  return (
    <>
      <VideoListView {...handler} />
    </>
  );
}

export default VideoListContainer