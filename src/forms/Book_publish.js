import React, { useState } from 'react';
import './form.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const Book_publish = () => {
    const [Book, setBook] = useState({
        title:"",author:"",co_author:"",publisher:"",isbn:""
    });

    //onclick add new button - show form
    const [Show,setShow] = useState(false) 
    
    return ( 
        <>
            {/* add new button */}
            <div className='add-btn'>
                <button className='btn' onClick={() =>setShow(true)}><span><AiOutlinePlus /></span>add new</button>
            </div>

            {/* add book publish details */}
            {Show?<div className='forms'>
                <div className='close-btn' onClick={() =>setShow(false)}>
                <AiOutlineClose/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Book.title} placeholder='book Title'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Book.author} placeholder='author'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Book.co_author} placeholder='co author'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Book.publisher} placeholder='publisher'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Book.isbn} placeholder='ISBN'/>
                </div>
                <div className='submit'>
                    <button className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Book_publish;