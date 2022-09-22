import React from 'react';
import './dashboard.css';
import { BiSearch } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
const Searchbar = () => {
    return ( 
        <div className='search-box'>
             <form>
               <div className='search-field'>
                    <input  type='text'  placeholder='search here..'/>
                    <span><BiSearch/></span>
                </div>
             </form>
             <button className='filter-btn'><FaFilter/>filter</button>
        </div>
     );
}
 
export default Searchbar;
