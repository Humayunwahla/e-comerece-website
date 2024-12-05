"use client"
import React, { useState } from 'react'
import productsData from '../../../data/products.json'

function About() {
  const [items, setItems] = useState([])
  const [message, setMessage] = useState("");
  const addproduct = (product) => {
    setItems((prevItems) => [...prevItems, product])
  }
  const remove=(itemtoremove)=>{
    setItems((prevItems)=>
    prevItems.filter((item)=> item!== itemtoremove))
  }
  const addProductToDB = async () => {
    if (items.length === 0) {
      setMessage("No items selected to add.");
      return;
    }

    try {
      const response = await fetch("/api/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: items }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setItems([]); // Clear the cart after successful addition
      } else {
        setMessage(data.message || "Failed to add products.");
      }
    } catch (error) {
      console.error("Error adding products:", error);
      setMessage("An error occurred while adding products.");
    }
  };

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

      <div className='mt-8'>
        <button className='bg-indigo-600 text-white h-12 w-28 rounded-lg'
        onClick={addProductToDB}
        >Add Product</button>
      </div>
      {message && (
        <div className="mt-5">
          <p className="text-red-600">{message}</p>
        </div>
      )}
    </div>
  )
}

export default About
