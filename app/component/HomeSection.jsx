import React from 'react'
import workplace from '../assets/workplace.png'
import Image from 'next/image'

function HomeSection() {
  return (
    <div>
     <div>
        <h1 className='text-5xl font-bold mt-7 '>This is the Home Page</h1>
     </div>
     <div className='grid grid-cols-2 justify-between pt-10 px-4'>
        <div className=' mx-auto text-center mt-32'> 
          <h1 className='text-3xl mb-4 font-bold'>This is it&apos;s main Heading</h1>
          <p className='text-left'>Welcome to our platform! We strive to provide a seamless experience, offering tools and resources to meet your needs. Explore our features, stay updated, and connect with a community that shares your interests. Start your journey with us today!</p>
        </div>
        <div className='mx-auto'>
         <Image src={workplace} alt=""  height={400} />
        </div>
     </div>
    </div>
  )
}

export default HomeSection
