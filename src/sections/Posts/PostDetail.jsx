/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { useAllPosts } from '../../store/postStore'

export default function PostDetail() {
  const params = useParams()
  const navigate = useNavigate()

  const postId = parseInt(params.id, 10)
  const postList = useAllPosts()

  const post = postList.find((item) => item.id === postId)

  useEffect(() => {
    if (postList.length === 0) {
      navigate('/dashboard/posts')
    }
  }, [])

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Paper
        sx={{
          px: 2,
          pt: 2,
          pb: 5,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {post && (
          <>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {post.title}
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={8}>
                <Typography variant="subtitle1" color="text.secondary">
                  {post.publication_date.substring(0, 10)}, por{' '}
                  <span>{post.author_name}</span>
                </Typography>

                <Typography variant="body1" paragraph>
                  {post.content}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <img src={post.img_url} alt="post.title" />
              </Grid>
            </Grid>
          </>
        )}
      </Paper>
    </Container>
  )
}
