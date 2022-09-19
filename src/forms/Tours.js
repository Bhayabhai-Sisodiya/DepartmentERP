import React, { useState } from 'react';
import './form.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const Tours = () => {
    const [Tour, setTour] = useState({
        date:"", place:"",no_of_student:""
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
                    <input type='text' value={Tour.date} placeholder='date'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Tour.place} placeholder='place'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Tour.no_of_student} placeholder='number of students'/>
                </div>
                
                <div className='submit'>
                    <button className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
} 
export default Tours;