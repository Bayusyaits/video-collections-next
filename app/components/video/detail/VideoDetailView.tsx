import React from "react";
import ErrorNotFound from 'components/error/not-found';
import { CardMedia, Chip, Grid, Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { isEmpty } from "lodash";
import { Box, Container } from "@mui/system";
import StarIcon from '@mui/icons-material/Star';

function VideoListView({
  data, 
  error, 
  loading,
  handleCollection
}: any) {

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message ? error.message : 'Error'}</p>;
  if (!data || !data.getVideo || !data.getVideo || isEmpty(data.getVideo)) {
    return <ErrorNotFound />;
  }
  const { id, title, description, image, videoCategories, episode, publishDate, isCencor, rates }: any = data.getVideo
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
                  <Grid item xs={3}>
                    {
                      rates && rates > 0 ? ( <Item>
                        {
                          starIcon(rates)
                        }
                      </Item>) : (<></>)
                     
                    }
                  </Grid>
                  <Grid item xs={3}>
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
                  <Grid item xs={3}>
                    <Item>
                      <Typography component="small" color="inherit" gutterBottom>
                        Cencor: {isCencor ? 'Yes' : 'No'}
                      </Typography>
                    </Item>
                  </Grid>
                </Grid>
                <Typography variant="h5" color="inherit" paragraph>
                  {description}
                </Typography>
                <Grid container>
                  {videoCategories && videoCategories.length ? 
                    videoCategories.map(({title: titlec, id: idc}: any) => (
                    <Grid item lg={4} xl={4} xs={6} md={4} key={idc}>
                      <Chip label={titlec} />
                    </Grid>
                    )) 
                  : '-'}
                </Grid>
              </Box>
            </Grid>
          </Grid>
      </Container>
    </>
  );
}

export default VideoListView;
