import React, { useContext, useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { Grid } from "@mui/material";
import VideoListView from "./VideoList";
import { GET_VIDEOS } from "pages/home/queries";
import { useModal, ModalPopupDispatchContext } from "hoc/withModal";
import { debounce } from "lodash";
import VideoListModal from "./modal";
import VideoListModalCreate from "./modal-create";
import VideoListSidebarView from "./VideoListSidebarView";
import { VideoProps, Payload } from './interfaces';
import { 
  GET_LIST_COLLECTIONS,
  GET_LIST_VIDEO_COLLECTIONS, 
  POST_ADD_BULK_VIDEO_COLLECTION 
} from "./queries";

const VideoListContainer: React.FC<VideoProps> = ({
  type,
  fetchLimit = 10,
  loadMore = true,
}) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [values, setValues] = useState<string[]>([]);
  const { openModal } = useModal();
  const { closeModal, onSubmitModal } = useContext(ModalPopupDispatchContext);
  const handleChange = (val: string) => {
    const arr = [...values]
    if (val && arr.includes(val)) {
      arr.splice(arr.indexOf(val), 1)
    } else if (val) {
      arr.push(val)
    }
    setValues(arr)
  }
  const [addBulkVideoCollection] = useMutation(POST_ADD_BULK_VIDEO_COLLECTION, {
    fetchPolicy: "no-cache",
    refetchQueries: [
      GET_LIST_VIDEO_COLLECTIONS, // DocumentNode object parsed with gql
      'getListCollection' // Query name
    ],
  });
  const { 
    loading: loadingCollections, 
    error: errorCollections, 
    data: dataCollections 
  } = useQuery(GET_LIST_COLLECTIONS, {
    variables: {
      createdDate: 'uuid',
      slug: ''
    },
  }) 
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
  const openModalAddCollection = debounce(() => {
    if (!values || values.length == 0) {
      return
    }
    const onFinish = (val: Payload) => {
      onSubmitModal();
      addBulkVideoCollection({
        variables: {
            collections: val.collections,
            videos: values,
            userUuid: '1091357a-3269-11ee-be56-0242ac120002'
          } 
        },
      ).then((val: any) => {
        if (!val?.data || val?.data.length == 0) {
          return
        }
        setValues([])
        if (data.getVideos && data.getVideos.items && 
          data.getVideos.items.length > 0) {
          for (let i = 0; i < data.getVideos.items.length; i++) {
            const el: any = document.getElementById(`fiel-videos--${i}`)
            if (el && el.checked) {
              el.checked = false
            }
          }
        }
      }).catch((err) => {
        console.log('err', err)
      });
    };
    const onSwitch = () => {
      closeModal();
      openModalCreateCollection()
    }
    openModal({
      title: "Add to Collection",
      hideClose: false,
      component: () => (
        <VideoListModal
          onFinish={onFinish}
          onSwitch={onSwitch}
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
        <VideoListModalCreate
          onFinish={onFinish}
          onSwitch={onSwitch}
        />
      ),
      onClose: () => {
        closeModal();
      },
    });
  }, 1000);
  const handlerSidebar = {
    values,
    collections: dataCollections?.getListCollections || [],
    openModalAddCollection
  }
  const handlerList = {
    handleLoadMore,
    error,
    loading,
    data,
    loadMore,
    loadingMore,
    type,
    collections: dataCollections?.getListCollections || [],
    handleChange
  }
  return (
    <>
      <Grid 
        container 
        rowSpacing={3} 
        columnSpacing={{ xs: 2, sm: 2, md: 2, lg: 2 }}
        justifyContent="start"
        alignItems="start"
      >
      <Grid item lg={3} xl={3} xs={12} sm={12} md={3}>
        <VideoListSidebarView
          {...handlerSidebar}
        />
      </Grid>
      <Grid item lg={9} xl={9} xs={12} sm={12} md={9}>
        <VideoListView {...handlerList} />
      </Grid>
    </Grid>
    </>
  );
}

export default VideoListContainer