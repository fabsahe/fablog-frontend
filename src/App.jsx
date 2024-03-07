import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import SnackbarProps from './components/SnackbarProps'
import ProtectedRoutes from './routes/ProtectedRoutes'
import Login from './sections/Login/Login'
import Dashboard from './sections/Dashboard/Dashboard'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <SnackbarProvider {...SnackbarProps}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/:section" element={<Dashboard />} />
            <Route path="/dashboard/:section/:id" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </SnackbarProvider>
  )
}

export default App
