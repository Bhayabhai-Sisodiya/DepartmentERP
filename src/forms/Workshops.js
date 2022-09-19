import React, { useState } from 'react';
import './form.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const Workshops = () => {
    const [Workshop, setWorkshop] = useState({
        start_date:"",end_date:"",expert:"",title:"",type:"",funding_agency:""
    });

    //onclick add new button - show form
    const [Show,setShow] = useState(false) 
    
    return ( 
        <>
            {/* add new button */}
            <div className='add-btn'>
                <button className='btn' onClick={() =>setShow(true)}><span><AiOutlinePlus /></span>add new</button>
            </div>

            {/* add Workshops details */}
            {Show?<div className='forms'>
                <div className='close-btn' onClick={() =>setShow(false)}>
                <AiOutlineClose/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Workshop.start_date} placeholder='start date'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Workshop.end_date} placeholder='end date'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Workshop.expert} placeholder='expert'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Workshop.title} placeholder='title'/>
                </div>
                <div className='input-field'>
                    <p className='input-title'>choose a type:</p>
                    <select name='type' value={Workshop.type} className='select-options'>
                        <option value="STTP">STTP</option>
                        <option value="seminar">seminar</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Conference">Conference</option>
                        <option value="Webinar">Webinar</option>
                        <option value="FTP">FTP</option>
                        <option value="expert talk">expert talk</option>
                    </select>
                </div>
                <div className='input-field'>
                    <input type='text' value={Event.funding_agency} placeholder='funding agency'/>
                </div>
                <div className='submit'>
                    <button className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Workshops;