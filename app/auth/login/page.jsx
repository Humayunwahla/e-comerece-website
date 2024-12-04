"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
});

const [message, setMessage] = useState('');
    const router = useRouter();


    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
            setMessage('Login successful!');
            setTimeout(() => {
                router.push('/'); // Navigate to a protected route
            }, 1000);
        } else {
            setMessage(data.message || 'Invalid email or password.');
        }
    } catch (error) {
        setMessage('Something went wrong. Please try again.');
    }
};
  return (
    <div className=' items-center mt-32'>
     <div className='justify-items-center'>
      <div className='w-80 h-auto border  justify-items-center rounded-lg'>

      <div className='mt-4'>
        <h1 className='text-2xl font-bold '>Log In </h1>
      </div>
      <form
       className='flex flex-col space-y-5 w-full p-3'
       onSubmit={handleSubmit}
       >
        <div>

        <label className='font-semibold'>Email</label>
        <input
                                type="email"
                                placeholder="Enter Email"
                                name="email"
                                className="w-full h-12 border bg-white p-2 rounded-lg"
                                onChange={handleChange}
                                required
                            />
        </div>
        <div>

        <label className='font-semibold'>Password</label>
        <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                className="w-full h-12 border bg-white p-2 rounded-lg"
                                onChange={handleChange}
                                required
                            />
        </div>
        <div className='text-center '>
        <button
                                type="submit"
                                className="bg-indigo-400 text-white w-full h-12 rounded-xl"
                            >
                                Log In
                            </button>
                        </div>
                        {message && (
                            <p className="text-center text-red-500 mt-2">{message}</p>
                        )}
      </form>
      </div>
     </div>
    </div>
  )
}

export default Login
