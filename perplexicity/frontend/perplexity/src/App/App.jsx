import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './app.route'
import { UseAuth } from '../features/auth/auth_hook/Auth.hook'
const App = () => {
  const {handelgetme} =UseAuth()
  
  useEffect(()=>{
     handelgetme()
       
  },[])
  return (
    <RouterProvider router={router} />
  )
}

export default App