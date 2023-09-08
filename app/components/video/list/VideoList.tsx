import React from "react";
import ErrorNotFound from 'components/error/not-found';
import Button from '@mui/material/Button';
import { 
  Card, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  Chip, 
  Grid, 
  Stack, 
  Typography 
} from "@mui/material";
import Link from "next/link";

function VideoListView({
  data, 
  error, 
  loading,
  loadMore,
  loadingMore,
  handleLoadMore,
  handleRemoveCollection,
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
            slug,
            videoCollections,
            videoCategories
          }: any, k: number) => (
            <Grid 
              sx={{
                position: 'relative'
              }}
              item lg={4} xl={4} xs={4} sm={4} md={4} key={uuid}>
              <Card>
                <input
                  className="form-control"
                  type={'checkbox'}
                  id={`fiel-videos--${k}`}
                  onChange={() => handleChange(uuid)}
                  value={uuid}
                  style={{
                    position: 'absolute',
                    zIndex: 10
                  }}
                />
                <CardActionArea>
                  <Link
                    id={`card-video--${slug}`}
                    href={`/video/${slug}`}
                    title="Account"
                    className="footer-icon-wrap font-weight-normal btn-transparent d-flex flex-column text-center align-items-center cursor-pointer small text-gray"
                  >
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
                      <Grid
                        item
                        sx={{
                          display: 'flex',
                          marginTop: 2
                        }}
                        justifyContent={'start'}
                        alignContent={'center'}
                        columnSpacing={1}
                      >
                        <Stack direction="row" spacing={1}>
                          {videoCategories && videoCategories.length ? 
                            videoCategories.map(({categoryUuid, uuid}: any) => (
                              categoryUuid?.title ? (<Chip 
                                key={uuid}
                                label={categoryUuid.title} 
                              />) : 
                              null
                            )) 
                          : null}
                        </Stack>
                      </Grid>
                      <Grid
                        item
                        sx={{
                          display: 'flex',
                          marginTop: 1
                        }}
                        justifyContent={'start'}
                        alignContent={'center'}
                        columnSpacing={1}
                      >
                        <Stack direction="row" spacing={1}>
                          {videoCollections && videoCollections.length ? 
                            videoCollections.map(({ uuid: uuidc, collectionUuid}: any) => 
                            uuidc && collectionUuid?.title ? (
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
                    </CardContent>
                  </Link>
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
