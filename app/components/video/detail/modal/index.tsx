import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from '@apollo/client';
import * as yup from "yup";

import VideoDetailModalView from "./VideoDetailModalView";
import { GET_LIST_COLLECTIONS } from "../modal/queries"

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
          yup.string()
        )
      }),
    })
    .required();
  const handleSave = () => {
    reset()
  }
  const handleSwitchModal = () => {
    onSwitch()
  }

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { errors, isDirty } = formState;
  const obj = {
    register,
    control,
    handleSubmit,
    handleSave,
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
