"use client"
import { redirect } from 'next/navigation'
import React from 'react'
import { useLayoutEffect } from 'react'

function RouteAuth({children}:{children : React.ReactNode}) {
  useLayoutEffect(()=>{
    if(window.localStorage.getItem('token'))
        redirect("/")
  },[])
  return (
    <>
    {children}
    </>
  )
}

export default RouteAuth
