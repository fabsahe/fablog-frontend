import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import SnackbarProps from './utils/SnackbarProps'
import Login from './sections/Login/Login'

function App() {
  return (
    <SnackbarProvider {...SnackbarProps}>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </SnackbarProvider>
  )
}

export default App
