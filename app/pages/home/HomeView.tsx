import { Grid } from '@mui/material'
import { Box, Container } from '@mui/system'
import VideoList from 'components/video/list'

export default function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <VideoList
        type={'tv'}
        fetchLimit={10}
        loadMore={true}
      />
    </Container>
  )
}
