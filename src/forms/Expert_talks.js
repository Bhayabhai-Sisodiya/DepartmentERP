import React, { useState } from 'react';
import './form.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const Expert_talks = () => {
    const [Talks, setTalks] = useState({
        title_talk:"", title_program:"",date:"",vanue:""
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
                    <h3>Expert talk details</h3>
                    <div className='close-btn' onClick={() =>setShow(false)}>
                        <AiOutlineClose/>
                    </div>
                </div>
                <div className='input-field'>
                    <input type='text' value={Talks.title_talk} placeholder='title'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Talks.title_program} placeholder='title program'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Talks.date} placeholder='date'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Talks.vanue} placeholder='vanue'/>
                </div>
                <div className='submit'>
                    <button className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Expert_talks;