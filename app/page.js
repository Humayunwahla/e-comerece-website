import Image from 'next/image'
import HomeSection from './component/HomeSection'
import About from './component/about/page'

export default function Home() {
  return (
    <div className='text-center  bg-gray-300 pb-6 h-screen '>
    <div className='pt-5'>
    <HomeSection/>
   
    </div>
    
    </div>
   
  )
}
