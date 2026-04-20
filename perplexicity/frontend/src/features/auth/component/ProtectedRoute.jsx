import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, replace } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.Auth)

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute