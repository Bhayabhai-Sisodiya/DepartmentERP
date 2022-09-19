import React, { useState } from 'react';
import './form.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const Events = () => {

    const [Event, setEvent] = useState({
        type:"", coordinator:"",title:"",start_date:"",end_date:"",no_of_participants:"",sponsor:"",for_whom:"",report:""
    });

    //onclick add new button - show form
    const [Show,setShow] = useState(false) 
    
    return ( 
        <>
            {/* add new button */}
            <div className='add-btn'>
                <button className='btn' onClick={() =>setShow(true)}><span><AiOutlinePlus /></span>add new</button>
            </div>

            {/* add Event details */}
            {Show?<div className='forms'>
                <div className='close-btn' onClick={() =>setShow(false)}>
                <AiOutlineClose/>
                </div>
                <div className='input-field'>
                    <p className='input-title'>choose a type:</p>
                    <select name='type' value={Event.type} className='select-options'>
                        <option value="Seminar">Seminar</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Conference">Conference</option>
                        <option value="Webinar">Webinar</option>
                        <option value="expert talk">expert talk</option>
                    </select>
                </div>
                <div className='input-field'>
                    <input type='text' value={Event.title} placeholder='title'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Event.coordinator} placeholder='coordinator'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Event.start_date} placeholder='start date'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Event.end_date} placeholder='end date'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Event.no_of_participants} placeholder='number of participants'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Event.sponsor} placeholder='sponsors'/>
                </div>
                <div className='input-field'>
                    <p className='input-title'>choose a type:</p>
                    <select name='for whom' value={Event.for_whom} className='select-options'>
                        <option value="faculties">faculties</option>
                        <option value="students">student</option>
                    </select>
                </div>
                <div className='input-field file-input'>
                    <p className='input-title'>add a report:</p>
                    <input type='file' value={Event.report}/>
                </div>
                <div className='submit'>
                    <button className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Events;