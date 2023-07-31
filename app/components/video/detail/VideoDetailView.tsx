import React from "react";
import ErrorNotFound from 'components/error/not-found';
import { Button } from "@mui/base";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Paper, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import { Box, Container } from "@mui/system";
import Link from "next/link";

function VideoListView({
  data, 
  error, 
  loading,
  handleCollection
}: any) {

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message ? error.message : 'Error'}</p>;
  if (!data || !data.video || !data.video || isEmpty(data.video)) {
    return <ErrorNotFound />;
  }
  const { id, title, description, image, categories }: any = data.video
  return (
    <>
      <Container maxWidth="sm">
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
                <Typography variant="h5" color="inherit" paragraph>
                  {description}
                </Typography>
                <Link variant="subtitle1" href="#">
                  Collection
                </Link>
              </Box>
            </Grid>
          </Grid>
      </Container>
    </>
  );
}

export default VideoListView;
