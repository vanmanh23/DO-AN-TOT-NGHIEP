import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Component() {
  return (
    <div className='relative w-screen min-h-screen flex flex-row items-center justify-center'>
      <Outlet />
      </div>
  )
}
