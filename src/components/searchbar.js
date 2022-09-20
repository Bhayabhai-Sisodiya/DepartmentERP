import React from 'react';
import './dashboard.css';

const Searchbar = () => {
    return ( 
        <div className='search-box'>
             <form>
             <div className='input-field'>
                    <input  type='text' name='title' placeholder='search here'/>
                </div>
             </form>
        </div>
     );
}
 
export default Searchbar;
