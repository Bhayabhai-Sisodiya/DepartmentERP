import React, { useState } from 'react';
import './form.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const Grants = () => {
    
    const [Grant, setGrant] = useState({
        coordinator:"", project_title:"",funding_agency:"",amount:""
    });

    //onclick add new button - show form
    const [Show,setShow] = useState(false) 
    
    return ( 
        <>
            {/* add new button */}
            <div className='add-btn'>
                <button className='btn' onClick={() =>setShow(true)}><span><AiOutlinePlus /></span>add new</button>
            </div>

            {/* add Grant details */}
            {Show?<div className='forms'>
                <div className='form-header'>
                    <h3>grant details</h3>
                    <div className='close-btn' onClick={() =>setShow(false)}>
                        <AiOutlineClose/>
                    </div>
                </div>
                <div className='input-field'>
                    <input type='text' value={Grant.coordinator} placeholder='coordinator'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Grant.project_title} placeholder='project title'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Grant.funding_agency} placeholder='funding agency'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Grant.amount} placeholder='amount'/>
                </div>
                
                <div className='submit'>
                    <button className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Grants;