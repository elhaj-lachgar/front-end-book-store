"use client"
import React, { useLayoutEffect } from 'react'
import { ADMIN_SIDEBAR_ITEMS } from '@/lib/SideBarItems'
import Link from 'next/link'

function AdminSideBar() {

  return (
    <div className="flex flex-col px-5 gap-y-3"> 
      {
        ADMIN_SIDEBAR_ITEMS.map(ele => (
            <Link className='flex  w-full  hover:bg-blue-200 h-[30px] items-center px-2 cursor-pointer rounded-lg' key={ele.value} href={ele.link}>
                <h1 className='text-muted-foreground w-[100px] font-semibold'>{ele.value}</h1>
                <h1 className='text-red-500'>{"( Admin )"}</h1>
            </Link>
        ))
      }
    </div>
  )
}

export default AdminSideBar
