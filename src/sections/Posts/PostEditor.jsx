import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import LoadingButton from '@mui/lab/LoadingButton'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import FormHelperText from '@mui/material/FormHelperText'
import SaveIcon from '@mui/icons-material/Save'
import { useSnackbar } from 'notistack'
import { NOTI_SUCCESS, NOTI_ERROR } from '../../constants/notiConstants'
import postService from '../../services/postService'
import userService from '../../services/userService'
import Loader from '../../components/Loader'
import { useUserToken, useAuthActions } from '../../store/authStore'

const validationSchema = yup.object({
  title: yup.string('Título').required('El título es requerido'),
  author: yup.string('Autor').required('El autor es requerido'),
  content: yup.string('Contenido').required('El contenido es requerido')
})

// eslint-disable-next-line react/prop-types
export default function PostEditor() {
  const [userList, setUserList] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const token = useUserToken()
  const { getUserToken } = useAuthActions()

  const { enqueueSnackbar: noti } = useSnackbar()
  const navigate = useNavigate()

  const submitButtonText = 'CREAR POST'

  const getUsers = async () => {
    try {
      setLoading(true)
      const response = await userService.getAllUsers(token)
      const { data } = response
      setUserList(data)
      setLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  const createNewPost = async (postData) => {
    try {
      const response = await postService.createNewPost(token, postData)
      if (response.status === 'OK') {
        noti('Post creado', NOTI_SUCCESS)
        navigate('/dashboard/posts')
      }
    } catch (error) {
      noti(error.mesage, NOTI_ERROR)
    }
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      currentDate: new Date().toISOString().slice(0, 10),
      content: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      const newPost = {
        title: values.title,
        author: values.author,
        date: values.currentDate,
        content: values.content
      }
      setSaving(true)
      await createNewPost(newPost)
      setSaving(false)
    }
  })

  useEffect(() => {
    getUserToken()
  }, [])

  useEffect(() => {
    if (token) {
      getUsers()
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
          Nuevo post
        </Typography>

        {loading ? (
          <Loader />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={8} lg={8}>
              <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="title"
                  label="Título"
                  name="title"
                  autoComplete="off"
                  autoFocus
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />

                <FormControl
                  fullWidth
                  margin="normal"
                  error={formik.touched.author && formik.errors.author}
                >
                  <InputLabel id="author-label">Autor</InputLabel>
                  <Select
                    labelId="author-label"
                    id="author"
                    name="author"
                    label="Autor"
                    value={formik.values.author}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {userList &&
                      userList.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                          {user.name}
                        </MenuItem>
                      ))}
                  </Select>
                  {formik.touched.author && formik.errors.author && (
                    <FormHelperText error>
                      {formik.errors.author}
                    </FormHelperText>
                  )}
                </FormControl>

                <TextField
                  margin="normal"
                  id="current-date"
                  label="Fecha"
                  type="text"
                  name="currentDate"
                  value={formik.values.currentDate}
                  onChange={formik.handleChange}
                  InputProps={{
                    readOnly: true
                  }}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  id="content"
                  label="Contenido"
                  multiline
                  rows={5}
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.content && Boolean(formik.errors.content)
                  }
                  helperText={formik.touched.content && formik.errors.content}
                />

                <LoadingButton
                  loading={saving}
                  loadingPosition="start"
                  startIcon={<SaveIcon />}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {submitButtonText}
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        )}

        <Box sx={{ mt: 1 }} />
        <Divider />
        <Box sx={{ my: 1 }} />
      </Paper>
    </Container>
  )
}
