import React from 'react'
import Image from 'next/image'

function Logo() {
  return (
    <Image
        src={"/logo.svg"}
        alt='logo of site'
        width={130}
        height={130}
    />
  )
}

export default Logo