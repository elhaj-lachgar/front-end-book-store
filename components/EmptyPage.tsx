import Image from 'next/image'
import React from 'react'

function EmptyPage() {
  return (
    <div className='w-full h-full relative'>
        <Image src="/empty.png" alt="search" fill />
    </div>
  )
}

export default EmptyPage
