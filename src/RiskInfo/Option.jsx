import React from 'react'

export const Option = ({selectedPanel,setselectedPanel}) => {
  return (
<div className='mt-3'> 
   <nav aria-label="Page navigation example ">
    <ul className="inline-flex items-center -space-x-px">
      
      <li>
        <div onClick={()=>setselectedPanel('population')} className="cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</div>
      </li>
      <li>
        <div onClick={()=>setselectedPanel('imagery')}  className=" cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</div>
      </li>
     
      <li>
        <div  onClick={()=>setselectedPanel('criticalinfrastructure')} className=" cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">3</div>
      </li>
      <li>
        <div onClick={()=>setselectedPanel('hazard')} className=" cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</div>
      </li>
      <li>
       
      </li>
    </ul>
  </nav></div>
  )
}
