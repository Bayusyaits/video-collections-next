import React, { useState } from "react";
import { useQuery } from '@apollo/client';
import VideoListView from "./VideoList";
import { useRouter } from "next/router";
import { GET_VIDEOS } from "pages/home/queries";


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
  const { loading, error, data, fetchMore } = useQuery(GET_VIDEOS, {
    variables: {
      type: 'anime',
      offset: 0,
      limit: fetchLimit,
    },
  }) 
  const handleLoadMore = () => {
    setLoadingMore(true);
    fetchMore({
      variables: {
        offset: Number(data.getVideos.items.length),
        limit: fetchLimit,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        setLoadingMore(false);
        if (!fetchMoreResult) {
          return prev;
        }
        return {
          getVideos: {
            __typename: prev.getVideos.__typename,
            items: [...prev.getVideos.items, ...fetchMoreResult.getVideos.items],
            hasMore: fetchMoreResult.getVideos.hasMore,
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