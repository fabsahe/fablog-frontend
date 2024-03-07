import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useAuth } from '../../context/AuthContext'

const validationSchema = yup.object({
  email: yup
    .string('Ingresar correo electrónico')
    .email('El correo electrónico no es válido')
    .required('El correo electrónico es requerido'),
  password: yup
    .string('Ingresar contraseña')
    .min(7, 'La contraseña debe tener al menos 7 caracteres')
    .required('La contraseña es requerida')
})

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Hecho por FSH - '}
      {new Date().getFullYear()}.
    </Typography>
  )
}

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState('')

  const { login } = useAuth()

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: 'admin@fablog.test',
      password: 'secreto'
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await login(values)
        navigate('/dashboard')
      } catch (error) {
        console.log(error)
        setErrorMessage('Credenciales no válidas')
      }
    }
  })

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {errorMessage && (
          <Alert severity="error">
            El correo o la contraseña son incorrectos
          </Alert>
        )}
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingresar
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="off"
            autoFocus
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
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recordarme"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Ingresar
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  )
}
