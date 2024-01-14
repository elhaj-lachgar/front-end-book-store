import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function loading() {
  return (
    <div className="flex flex-col lg:flex-row w-11/12 mx-auto lg:w-9/12 mt-10 gap-5">
      <Skeleton className="flex flex-col px-2 lg:px-5 py-4 border shadow rounded-md gap-y-4 lg:w-[60%] md:h-[400px] h-[200px]"/>
      <Skeleton className="flex flex-col gap-y-4 border py-4 px-2 lg:px-5 text-muted-foreground rounded-md lg:w-[30%] shadow-md md:h-[400px] h-[200px]"/>
    </div>
  )
}

export default loading
