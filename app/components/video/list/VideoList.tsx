import React from "react";
import ErrorNotFound from 'components/error/not-found';
import Button from '@mui/material/Button';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, Grid, Typography } from "@mui/material";

function VideoListView({
  data, 
  error, 
  loading,
  loadMore,
  loadingMore,
  handleLoadMore,
  handleCollection
}: any) {

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message ? error.message : 'Error'}</p>;
  if (!data || !data.videos || !data.videos.items || data.videos.items.length === 0) {
    return <ErrorNotFound />;
  }
  return (
    <>
      <Grid 
        container 
        rowSpacing={3} 
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
        justifyContent="center"
        alignItems="start"
      >
        {
          data.videos.items.map(({ id, slug, title, description, image, categories }: any) => (
            <Grid item lg={4} xl={4} xs={4} sm={4} md={4} key={id}>
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
                      {categories && categories.length ? 
                        categories.map(({title: titlec, id: idc}: any) => (
                        <Grid item lg={4} xl={4} xs={6} md={4} key={idc}>
                          <Chip label={titlec} />
                        </Grid>
                        )) 
                      : '-'}
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
                <CardActions>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleCollection(slug)}
                  >
                    Add Collection
                  </Button>
                </CardActions>
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
        {loadMore && data.videos.hasMore && (
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
