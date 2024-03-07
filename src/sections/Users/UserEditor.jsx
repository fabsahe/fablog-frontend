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
import userService from '../../services/userService'
import Loader from '../../components/Loader'
import { useUserToken, useAuthActions } from '../../store/authStore'

const validationSchema = yup.object({
  name: yup.string('Nombre').required('El nombre es requerido'),
  email: yup
    .string('Correo electrónico')
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es requerido'),
  password: yup
    .string('Contraseña')
    .min(7, 'La contraseña debe tener al menos 7 caracteres')
    .required('La contraseña es requerida'),
  role: yup.string('Rol').required('El rol es requerido')
})

// eslint-disable-next-line react/prop-types
export default function UserEditor() {
  const [editorRoleId, setEditorRoleId] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const token = useUserToken()
  const { getUserToken } = useAuthActions()

  const { enqueueSnackbar: noti } = useSnackbar()
  const navigate = useNavigate()

  const submitButtonText = 'CREAR USUARIO'

  const createNewUser = async (userData) => {
    try {
      const response = await userService.createNewUser(token, userData)
      if (response.status === 'OK') {
        noti('Usuario creado', NOTI_SUCCESS)
        navigate('/dashboard/users')
      }
    } catch (error) {
      noti(error.mesage, NOTI_ERROR)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      const newUser = {
        name: values.name,
        email: values.email,
        password: values.password,
        roleId: values.role
      }
      setSaving(true)
      await createNewUser(newUser)
      setSaving(false)
    }
  })

  const getEditorRole = async () => {
    try {
      setLoading(true)
      const response = await userService.getEditorRole(token)
      const { data } = response
      setEditorRoleId(data.id)
      formik.values.role = data.id
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
      getEditorRole()
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
          Nuevo usuario
        </Typography>

        {loading ? (
          <Loader />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={6}>
              <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Nombre"
                  name="name"
                  autoComplete="off"
                  autoFocus
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Correo electrónico"
                  name="email"
                  autoComplete="off"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />

                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="off"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />

                <FormControl
                  fullWidth
                  margin="normal"
                  error={formik.touched.role && formik.errors.role}
                >
                  <InputLabel id="author-label">Rol</InputLabel>
                  <Select
                    labelId="author-label"
                    id="role"
                    name="role"
                    label="Rol"
                    value={formik.values.role}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <MenuItem value={editorRoleId}>Editor</MenuItem>
                  </Select>
                  {formik.touched.role && formik.errors.role && (
                    <FormHelperText error>{formik.errors.role}</FormHelperText>
                  )}
                </FormControl>

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
