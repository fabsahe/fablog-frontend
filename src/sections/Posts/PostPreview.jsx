/* eslint-disable react/prop-types */
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

function PostPreview(props) {
  const { post } = props

  return (
    <Grid item xs={12} md={6} lg={6}>
      <CardActionArea
        component={RouterLink}
        to={`/dashboard/post-detail/${post.id}`}
      >
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.title}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ my: 0.5 }}
            >
              {post.publication_date.substring(0, 10)}, por{' '}
              <span>{post.author_name}</span>
            </Typography>
            <Typography variant="body1" paragraph>
              {post.content.substring(0, 70)} ...
            </Typography>
            <Typography variant="subtitle2" color="primary">
              Ver post...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.img_url}
            alt={post.title}
          />
        </Card>
      </CardActionArea>
    </Grid>
  )
}

export default PostPreview
