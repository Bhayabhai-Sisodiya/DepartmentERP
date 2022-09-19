import React, { useState } from 'react';
import './dashboard.css';


// const Sidebar = (props) => {
    
//     //change list item bg color onclick
//     const [ListBgColor,setListBgColor] = useState(false);
//     const changeColor = () => {
//         setListBgColor(ListBgColor => !ListBgColor);
        
//     }
//     let toggleListCheck = ListBgColor ? ' active': '';


//     // change category onclick the list item
//     const onChangeCategory=async (category)=>{
//         props.onChangeCategory(category);
//     };

//     return ( 
//         <>
//         <div className='sidebar'>
//         <ul>
//         {categories.map((category)=>{
//             return (
//                 <li onClick={()=>{onChangeCategory(category);changeColor()}} className={`list${toggleListCheck}`}>{category}</li>
//             )
//         })}
//         </ul>
//         </div>
//         </>
//      );
// }

const Sidebar = (props) => {

    // change category onclick the list item
    const onChangeCategory=async (category)=>{
        props.onChangeCategory(category);
    };

    return ( 
        <>
        <div className='sidebar'>
        <ul>
        {categories.map((category)=>{
            return (
                <li onClick={()=>onChangeCategory(category)} className='list'>{category}</li>
            )
        })}
        </ul>
        </div>
        </>
     );
}

 
export default Sidebar

const categories = ['profile','papers','events','grants','workshops','book publish','patents','phds','researches','tours','works','expert talk']