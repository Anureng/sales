import React from 'react'
import { BsGithub, BsLinkedin,BsTwitter} from 'react-icons/bs';
function Footer() {
  return (
    <div className='font-mono bg-gray-400 flex items-center justify-center p-6 text-xl'>
        <div className='flex flex-col space-y-4 items-center justify-center'>
            <div>
                If you like this poject ⭐ my repository
            </div>
            <div className='flex space-x-4'>
                <a href="https://github.com/Anureng">
                <BsGithub/>
                </a>
                <a href="https://www.linkedin.com/in/anurag-sidhu-4b518521b/">
                    <BsLinkedin/>
                </a>
                <a href="https://twitter.com/anurag_sidhu8">
                    <BsTwitter/>
                </a>
            </div>
        </div>
    </div>
  )
}

export default Footer