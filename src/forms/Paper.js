import React, { useState } from 'react';
import './form.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";

const Papers = () => {
    const [Paper, setPaper] = useState({
        type1:"", title:"",volume:"",issue:"",year:"",author:"",type2:"",indexing:"",isbn:""
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
                    <p className='input-title'>choose a type:</p>
                    <select name='type1' value={Paper.type1} className='select-options'>
                        <option value="national">national</option>
                        <option value="international">international</option>
                    </select>
                </div>
                <div className='input-field'>
                    <input type='text' value={Paper.title} placeholder='Paper Title'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Paper.volume} placeholder='volume'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Paper.issue} placeholder='issue'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Paper.year} placeholder='year'/>
                </div>
                <div className='input-field'>
                    <input type='text' value={Paper.author} placeholder='author'/>
                </div>
                <div className='input-field'>
                    <p className='input-title'>choose a type:</p>
                    <select name='type2' value={Paper.type2} className='select-options'>
                        <option value="conference">conference</option>
                        <option value="journal">journal</option>
                    </select>
                </div>
                <div className='input-field'>
                    <p className='input-title'>indexing:</p>
                    <select name='indexing' value={Paper.indexing} className='select-options'>
                        <option value="scoops">scoops</option>
                        <option value="ugc">ugc</option>
                        <option value="wos">web of science</option>
                        <option value="other">other</option>
                    </select>
                </div>
                <div className='input-field'>
                    <input type='text' value={Paper.isbn} placeholder='ISBN'/>
                </div>
                <div className='submit'>
                    <button className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Papers;