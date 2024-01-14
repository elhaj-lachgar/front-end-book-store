"use client"
import React from 'react'
import { useLayoutEffect } from 'react'
import { redirect } from 'next/navigation'
function PrivateRoute({children}:{children:React.ReactNode}) {
  useLayoutEffect(()=>{
        if(!window.localStorage.getItem('user') || !window.localStorage.getItem('token'))
            redirect('/')
  },[])
  return (
    <>
    {children}
    </>
  )
}

export default PrivateRoute
