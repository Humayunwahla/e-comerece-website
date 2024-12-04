"use client";


import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Signup() {
    const [formData, setFormData] = useState({
        name:'',
        phone:'',
        email:'',
        password:''
    })
    const [message, setMessage] = useState(" ");
    const router = useRouter()
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormData((prev)=>({ ...prev, [name]: value}))
    }

    const handleSubmit= async(e)=>{
    e.preventDefault();
    try {
        const response = await fetch('/api/signup',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body:   JSON.stringify(formData)
        });
        const data = await response.json();
        setMessage(data.message)
        if(data.message === "User register successfully."){
            router.push('/')
        }
    } catch (error) {
        setMessage("Something went Wrong. Please try again")
    }
    
   
    
    }
    return (
        <div className=' items-center mt-32'>
            <div className='justify-items-center'>
                <div className='w-80 h-auto border  justify-items-center rounded-lg'>

                    <div className='mt-4'>
                        <h1 className='text-2xl font-bold '>Sign up </h1>
                    </div>
                   

                    <form className='flex flex-col space-y-5 w-full p-3'
                    onSubmit={handleSubmit}
                    >
                        <div>

                            <label className='font-semibold'>Name</label>
                            <input type="text" 
                             name="name" 
                             placeholder='Name' 
                             className='w-full h-12 border bg-white p-2 rounded-lg '
                             onChange={handleChange}
                             required />
                        </div>
                       
                            <div>

                                <label className='font-semibold'>Phone</label>
                                <input type="number"
                                 placeholder='Phone'
                                  className='w-full h-12 border bg-white p-2 rounded-lg '
                                  name="phone"
                                  onChange={handleChange}
                                  required />
                            </div>
                         <div>
                            <label className='font-semibold'>Email</label>
                            <input type="email"
                             placeholder='Enter Email'
                              className='w-full h-12 border bg-white p-2 rounded-lg ' 
                              name="email"
                              onChange={handleChange}
                required/>
                        </div>
                        <div>

                            <label className='font-semibold'>Password</label>
                            <input type="password"
                             placeholder='Password'
                              className='w-full h-12 border bg-white p-2 rounded-lg '
                              name="password"
                              onChange={handleChange}
                required />
                        </div>
                        <div className='text-center '>
                            <button
                            type="submit"
                             className='bg-indigo-400 text-white w-full h-12 rounded-xl'>Sign up</button>
                        </div>
                        {message && <p className="text-center text-red-500">{message}</p>}
                    </form>
                  
                </div>
            </div>
        </div>
    )
}

export default Signup
