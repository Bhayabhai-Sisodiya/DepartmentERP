import React, { useState } from 'react';
import './form.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const Profile = () => {

    const [Prof, setProf] = useState({
      name:"", phno:"",designation:"",dateOfJoin:"",qualification:""
    });
  
    //onclick add new button - show form
    const [Show,setShow] = useState(false) 

    return (
      <>
            
            {/* add new button */}
            <div className='add-btn'>
                <button className='btn' onClick={() =>setShow(true)}><span><AiOutlinePlus /></span>add profile details</button>
            </div>

            {/* add Profile details */}
            {Show?<div className='forms'>
                <div className='form-header'>
                    <h3>profile</h3>
                    <div className='close-btn' onClick={() =>setShow(false)}>
                        <AiOutlineClose/>
                    </div>
                </div>
                <div className='input-field'>
                    <input type='text' value={Prof.name} placeholder='your name'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Prof.phno} placeholder='phone number'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Prof.designation} placeholder='designation'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Prof.dateOfJoin} placeholder='date of join'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Prof.qualification} placeholder='qualification'/>
                </div>
                <div className='submit'>
                    <button className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
      </>
    
  );
}

export default Profile