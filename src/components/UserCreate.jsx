import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contracts/contract'
import Image from 'next/image'
import React, { useState,useEffect } from 'react'
import { usePrepareContractWrite, useContractWrite,useContractRead,useAccount } from 'wagmi'


function UserCreate() {
  const [name, setName] = useState()
  const [namedata, setNamedata] = useState()
  const { address, isConnecting, isDisconnected } = useAccount()

  const { config, error } = usePrepareContractWrite({
    address:CONTRACT_ADDRESS ,
    abi: CONTRACT_ABI,
    functionName: 'createUser',
    args:[name],
    onSuccess(data) {
      console.log('Success', data)
    },
  })
  const { write } = useContractWrite(config)
  const { data, isError, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'AllUser',
    args:[address]
  })
  console.log(data);
  useEffect(() => {
    setNamedata(data)
  }, [data])
  
  const styling = {
    backgroundImage: `url('/one.jpg')`,
    backgroundRepeat:"no-repeat" ,
    backgroundSize:"cover"
}
  return (
    <div className='h-screen font-mono text-white flex  justify-center items-center bg-cover flex-col space-y-4 lg:flex-row lg:space-x-16' style={styling}>
    
      <div className=' bg-gray-400 text-[#112642] w-fit p-3 rounded-xl h-fit border border-black space-y-4 '>
        <div className='text-xl'>Add User</div>
        <div className='space-x-4'>
          <input type="text" onChange={(e)=>setName(e.target.value)} className='rounded-xl transition-shadow px-1 py-2 focus:outline-none text-[#112642] '  placeholder='enter your name...' />
          <button className=' bg-[#112642]  text-white rounded-xl hover:bg-gray-300 hover:text-[#112642] px-1 py-2 '  disabled={!write} onClick={() => write?.()}>Enter Username</button>
        </div>
      </div>
      <div className='text-[#112642] bg-gray-400 px-2 py-3 rounded-xl w-fit lg:mb-10' >
    {/* Hello { CheckIfWalletConnected ? (<div>{data.name}</div>):(<div>User is not create</div>)} */}
 {/* {data.map((el)=>(
  <div key={el.id}>
    hello {el}
  </div>
 ))} */}
 {namedata ?(<div>Hello {namedata}</div>) :(<div>User is not created</div>)}
      </div>
    </div>
  
  )
}

export default UserCreate