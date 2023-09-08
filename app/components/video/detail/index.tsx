import React, { useContext } from "react";
import { useQuery, useMutation } from '@apollo/client';
import VideoDetailView from "./VideoDetailView";
import VideoDetailSidebarView from "./VideoDetailSidebarView";
import VideoDetailModal from "./modal";
import VideoDetailModalCreate from "./modal-create";
import { useModal, ModalPopupDispatchContext } from "hoc/withModal";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import { debounce } from "lodash";
import { GET_VIDEO, DELETE_VIDEO_COLLECTION } from './queries'


type VideoProps = {};
const VideoDetailContainer: React.FC<VideoProps> = () => {
  const router = useRouter();
  const {
    query: {
      slug
    }
  }: any = router
  const { loading, error, data, refetch } = useQuery(GET_VIDEO, {
    fetchPolicy: "cache-and-network",
    variables: {
      slug
    },
  }) 
  const { openModal } = useModal();
  const { closeModal, onSubmitModal } = useContext(ModalPopupDispatchContext);
  const [deleteVideoCollection, {}] = useMutation(DELETE_VIDEO_COLLECTION, {
    onCompleted: refetch,
    awaitRefetchQueries: true
  });
  const handleRemoveCollection = (val: string)  => () => {
    deleteVideoCollection({
      variables: {
          uuid: val,
          userUuid: 'de4e31bd-393d-40f7-86ae-ce8e25d81b00'
        } 
      },
    )
    .catch((err: any) => {
      console.log('[011] err', err)
    });
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
          field={{...data.getVideo}}
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
        />
      ),
      onClose: () => {
        closeModal();
      },
    });
  }, 1000);
  const handleAddCollection = (e: React.FormEvent<HTMLFormElement>) => {
    if (data?.getVideo) {
      openModalAddCollection()
    }
  }
  const handlerList = {
    error,
    loading,
    data,
    handleRemoveCollection
  }

  const handlerCollection = {
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
      <Grid item lg={3} xl={3} xs={12} sm={12} md={3}>
        <VideoDetailSidebarView {...handlerCollection} />
      </Grid>
      <Grid item lg={9} xl={9} xs={12} sm={12} md={9}>
        <VideoDetailView {...handlerList} />
      </Grid>
    </Grid>
  );
}

export default VideoDetailContainer