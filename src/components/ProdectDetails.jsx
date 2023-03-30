import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/contracts/contract'
import React, { useEffect, useState } from 'react'
import { useContractRead ,useContractWrite,usePrepareContractWrite} from 'wagmi'
function ProdectDetails() {
const [productData, setProductData] = useState([{
    name:'',
    id:0,
    creator:'',
    currentOwner:'',
    deliveryAddress:'',
    delivered:false
}])
const [enterProductId, setEnterProductId] = useState()
const [deliveredAddress, setDeliveredAddress] = useState()
    const { data, isError, isLoading } = useContractRead({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'getProduct',
        args:[enterProductId]
      })
      useEffect(() => {
        setProductData(data)
        console.log("Got the data");
      }, [data])


      console.log(data);
      const productDetailsKeys = ["name", "id", "creator", "currentOwner", "deliveryAddress", "delivered"]
      

      const { config, error } = usePrepareContractWrite({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'markProductDelivered',
        args:[deliveredAddress]
      })
      const { write } = useContractWrite(config)


  return (
    <div className=' bg-[#112642]  flex justify-center items-center font-mono '>
        <div className='w-fit flex flex-col lg:flex-row space-y-8  lg:space-x-32 items-center p-10'  >
            <div className='rounded-xl w-fit p-4 text-lg space-y-4 bg-gray-400'>
                <div className='border-b border-black space-y-3'>
               <div>
                All Contract Product Details
                </div> 
                <input type="number" className=' px-1 py-2 rounded-xl' onChange={(e)=>setEnterProductId(e.target.value)} placeholder='enter id '  />
                </div>
                    {data  ? data.map((val, idx) => {
                        val = ((typeof val === "boolean") && val === true) ? "true" : ((typeof val === "boolean")   && val === false)? "false" : val 
                        return (<ul key={val.id} className='text-[#112642]'>
                        <li>{productDetailsKeys[idx]}: {typeof val  === "object" ?  val["_hex"][val["_hex"].length -1] :  val }</li>
                    </ul>)
                    }) : <div>Account not connected</div>}

            </div>
            <div className='rounded-xl w-fit h-fit p-4 bg-gray-400 space-y-4'> 
                <div>
                    Delivered Address 
                </div>
                <div className='space-x-4'>
                    <input type="number" onChange={(e)=>setDeliveredAddress(e.target.value)} className='px-2 py-2 rounded-xl'  placeholder='Enter Id' />
                    <button className='bg-white px-1 py-2 rounded-xl' disabled={!write} onClick={() => write?.()}>Click</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProdectDetails