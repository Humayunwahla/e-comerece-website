import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <section className='bg-slate-800 py-9 text-white '>
        <nav  className='flex justify-between  px-6'>
            <div>

                <h1>logo</h1>
            </div>
            <div className='flex gap-6'> 
                <Link href="/"><h1>Home</h1></Link>
                <Link href="/component/about"><h1>About</h1></Link>
                <h1>Contact</h1>
            </div>
            <div className='flex gap-6'>
             <Link href="/auth/login"><h1>Login</h1></Link>
              <Link href='/auth/signup'>  <h1>Sign up</h1></Link>
            </div>
        </nav>
    </section>
  )
}

export default Header
