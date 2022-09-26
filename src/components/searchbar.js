import React from 'react';
import './dashboard.css';
import { BiSearch } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
const Searchbar = ({value,onChange}) => {
    return ( 
        <div className='search-box'>
             
               <div className='search-field'>
                    <input 
                    name="query" 
                    value={value} 
                    onChange={e=>onChange(e.target.value)}
                    type='text'  placeholder='search by faculty/author/co-author.'/>
                    <span><BiSearch/></span>
                </div>
          
             <button className='filter-btn'><FaFilter/>filter</button>
        </div>
     );
}
 
export default Searchbar;
