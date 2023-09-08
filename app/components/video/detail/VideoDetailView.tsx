import React from "react";
import ErrorNotFound from 'components/error/not-found';
import { CardMedia, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { isEmpty } from "lodash";
import { Box, Container } from "@mui/system";
import StarIcon from '@mui/icons-material/Star';

function VideoDetailView({
  data, 
  error, 
  loading,
  handleRemoveCollection
}: any) {

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message ? error.message : 'Error'}</p>;
  if (!data || !data.getVideo || !data.getVideo || isEmpty(data.getVideo)) {
    return <ErrorNotFound />;
  }
  const { 
    id, 
    title, 
    description,
    image, 
    videoCategories, 
    videoCollections,
    episode, 
    publishDate, 
    isCencor, 
    rates 
  }: any = data.getVideo
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const starIcon = (val: number) => {
    const arr = []
    const num = val && val < 5 ? val : 5
    for (let i = 0; i < num; i++) {
      arr.push(<StarIcon fontSize="small" key={i}></StarIcon>)
    }
    return (arr)
  }
  return (
    <>
      <Container id={id} maxWidth="md">
          <CardMedia
            component="img"
            image={`${image}`}
            alt={title}
          />
          <Grid container>
            <Grid item>
              <Box
                sx={{
                  position: 'relative',
                  pr: { md: 0 },
                }}
              >
                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                  {title}
                </Typography>
                <Grid container spacing={2} sx={{ marginBottom: 5 }}>
                  <Grid item xs={2}>
                    {
                      rates && rates > 0 ? ( <Item>
                        {
                          starIcon(rates)
                        }
                      </Item>) : (<></>)
                     
                    }
                  </Grid>
                  <Grid item xs={5}>
                    <Item>
                      <Typography component="small" color="inherit" gutterBottom>
                        Publish Date: {publishDate}
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={3}>
                    <Item>
                      <Typography component="small" color="inherit" gutterBottom>
                        Episode: {episode}
                      </Typography>
                    </Item>
                  </Grid>
                  <Grid item xs={2}>
                    <Item>
                      <Typography component="small" color="inherit" gutterBottom>
                        Cencor: {isCencor ? 'Yes' : 'No'}
                      </Typography>
                    </Item>
                  </Grid>
                </Grid>
                <Typography 
                  variant="h5" 
                  color="inherit" 
                  paragraph
                >
                  {description}
                </Typography>
                <Grid 
                  container
                >
                  <Stack direction="row" spacing={1}>
                    {videoCategories && videoCategories.length ? 
                      videoCategories.map(({ uuid: uuidc, categoryUuid}: any) => (
                        <Chip 
                          key={uuidc}
                          label={categoryUuid?.title || '-'} />
                      )) 
                    : null}
                  </Stack>
                </Grid>
                <Grid container sx={{
                  marginTop: 2
                }}>
                  <Stack direction="row" spacing={1}>
                    {videoCollections && videoCollections.length ? 
                      videoCollections.map(({ uuid: uuidc, collectionUuid}: any) => uuidc && collectionUuid?.title ? (
                        <Chip 
                          key={uuidc}
                          variant="outlined" 
                          label={collectionUuid?.title || '-'}
                          onDelete={handleRemoveCollection(uuidc)}
                        />
                      ) : null) 
                    : null}
                  </Stack>
                </Grid>
              </Box>
            </Grid>
          </Grid>
      </Container>
    </>
  );
}

export default VideoDetailView;
