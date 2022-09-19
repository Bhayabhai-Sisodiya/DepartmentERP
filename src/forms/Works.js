import React, { useState } from 'react';
import './form.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const Works = () => {
    const [Work, setWork] = useState({
        detail:"", client:"",cost:"",faculty_involved:""
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
                    <input type='text' value={Work.detail} placeholder='detail'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Work.client} placeholder='client'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Work.cost} placeholder='cost'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Work.faculty_involved} placeholder='faculty involved'/>
                </div>
                
                <div className='submit'>
                    <button className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Works;