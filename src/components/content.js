import React from 'react';
import './dashboard.css';
import Profile from '../forms/Profile'
const Content = (props) => {
    const map1={
        'profile':<Profile/>
    }
    return ( 
        <>
        <div className='content'>
            {map1[props.category]}
        </div>
        </>
     );
}
 
export default Content;
