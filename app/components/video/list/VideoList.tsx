import React from "react";
import ErrorNotFound from 'components/error/not-found';
import Button from '@mui/material/Button';
import { Card, CardActionArea, CardContent, CardMedia, Chip, Grid, Typography } from "@mui/material";
import { createUniqueKey } from "utils/createUniqueKey";

function VideoListView({
  data, 
  error, 
  loading,
  loadMore,
  loadingMore,
  handleLoadMore,
  handleChange
}: any) {

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message ? error.message : 'Error'}</p>;
  if (!data || !data.getVideos || 
    !data.getVideos.items || data.getVideos.items.length === 0) {
    return <ErrorNotFound />;
  }
  return (
    <>
      <Grid 
        container 
        rowSpacing={3} 
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
        justifyContent="start"
        alignItems="start"
      >
        {
          data.getVideos.items.map(({ 
            uuid,
            title, 
            description, 
            image, 
            videoCategories
          }: any, k: number) => (
            <Grid item lg={4} xl={4} xs={4} sm={4} md={4} key={uuid}>
              <input
                className="form-control"
                type={'checkbox'}
                id={`fiel-videos--${k}`}
                onChange={() => handleChange(uuid)}
                value={uuid}
              />
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${image}`}
                    alt={title}
                  />
                  <CardContent
                    sx={{ 
                      overflow: 'hidden'
                    }}
                  >
                    <Typography gutterBottom variant="h5" component="div">
                      {title}
                    </Typography>
                    <Grid
                      container
                      sx={{
                        display: 'flex',
                      }}
                      justifyContent={'start'}
                      alignContent={'center'}
                      columnSpacing={1}
                      rowSpacing={1}
                    >
                      {videoCategories && videoCategories.length ? 
                        videoCategories.map((el: string) => (
                        <Grid item key={createUniqueKey()}>
                          <Chip label={el} />
                        </Grid>
                        )) 
                      : '-'}
                    </Grid>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                      color="text.secondary">
                      {description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        }
      </Grid>
      <Grid 
        container 
        rowSpacing={1} 
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
        justifyContent="center"
        alignItems="start"
        sx={{
          marginTop: 5
        }}
      >
        {loadMore && data.getVideos.hasMore && (
          <Button 
            variant="outline"
            onClick={handleLoadMore}
            disabled={loading || loadingMore}
          >
            { loading || loadingMore ? 'Loading' : 'Load More' }
          </Button>
        )}
      </Grid>
    </>
  );
}

export default VideoListView;
