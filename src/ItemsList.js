import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';

const ItemsList = ({items,handleCheck,handleDelete}) => {
  return (
    <>
    {(items.length) ?(
    <ul>
      {items.map((item) =>(
        <li className='item' key={item.id}>
          <input 
          type="checkbox"
          onChange={() =>handleCheck(item.id)}
          checked ={item.checked} 
          />
          <label
          style={(item.checked)?{textDecoration:'line-through'} : null}
          onClick={() =>handleCheck(item.id)}>{item.item}</label>
         <FaTrashAlt
         role="button"
         onClick={() => handleDelete(item.id)} 
         />
        </li>
      ))}
    </ul>
    ) : (
      <p>your list is empty</p>
    )
}  
   </>  
  )
}

export default ItemsList