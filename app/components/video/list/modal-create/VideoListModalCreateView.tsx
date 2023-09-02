import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { InputLabel, FormHelperText, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { Controller } from "react-hook-form";
import React from "react";
type ViewListModalCreateViewProps = {
  handleSubmit: any,
  handleSave: (payload: React.FormEvent<HTMLFormElement>) => void,
  handleSwitchModal: () => void,
  isDisabled?: boolean,
  collections: CollectionProps[],
  control: any,
  errors: any,
  error: any
}
type CollectionProps = {
  id: string,
  slug: string,
  title: string,
  image: string
}
export const ViewListModalCreateView = ({
  handleSubmit,
  handleSave,
  handleSwitchModal,
  isDisabled,
  collections,
  control,
  error,
  errors
}: ViewListModalCreateViewProps) => {
  if (error) return <p>Error : {error.message ? error.message : 'Error'}</p>;
  return (
      <Grid
        container
        maxWidth={'lg'}
        width={'100%'}
        rowSpacing={3} 
        sx={{
          marginTop: 2
        }}
      >
        <form
          onSubmit={handleSubmit(handleSave)}
          style={{
            width: '100%',
          }}
        >
          <FormControl
            fullWidth
            variant="outlined"
            disabled={!collections || collections.length == 0}
          >
            <InputLabel>Title</InputLabel>
            <Controller
              name="field.title"
              defaultValue={''}
              control={control}
              render={({ field }: any) => (
                <OutlinedInput
                  id="video-detail-modal-create-title"
                  label="Title"
                  defaultValue="Small"
                  variant={"standard"}
                  size="small"
                  {...field}
                />)
              }
            />
            <FormHelperText error={true}>{errors.field?.title?.message}</FormHelperText>
          </FormControl>
          <FormControl
            fullWidth
            variant="outlined"
            disabled={!collections || collections.length == 0}
            sx={{
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            <InputLabel>Link Image</InputLabel>
            <Controller
              name="field.image"
              defaultValue={''}
              control={control}
              render={({ field }: any) => (
                <OutlinedInput
                  id="video-detail-modal-create-title"
                  label="Link Image"
                  defaultValue="Small"
                  variant={"standard"}
                  size="small"
                  {...field}
                />)
              }
            />
            <FormHelperText error={true}>{errors.field?.image?.message}</FormHelperText>
          </FormControl>
          <div
            style={{
              display: 'flex',
              justifyContent: 'end'
            }}
          >
            <Button
              disabled={isDisabled}
              type="button"
              onClick={handleSwitchModal}
              variant={'outlined'}
              
              sx={{
                marginTop: 2,
                marginRight: 1,
              }}
            >
              Switch to Collections
            </Button>
            <Button
              disabled={isDisabled || !collections || collections.length == 0}
              type="submit"
              variant={'contained'}
              className="btn btn-prime py-3 px-5 w-full xl:w-50 xl:mr-3 align-top"
              sx={{
                marginTop: 2,
              }}
            >
              Create Collection
            </Button>
          </div>
        </form>
      </Grid>
  );
};

export default ViewListModalCreateView;
