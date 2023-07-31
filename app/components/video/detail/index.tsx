import React, { useState } from "react";
import { useQuery, gql } from '@apollo/client';
import VideoDetailView from "./VideoDetailView";
import { useRouter } from "next/router";

const GET_VIDEO = gql`
  query getVideo(
    $slug: String!
  ) {
    video(
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
      gallery {
        url
      }
      categories {
        id
        title
        slug
      }
    }
  }
`;

type VideosProps = {};
const VideoDetailContainer: React.FC<VideosProps> = () => {
  const {
    query: {
      slug
    }
  } = useRouter();
  const { loading, error, data } = useQuery(GET_VIDEO, {
    variables: {
      slug
    },
  }) 
  const handleRemoveCollection = (id: number) => {
    console.log('handleRemoveCollection', id)
  }
  const handler = {
    handleRemoveCollection,
    error,
    loading,
    data
  }

  return (
    <>
      <VideoDetailView {...handler} />
    </>
  );
}

export default VideoDetailContainer