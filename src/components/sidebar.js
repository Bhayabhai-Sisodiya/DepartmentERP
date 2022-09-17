import React from 'react';
import { Route,Routes , Navigate} from 'react-router-dom';
import './dashboard.css';
// import ReactDOM from 'react-dom/client';

const Sidebar = (props) => {

    const onChangeCategory=async (category)=>{
        console.log(category)
        props.onChangeCategory(category);
    }
    return ( 
        <>
        <div className='sidebar'>
        <ul>
        {categories.map((category)=>{
            return (
                <li onClick={()=>onChangeCategory(category)}>{category}</li>
            )
        })}
        </ul>
        </div>
        </>
     );
}
 
export default Sidebar

const categories = ['profile','events','papers','grants','workshops','book publish','patent','phd\'s','research and development','student tours','work','expert talk']