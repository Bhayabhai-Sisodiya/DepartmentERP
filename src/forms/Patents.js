import React, { useState,useEffect,useRef } from 'react';
import './form.css';
import '../components/showData.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { HiPrinter } from "react-icons/hi";
import axios from 'axios';
import Searchbar from '../components/searchbar';
import ReactToPrint from 'react-to-print';


const Patents = () => {
    const [Patent, setPatent] = useState({
        faculty:"", title:"",application_no:"",date:"",status:""
    });
    
    const componentRef = useRef();
    
    //onclick add new button - show form
    const [Show,setShow] = useState(false) 
    
    const handleChange = (e) => {
        //window.alert(e.target.value);
        setPatent({...Patent,[e.target.name]:e.target.value});
    }

    //handle search
    const [serchQuery,setSearchQuery]=useState("");
    const handleSearch=(query)=>{
        setSearchQuery(query);
        console.log(query);
    }

    //handel delete
    const handleDelete=async (item)=>{
        const newData = {"id":item}
        const result=await axios.post("http://localhost:5000/delete_patent", newData,{
          headers:{"x-auth-token":localStorage.getItem("Token")}
        });
        const uiData=Data.filter(i=>i._id !==item);
        setData(uiData);
    }

    //handle update
    const handleUpdate=async (item)=>{
        let newData = {
            "faculty":item.faculty[0], 
            "title":item.title,
            "application_no":item.application_no,
            "date":item.date,
            "status":item.status
    }
    setPatent(newData);
    setShow(true);

    }

    const handleSubmit =async (e)=> {
            
        //console.log(Token);
        const newData={
            "faculty":Patent.faculty[0], 
            "title":Patent.title,
            "application_no":Patent.application_no,
            "date":Patent.date,
            "status":Patent.status
      }
        const result=await axios.post("http://localhost:5000/addpatent",newData ,{
          
          headers:{"x-auth-token":localStorage.getItem("Token")}
      });
        console.log(result.status);
        // window.alert(result.status);
        if(result.status===401){
            window.alert("some error has been accured");
        }
        else if(result.status===200)
        {
            setData(prev=>[...prev,newData]);
            setShow(false);
            window.alert("data added successfully!");
        }
    }

    const clearform = () => {
        setPatent({
            faculty:"", title:"",application_no:"",date:"",status:""
        });
    }

    //fetching data from the database
    const [Data,setData]=useState([]);
    useEffect(()=>{
        fetchData()
    },[]);
    const fetchData=async()=>{
        
        const response =await axios.post("http://localhost:5000/getpatent",{},
        {
            headers:{"x-auth-token":localStorage.getItem("Token")}
        });
        //const resp=response.json();
        console.log(response.data);
        setData(response.data);
    } 

    let filtered=Data;
    if(serchQuery){
        filtered=Data.filter(m=> m.faculty[0].toLowerCase().includes(serchQuery.toLowerCase()));
    }

    return ( 
        <>
            <Searchbar value={serchQuery} onChange={handleSearch}/>
            {/* add new button */}
            <div className='add-btn'>
                <button className='btn' onClick={() =>{setShow(true);clearform()}}><span><AiOutlinePlus /></span>add new</button>
                <button className='btn upload-excel'><span><AiOutlinePlus /></span>upload excel file</button>

            </div>

            <div className='table-show-outer-box'>
            <div ref={componentRef} className='showData' >
                <h2>Patents</h2>
            <table>
                <tr>
                    <th>Faculty</th>
                    <th>title</th>
                    <th>Application no</th>
                    <th>date</th>
                    <th>Status</th>
                    <th>edit</th>
                </tr>
                  {filtered.map((item, i) => (
                    <tr key={i}>
                        <td>{item.faculty[0]}</td>
                        <td>{item.title}</td>
                        <td>{item.application_no}</td>
                        <td>{item.date}</td>
                        <td>{item.status}</td>
                        <td>
                                <button onClick={()=>handleDelete(item._id)} className=''>Delete</button>
                                <button onClick={()=>{handleDelete(item._id);handleUpdate(item) }} >Update</button>
                                </td>
                    </tr>
                ))}  
            </table>
            </div>

            {/* print button */}
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
                    <h3>Patent details</h3>
                    <div className='close-btn' onClick={() =>setShow(false)}>
                        <AiOutlineClose/>
                    </div>
                </div>

                <div className='input-field'>
                    <input onChange={handleChange} type='text' name='faculty' value={Patent.faculty} placeholder='faculty'/>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} type='text' name='title' value={Patent.title} placeholder='title'/>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} type='text' name='application_no' value={Patent.application_no} placeholder='application number'/>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} type='date' name='date' value={Patent.date} placeholder='date'/>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} type='text' name='status' value={Patent.status} placeholder='published/registration/awarded/other'/>
                </div>
                
                <div className='submit'>
                    <button onClick={handleSubmit} className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Patents;