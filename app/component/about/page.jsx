"use client"
import React, { useState } from 'react'
import productsData from '../../../data/products.json'

function About() {
  const [items, setItems] = useState([])
  const addproduct = (product) => {
    setItems((prevItems) => [...prevItems, product])
  }
  const remove=(itemtoremove)=>{
    setItems((prevItems)=>
    prevItems.filter((item)=> item!== itemtoremove))
  }
  return (
    <div className='bg-slate-200 h-screen text-center p-9 '>


      <div className='flex flex-col '>
        <h1 className=' text-xl font-bold '>

          Available Products
        </h1>
        <ul className=' grid grid-cols-8 gap-3 mt-9'>
          {productsData.products.map((product, index) => (
            <li key={index} className='space-y-3 border border-black rounded-lg p-2 '>
              <h1 className='text-lg font-bold'> {product.name}</h1>
              <button className='bg-indigo-600 text-white h-12 w-28 rounded-lg'
                onClick={() => addproduct(product)}>Pay ${product.price}</button>
            </li>
          ))}
        </ul>
      </div>

      <div className='mt-10 flex flex-col'>
        <h2 className='text-xl font-bold '>Selected Items</h2>
        <ul className=' border border-b-2 flex items-center gap-5 mt-5 justify-center'>
          {items.map((item, index) => (
            <li key={index} className='text-lg w-44 h-20 rounded-lg border border-black '>
           <span className='ml-36 text-red-700 cursor-pointer'
           onClick={()=>remove(item)}
           >x</span>   <h1>{item.name} - ${item.price} </h1>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default About
