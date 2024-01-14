"use client"
import { useState, useEffect } from 'react'
import PaginationDemo from './Pagination'
 
export default function App() {
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])
 
  return <h1>{isClient ? <PaginationDemo/> : null }</h1>
}