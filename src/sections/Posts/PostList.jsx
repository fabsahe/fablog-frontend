import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import PostSearch from './PostSearch'
import PostPreview from './PostPreview'
import Loader from '../../components/Loader'
import postService from '../../services/postService'
import { useUserToken, useAuthActions } from '../../store/authStore'
import { useFilteredPosts, usePostActions } from '../../store/postStore'

export default function PostList() {
  // const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)

  const token = useUserToken()
  const posts = useFilteredPosts()
  const { getUserToken } = useAuthActions()
  const { saveAllPosts, saveFilteredPosts } = usePostActions()

  const getAllPosts = async () => {
    try {
      setLoading(true)
      const response = await postService.getAllPosts()
      const { data } = response
      // setPosts(data)
      saveAllPosts(data)
      saveFilteredPosts(data)
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getUserToken()
  }, [])

  useEffect(() => {
    if (token) {
      getAllPosts()
    }
  }, [token])

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
        <Typography variant="h5" sx={{ mb: 2 }}>
          Listado de posts
        </Typography>

        <PostSearch />

        {loading ? (
          <Loader />
        ) : (
          <Grid container spacing={3}>
            {posts && posts.length === 0 ? (
              <Grid item xs={12} md={6} lg={6}>
                <p>No hay posts</p>
              </Grid>
            ) : null}
            {posts &&
              posts.map((post) => <PostPreview key={post.title} post={post} />)}
          </Grid>
        )}
      </Paper>
    </Container>
  )
}
