import React from 'react'
import { Navbar } from '../../common'

const DefaultLayout = (props) => {
  return (
    <div className='flex flex-col bg-black h-lvh'>
        <Navbar/>
        <div className='flex-1 bg-slate-300'>{props.children}</div>
    </div>
  )
}

export default DefaultLayout
