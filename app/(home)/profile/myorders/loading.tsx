import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function loading() {
  return (
    <div className="absolute w-full  lg:relative lg:w-8/12  flex justify-center mt-20 ">
      <Skeleton className="w-11/12 flex flex-col px-3 py-4 border rounded-md gap-y-3 shadow-md h-[250px]"/>
    </div>
  )
}

export default loading
