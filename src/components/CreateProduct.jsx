import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contracts/contract'
import Image from 'next/image'
import React, { useState } from 'react'
import { usePrepareContractWrite, useContractWrite } from 'wagmi'

function CreateProduct() {
  const [name, setName] = useState()
  const [productAddress, setProductAddress] = useState()
  const { config, error } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'createProduct',
    args:[name,productAddress],
    onSuccess(data) {
      console.log('Success', data)
    },
  })
  const { write } = useContractWrite(config)

  return (
    <div className=' bg-gray-400 font-mono flex items-center justify-center h-full p-28'>
        <div className=' w-fit flex flex-col lg:flex-row justify-center items-center lg:space-x-24 space-y-6'>
        <div>
                <Image src="/create.png" width={400} height={400}/>
            </div>
            <div className='border border-black w-96 p-2 space-y-4 rounded-xl'>
                <div className='text-xl ml-24 '>Create Product</div>
                <div className='flex flex-col space-y-4'>
                    <input type="text" onChange={(e)=>setName(e.target.value)} className=' text-gray-400 focus:outline-none px-1 py-2 rounded-xl bg-[#112642]'  placeholder='Enter Your Product Name...'/>
                    <input type="text" onChange={(e)=>setProductAddress(e.target.value)} className='text-gray-400 px-1 focus:outline-none py-2 rounded-xl bg-[#112642]' placeholder='ENTER Deliver Address...' />
                    <button disabled={!write} onClick={() => write?.()} className="bg-white w-40 ml-24 px-1 py-2 rounded-xl">create Product</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateProduct