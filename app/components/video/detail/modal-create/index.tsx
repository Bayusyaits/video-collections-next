import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from '@apollo/react-hooks';
import { useQuery, gql } from '@apollo/client';
import { v4 } from 'uuid';
import * as yup from "yup";

import VideoDetailModalView from "./VideoDetailModalCreateView";
import { setSpaceToDash } from "helpers/mixins";
import { cloneDeep } from "lodash";

type Props = {
  onFinish: () => void
  type?: string,
  onSwitch: () => void
};

type Payload = {
  field: {
    title: string,
    image: string
  }
}
const POST_CREATE_COLLECTION = gql`
  mutation postCreateCollection(
    $id: String!
    $slug: String!
    $title: String!
    $image: String!
    $isActive: Boolean!
    $type: String!
  ) {
    postCreateCollection(
      id: $id
      slug: $slug
      title: $title
      type: $type
      isActive: $isActive
      image: $image
    ) {
      id
      title
      type
      isActive
      slug
      image
    }
  }
`;
const GET_LIST_COLLECTIONS = gql`
  query getListCollections(
    $slug: String!
    $type: String!
  ) {
    listCollection(
      slug: $slug,
      type: $type
    ) {
      id,
      title
      slug
      type
      image
    }
  }
`;

const GET_COLLECTIONS = gql`
  query getCollections(
    $offset: Int
    $limit: Int
  ) {
    collections(
      offset: $offset
      limit: $limit
    ) {
      items {
        id,
        title
        slug
        type
        image
      }
      hasMore
    }
  }
`;


const VideoDetailModalCreateContainer = (props: Props) => {
  const {
    type = 'tv',
    onFinish,
    onSwitch
  } = props
  const { loading, error, data } = useQuery(GET_LIST_COLLECTIONS, {
    fetchPolicy: "no-cache",
    variables: {
      type,
      slug: ''
    },
  }) 
  const collections = data && data.listCollection ? data.listCollection : []
  const [postCreateCollection] = useMutation(POST_CREATE_COLLECTION, {
    fetchPolicy: "no-cache",
    refetchQueries: [
      GET_LIST_COLLECTIONS, // DocumentNode object parsed with gql
      'listCollection' // Query name
    ],
  });
  console.log('data', data)
  let defaultValues = {
    field: {
      title: '',
      image: ''
    }
  };
  const schema = yup
    .object({
      field: yup.object({
        title: yup.string()
          .required('Title is required')
          .matches(/^'?\p{L}+(?:[' ]\p{L}+)*'?$/u, 'doesn’t have special Char'),
        image: yup.string()
      }),
    })
    .required();
  const handleSave = (val: Payload) => {
    let bool = true
    if (!val?.field) {
      setError('field.title',  { type: "focus", message: 'Field is required'});
      bool = false
    } else if (collections && val?.field?.title && 
      collections.indexOf((el: any) => el?.title && 
        setSpaceToDash(el.title) === setSpaceToDash(val?.field?.title)) > -1) {
      setError('field.title',  { type: "focus", message: 'Title already exists'});
      bool = false
    }
    if (bool) {
      postCreateCollection({
        variables: {
          ...val.field,
          id: v4(),
          type: 'drama',
          isActive: true,
          slug: setSpaceToDash(val.field.title)
        } },
      ).then((val: any) => {
        onFinish()
        reset()
      });
    }
  }
  const handleSwitchModal = () => {
    onSwitch()
  }
  const {
    setError,
    control,
    handleSubmit,
    formState,
    reset
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { errors, isDirty } = formState;
  const obj = {
    handleSubmit,
    handleSave,
    handleSwitchModal,
    isDirty,
    errors,
    loading,
    error,
    control,
    collections
  };
  return <VideoDetailModalView {...obj} />;
};

export default VideoDetailModalCreateContainer;
