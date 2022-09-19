import React, { useState } from 'react';
import './form.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const Patents = () => {
    const [Patent, setPatent] = useState({
        faculty:"", title:"",application_no:"",date:"",status:""
    });

    //onclick add new button - show form
    const [Show,setShow] = useState(false) 
    
    return ( 
        <>
            {/* add new button */}
            <div className='add-btn'>
                <button className='btn' onClick={() =>setShow(true)}><span><AiOutlinePlus /></span>add new</button>
            </div>

            {/* add paper details */}
            {Show?<div className='forms'>
                <div className='close-btn' onClick={() =>setShow(false)}>
                <AiOutlineClose/>
                </div>

                <div className='input-field'>
                    <input type='text' value={Patent.faculty} placeholder='faculty'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Patent.title} placeholder='title'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Patent.application_no} placeholder='application number'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Patent.date} placeholder='date'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Patent.status} placeholder='published/registration/awarded/other'/>
                </div>
                
                <div className='submit'>
                    <button className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Patents;