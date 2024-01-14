import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function loading() {
  return (
    <div className="flex justify-center items-center w-full min-h-[100vh]  bg-gray-100">
      <Skeleton className=" w-11/12 lg:w-[400px] flex flex-col px-2 lg:px-5 gap-y-3 border h-[350px] rounded-xl py-4 bg-white"/>
    </div>
  )
}

export default loading
