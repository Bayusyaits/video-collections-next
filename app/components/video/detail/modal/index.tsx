import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery, gql } from '@apollo/client';
import * as yup from "yup";

import VideoDetailModalView from "./VideoDetailModalView";

type Props = {
  onFinish: () => void
  field: any,
  type?: string,
  onSwitch: () => void
};

const GET_LIST_COLLECTIONS = gql`
  query getListCollections(
    $slug: String!
    $type: String!
  ) {
    listCollection(
      slug: $slug,
      type: $type
    ) {
      title
      slug
      type
      image
    }
  }
`;


const VideoDetailModalContainer = (props: Props) => {
  const {
    field,
    type = 'tv',
    onSwitch
  } = props
  const [list, setList] = useState([])
  const { loading, error, data } = useQuery(GET_LIST_COLLECTIONS, {
    variables: {
      type,
      slug: ''
    },
  }) 
  let defaultValues = {
    field
  };
  const schema = yup
    .object({
      field: yup.object({
        collections: yup.array().of(
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
  useEffect(() => {
    console.log('data', data)
    if (data?.listCollection) {
      setList(data.listCollection);
    }
  }, [data]);

  const {
    register,
    setError,
    control,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { errors, isDirty } = formState;
  const watchAllFields = watch();
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
    collections: data && data.listCollection ? data.listCollection : []
  };
  return <VideoDetailModalView {...obj} />;
};

export default VideoDetailModalContainer;
