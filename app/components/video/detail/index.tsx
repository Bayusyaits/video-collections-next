import React, { useContext } from "react";
import { useQuery, gql } from '@apollo/client';
import VideoDetailView from "./VideoDetailView";
import VideoDetailSidebarView from "./VideoDetailSidebarView";
import VideoDetailModal from "./modal";
import VideoDetailModalCreate from "./modal-create";
import { useModal, ModalPopupDispatchContext } from "hoc/withModal";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import { debounce } from "lodash";

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
      rates
      rank
      collections
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
  const router = useRouter();
  const {
    query: {
      slug
    }
  }: any = router
  const { openModal } = useModal();
  const { closeModal, onSubmitModal } = useContext(ModalPopupDispatchContext);
  const { loading, error, data } = useQuery(GET_VIDEO, {
    fetchPolicy: "no-cache",
    variables: {
      slug
    },
  }) 
  const handleRemoveCollection = (slug: number) => {
    console.log('handleRemoveCollection', slug)
  }
  const openModalAddCollection = debounce(() => {
    const onFinish = () => {
      onSubmitModal();
    };
    const onSwitch = () => {
      closeModal();
      openModalCreateCollection()
    }
    openModal({
      title: "Add to Collection",
      hideClose: false,
      component: () => (
        <VideoDetailModal
          onFinish={onFinish}
          onSwitch={onSwitch}
          field={data.video}
        />
      ),
      onClose: () => {
        closeModal();
      },
    });
  }, 1000);
  const openModalCreateCollection = debounce(() => {
    const onFinish = () => {
      onSubmitModal();
      openModalAddCollection()
    };
    const onSwitch = () => {
      closeModal();
      openModalAddCollection()
    }
    openModal({
      title: "Create Collection",
      hideClose: false,
      component: () => (
        <VideoDetailModalCreate
          onFinish={onFinish}
          onSwitch={onSwitch}
          field={data.video}
        />
      ),
      onClose: () => {
        closeModal();
      },
    });
  }, 1000);
  const handleAddCollection = (e: React.FormEvent<HTMLFormElement>) => {
    if (data?.video) {
      openModalAddCollection()
    }
  }
  const handlerList = {
    error,
    loading,
    data
  }

  const handlerCollection = {
    handleRemoveCollection,
    handleAddCollection,
    error,
    loading,
    data
  }

  return (
    <Grid 
        container 
        rowSpacing={3} 
        columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2 }}
        justifyContent="start"
        alignItems="start"
      >
      <Grid item lg={8} xl={8} xs={12} sm={12} md={8}>
        <VideoDetailView {...handlerList} />
      </Grid>
      <Grid item lg={4} xl={4} xs={12} sm={12} md={4}>
        <VideoDetailSidebarView {...handlerCollection} />
      </Grid>
    </Grid>
  );
}

export default VideoDetailContainer