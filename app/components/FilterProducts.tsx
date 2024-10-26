"use client"
import React, { useState } from 'react'
import Input from './ui/Input'

const FilterProducts = () => {
    const [maxPrice, setMaxPrice] = useState(1000)
    const [sort , setSort] = useState<string | null>(null)
  return (
    <>
    <div className="left">
    <div className='filterItem'>
    <h2>Filter Categories</h2>
    <div className='inputItem'>
    <input type='checkbox' id='1' value={1}/>
       <label htmlFor='1'>Shoes</label>
       
    </div>
    <div className='inputItem'>
    <input type='checkbox' id='2' value={2}/>
       <label htmlFor='2'>T-Shirts</label>
       
    </div>
    <div className='inputItem'>
    <input type='checkbox' id='3' value={3}/>
       <label htmlFor='3'>Coats</label>
      
    </div>
    </div>

    <div className="filterItem">
        <h2>Filter By Price</h2>
        <div className="inputItem">
            <span>0</span>
            <Input type='range' min={0} max={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value))}/>
            <span>1000</span>
        </div>
    </div>
    <div className="filterItem">
        <h2>Sort By </h2>
        <div className="inputItem">
            <Input type='radio' id='asc' value={"asc"} name='price' onChange={(e) => setSort("asc")}/>
            <label htmlFor='asc'>Price (Lowest First)</label>
        </div>
        <div className="inputItem">
            <Input type='radio' id='desc' value={"desc"} name='price' onChange={(e) => setSort("desc")}/>
            <label htmlFor='desc'>Price (Highest First)</label>
        </div>
    </div>

  </div>
</>
  
  )
}

export default FilterProducts

