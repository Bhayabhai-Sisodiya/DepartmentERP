import React, { useState } from 'react';
import './form.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const Researches = () => {
    const [Research, setResearch] = useState({
       coordinator:"",title:"",funding_agency:"",amount:"",date:""
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
                <div className='form-header'>
                    <h3>research and development details</h3>
                    <div className='close-btn' onClick={() =>setShow(false)}>
                        <AiOutlineClose/>
                    </div>
                </div>
                <div className='input-field'>
                    <input type='text' value={Research.coordinator} placeholder='coordinator'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Research.title} placeholder='Paper Title'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Research.funding_agency} placeholder='issue'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Research.amount} placeholder='amount'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Research.date} placeholder='date'/>
                </div>
                
                <div className='submit'>
                    <button className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Researches;