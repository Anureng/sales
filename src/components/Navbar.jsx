import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'

function Navbar() {
  return (
    <div className=' bg-gray-400 flex items-center p-2  justify-around'>
        <div className='text-xl font-mono'>
            Track Order
        </div>
        <div>
        <ConnectButton/>
        </div>
    </div>
  )
}

export default Navbar