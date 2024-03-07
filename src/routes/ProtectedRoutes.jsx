import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

/* eslint-disable no-unused-vars */
export default function ProtectedRoute(props) {
  const loggedUserJSON = window.localStorage.getItem('loggedFablogUser')

  return loggedUserJSON ? <Outlet /> : <Navigate to="/" />
}
