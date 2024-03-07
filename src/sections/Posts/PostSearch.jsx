/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import PostPreview from './PostPreview'
import Loader from '../../components/Loader'
import postService from '../../services/postService'
import { useUserToken, useAuthActions } from '../../store/authStore'
import { useAllPosts, usePostActions } from '../../store/postStore'

export default function PostSearch() {
  const [keywords, setKeywords] = useState('')
  const [filter, setFilter] = useState('title')

  const allPosts = useAllPosts()
  const { saveFilteredPosts } = usePostActions()

  const filterPosts = (event) => {
    const newKeywords = event.target.value
    setKeywords(newKeywords)

    const searchResult = allPosts.filter((post) =>
      post[filter].toLowerCase().includes(newKeywords.toLowerCase())
    )
    saveFilteredPosts(searchResult)
  }
  const handleChangeFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <Grid container spacing={2} sx={{ mb: 3 }}>
      <Grid item xs={12} md={6} lg={6}>
        <TextField
          fullWidth
          label="Buscar"
          id="search"
          size="small"
          value={keywords}
          onChange={filterPosts}
        />
      </Grid>

      <Grid item xs={12} md={4} lg={4}>
        <FormControl sx={{ minWidth: 150 }} size="small">
          <InputLabel id="filter-label">Filtrar por</InputLabel>
          <Select
            labelId="filter-label"
            id="filter"
            value={filter}
            label="Filtrar por"
            onChange={handleChangeFilter}
          >
            <MenuItem value="title">Título</MenuItem>
            <MenuItem value="author_name">Autor</MenuItem>
            <MenuItem value="content">Contenido</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}
