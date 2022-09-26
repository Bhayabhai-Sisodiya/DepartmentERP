import React, { useState,useEffect,useRef } from 'react';
import './form.css';
import '../components/showData.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { HiPrinter } from "react-icons/hi";
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import Searchbar from '../components/searchbar';


const Works = () => {
    const [Work, setWork] = useState({
        detail:"", client:"",cost:"",faculty_involved:""
    });
    
    const componentRef = useRef();
    
    const handleChange = (e) => {
        //window.alert(e.target.value);
        setWork({...Work,[e.target.name]:e.target.value});
    }

    //handle search
    const [serchQuery,setSearchQuery]=useState("");
    const handleSearch=(query)=>{
        setSearchQuery(query);
        console.log(query);
    }

    const handleSubmit =async (e)=> {
            
        const newData={
            "details":Work.detail, 
            "client":Work.client,
            "cost":Work.cost,
            "faculty_involved":Work.faculty_involved
        }
        const result=await axios.post("http://localhost:5000/addwork", newData
      ,{
          
          headers:{"x-auth-token":localStorage.getItem("Token")}
      });
        console.log(result.status);
        // window.alert(result.status);
        if(result.status===401){
            window.alert("some error has been accured");
        }
        else if(result.status===200){
            setData(prev=>[...prev,newData]);
            setShow(false);
            window.alert("data added successfully!");
        }
    }

    const clearform = () => {
        setWork("");
    }

    //fetching data from the database
    const [Data,setData]=useState([]);
    useEffect(()=>{
        fetchData()
    },[]);
    const fetchData=async()=>{
        
        const response =await axios.post("http://localhost:5000/getwork",{},
        {
            headers:{"x-auth-token":localStorage.getItem("Token")}
        });
        //const resp=response.json();
        console.log(response.data);
        setData(response.data);
    } 

    let filtered=Data;
    if(serchQuery){
        filtered=Data.filter(m=> m.faculty_involved.toLowerCase().includes(serchQuery.toLowerCase()));
    }

    //onclick add new button - show form
    const [Show,setShow] = useState(false) 
    
    return ( 
        <>
            <Searchbar value={serchQuery} onChange={handleSearch}/>
            {/* add new button */}
            <div className='add-btn'>
                <button className='btn' onClick={() =>{setShow(true);clearform()}}><span><AiOutlinePlus /></span>add new</button>
            </div>

            <div className='table-show-outer-box'>
            <div ref={componentRef} className='showData' >
                <h2>consultancy work</h2>
            <table>
                <tr>
                    <th>detail</th>
                    <th>client</th>
                    <th>cost</th>
                    <th>faculty involved</th>
                </tr>
                  {filtered.map((item, i) => (
                    <tr key={i}>
                        <td>{item.details}</td>
                        <td>{item.client}</td>
                        <td>{item.cost}</td>
                        <td>{item.faculty_involved}</td>
                    </tr>
                ))}  
            </table>
            </div>

            {/* print button    onClick={downloadPdfDocument}   */}
            <ReactToPrint
                trigger={()=>{
                    return <button className='download-btn' ><HiPrinter/>print </button>
                }}
                content={()=>componentRef.current}
                documentTitle="events"
                pageStyle="print"
                />             </div>

            {/* add paper details */}
            {Show?<div className='forms'>
            <div className='form-header'>
                    <h3>add consultancy work details</h3>
                    <div className='close-btn' onClick={() =>setShow(false)}>
                        <AiOutlineClose/>
                    </div>
                </div>
                
                <div className='input-field'>
                    <input onChange={handleChange} name='detail' type='text' value={Work.detail} placeholder='detail'/>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} name='client' type='text' value={Work.client} placeholder='client'/>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} name='cost' type='text' value={Work.cost} placeholder='cost'/>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} name='faculty_involved' type='text' value={Work.faculty_involved} placeholder='faculty involved'/>
                </div>
                
                <div className='submit'>
                    <button onClick={handleSubmit} className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Works;