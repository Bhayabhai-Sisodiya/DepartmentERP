import React, {useState} from 'react';
import './dashboard.css';
import { BiSearch } from "react-icons/bi";
import { FaFilter } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";


const Searchbar = ({value,onChange,filterItem,onFilter}) => {

    //onclick filter button - dropdown-menu
    const [ShowDropDown,setShowDropDown] = useState(false) ;
    const handleDropdown=()=>{
        setShowDropDown(!ShowDropDown)
    }

    
    return ( 
        <div className='search-box'>

            {/* search field (search by faculty/author/co-author...) */}
            <div className='search-field'>
                <input name="query" value={value} onChange={e=>onChange(e.target.value)} type='text' 
                 placeholder='search by faculty/author/co-author...'/> <span><BiSearch/></span>
            </div>
        
            {/* filter button */}
            <button className='filter-btn' onClick={handleDropdown}><FaFilter />filter</button> 

            {/* filter button show drop-down menu */}
             {ShowDropDown?
                <div className='dropdown-menu'>
                    <div className='close-btn' onClick={() =>setShowDropDown(false)}><AiOutlineClose/></div>
                    <div className='filter-options'>
                        {filterItem.map((x) => {
                        return <label><input type="checkbox" onChange={() => onFilter(x)} />{x.name}</label>
                        })}
                    </div>
                    <button className='filter-submit-btn' onClick={() =>{setShowDropDown(false)}}>search</button>
                </div>        
             :null} 
        </div> 
     );
}
 
export default Searchbar;
