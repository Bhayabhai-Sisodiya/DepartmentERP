import React, { useState,useContext } from 'react';
import './form.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import axios from 'axios';


const Papers = () => {
    const [Paper, setPaper] = useState({
        type1:"International", title:"",volume:"",issue:"",year:"",author:"",type2:"conference",indexing:"scoops",isbn:""
    });

    //onclick add new button - show form
    const [Show,setShow] = useState(false) ;

    
    
    const handleChange = (e) => {
        //window.alert(e.target.value);
        setPaper({...Paper,[e.target.name]:e.target.value});
    }

    const handleSubmit =async (e)=> {
        /* const result = await fetch("http://localhost:5000/add_paper",{
            method:"POST",
            headers:{
                "Content-Type" :"application/json"
            },
            body:JSON.stringify({
                "type1":Paper.type1, 
                "title":Paper.title,
                "volume":Paper.volume,
                "issue":Paper.issue,
                "year":Paper.year,
                "author":Paper.author,
                "type2":Paper.type2,
                "indexing":Paper.indexing,
                "ISBN":Paper.isbn
            })
        })
        console.log(result); */
        const result=await axios.post("http://localhost:5000/addpaper", {
            "type1":Paper.type1, 
            "title":Paper.title,
            "volume":Paper.volume,
            "issue":Paper.issue,
            "year":Paper.year,
            "author":Paper.author,
            "type2":Paper.type2,
            "indexing":Paper.indexing,
            "ISBN":Paper.isbn
      });
        console.log(result.status);
        window.alert(result.status);
        if(result.status===401){
            window.alert()
        }
    }
    return ( 
        <>
            {/* add new button */}
            <div className='add-btn'>
                <button className='btn' onClick={() =>setShow(true)}><span><AiOutlinePlus /></span>add new</button>
            </div>

            <div className='showdata'>
            <tbody>
                <tr>
                    <th>type1</th>
                    <th>title</th>
                    <th>volume</th>
                    <th>issue</th>
                    <th>year</th>
                    <th>author</th>
                    <th>type</th>
                    <th>indexing</th>
                    <th>ISBN</th>
                </tr>
                {/* {data.map((item, i) => (
                    <tr key={i}>
                        <td>{item.userId}</td>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.body}</td>
                    </tr>
                ))} */}
            </tbody>
            </div>

            {/* add paper details */}
            {Show?<div className='forms'>
                <div className='form-header'>
                    <h3>paper details</h3>
                
                <div className='close-btn' onClick={() =>setShow(false)}>
                <AiOutlineClose/>
                </div>
                </div>
                <div className='input-field'>
                    <p className='input-title'>choose a type:</p>
                    <select onChange={handleChange} name='type1' value={Paper.type1} className='select-options'>
                        <option value="national">national</option>
                        <option value="international">international</option>
                    </select>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} type='text' name='title' value={Paper.title} placeholder='Paper Title'/>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} type='text' name='volume' value={Paper.volume} placeholder='volume'/>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} type='text' name='issue' value={Paper.issue} placeholder='issue'/>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} type='text' name='year' value={Paper.year} placeholder='year'/>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} type='text' name='author' value={Paper.author} placeholder='author'/>
                </div>
                <div className='input-field'>
                    <p className='input-title'>choose a type:</p>
                    <select onChange={handleChange} name='type2' value={Paper.type2} className='select-options'>
                        <option value="conference">conference</option>
                        <option value="journal">journal</option>
                    </select>
                </div>
                <div className='input-field'>
                    <p className='input-title'>indexing:</p>
                    <select onChange={handleChange} name='indexing' value={Paper.indexing} className='select-options'>
                        <option value="scoops">scoops</option>
                        <option value="ugc">ugc</option>
                        <option value="wos">web of science</option>
                        <option value="other">other</option>
                    </select>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} type='text' name='isbn' value={Paper.isbn} placeholder='ISBN'/>
                </div>
                <div className='submit'>
                    <button onClick={handleSubmit} className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Papers;