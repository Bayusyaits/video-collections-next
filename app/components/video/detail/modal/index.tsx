import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import * as yup from "yup";

import VideoDetailModalView from "./VideoDetailModalView";
import { GET_LIST_COLLECTIONS } from "../modal/queries"
import { GET_VIDEO, PUT_BULK_VIDEO_COLLECTION } from "../queries";
import { useRouter } from "next/router";

type Props = {
  onFinish: () => void
  field: any,
  sortBy?: string,
  onSwitch: () => void
};

const VideoDetailModalContainer = (props: Props) => {
  const {
    field,
    sortBy = 'id',
    onSwitch
  } = props
  const [payload, setPayload] = useState<any>([])
  const { loading, error, data } = useQuery(GET_LIST_COLLECTIONS, {
    variables: {
      sortBy,
      slug: ''
    },
  }) 
  let defaultValues = {
    field
  };
  const schema = yup
    .object({
      field: yup.object({
        videoCollections: yup.array().of(
          yup.object({
            collectionUuid: yup.object({
              uuid: yup.string()
            })
          })
        )
      }),
    })
    .required();
    const {
      register,
      control,
      handleSubmit,
      reset,
      setValue,
      formState,
      watch,
    } = useForm({
      defaultValues,
      resolver: yupResolver(schema),
    });
  const watchAllFields = watch();
  const router = useRouter();
  const {
    query: {
      slug
    }
  }: any = router
  const [putBulkVideoCollection, {}] = useMutation(PUT_BULK_VIDEO_COLLECTION, {
    refetchQueries: [
      {
        query: GET_VIDEO,
        variables: { slug },
      }
    ],
  });
  const handleChangeCollection = (val: any) => {
    const {
      field: {
        uuid,
        videoCollections
      }
    } = watchAllFields
    let value = val?.target?.value || []
    let arr = []
    let del = []
    const userUuid = 'de4e31bd-393d-40f7-86ae-ce8e25d81b00'
    if (videoCollections && videoCollections.length && value && value.length) {
      for (let i = 0; i < videoCollections.length; i++) {
        const el = videoCollections[i]
        const index = value.indexOf(el?.collectionUuid?.uuid)
        if (el?.collectionUuid?.uuid && 
          index == -1) {
          del.push({
            videoUuid: uuid,
            userUuid,
            action: 'delete',
            collectionUuid: {
              uuid: el?.collectionUuid?.uuid
            }
          })
        }
      }
    } 
    if (value && value.length) {
      arr = value.map((el: any) => ({
        videoUuid: uuid,
        action: 'add',
        userUuid,
        collectionUuid: {
          uuid: el
        }
      }))
    }
    setPayload([...arr, ...del])
    setValue('field.videoCollections', arr)
  }
  const handleSave = () => {
    putBulkVideoCollection({
      variables: {
          payload,
        } 
      },
    ).then(() => {
      if (props?.onFinish && typeof props?.onFinish === 'function') {
        props?.onFinish()
      }
    });
  }
  const handleSwitchModal = () => {
    onSwitch()
  }
  const { errors, isDirty } = formState;
  const obj = {
    register,
    control,
    handleSubmit,
    handleSave,
    handleChangeCollection,
    isDirty,
    errors,
    loading,
    error,
    handleSwitchModal,
    collections: data && data.getListCollection ? data.getListCollection : []
  };
  return <VideoDetailModalView {...obj} />;
};

export default VideoDetailModalContainer;
