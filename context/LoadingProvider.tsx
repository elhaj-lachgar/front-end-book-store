"use client"
import { LaodingContext } from './LoadingContext'
import React, { useEffect, useState } from 'react'


function LoadingProvider({children}:{children:React.ReactNode}) {
  let [ Loading , setLoading ] = useState<boolean>(false);
  return (
    <LaodingContext.Provider value={{Loading ,setLoading}}>
        {children}
    </LaodingContext.Provider>
  )
}

export default LoadingProvider
