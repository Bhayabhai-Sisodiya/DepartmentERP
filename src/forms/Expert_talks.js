import React, { useState,useEffect,useRef } from 'react';
import './form.css';
import '../components/showData.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { HiPrinter } from "react-icons/hi";
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import Searchbar from '../components/searchbar';

const Expert_talks = () => {
    const [Talks, setTalks] = useState({
        title_talk:"",faculty_name:"", title_program:"",date:"",vanue:""
    });

    const componentRef = useRef();

    const handleChange = (e) => {
        //window.alert(e.target.value);
        setTalks({...Talks,[e.target.name]:e.target.value});
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
        const result=await axios.post("http://localhost:5000/delete_expert_talk", newData,{
          headers:{"x-auth-token":localStorage.getItem("Token")}
        });
        const uiData=Data.filter(i=>i._id !==item);
        setData(uiData);
    }

    //handle update
    const handleUpdate=async (item)=>{
        let newData = {
            "title_talk":item.title_talk,
            "faculty_name":item.faculty_name, 
            "title_program":item.title_program,
            "date":item.date,
            "vanue":item.vanue
    }
    setTalks(newData);
    setShow(true);

    }

    const handleSubmit =async (e)=> {
            
        const newData={
            "title_talk":Talks.title_talk,
            "faculty_name":Talks.faculty_name, 
            "title_program":Talks.title_program,
            "date":Talks.date,
            "vanue":Talks.vanue
        }
        const result=await axios.post("http://localhost:5000/add_expert_talk", newData
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
        setTalks({
            title_talk:"",faculty_name:"", title_program:"",date:"",vanue:""
        });
    }

    //fetching data from the database
    const [Data,setData]=useState([]);
    useEffect(()=>{
        fetchData()
    },[]);
    const fetchData=async()=>{
        
        const response =await axios.post("http://localhost:5000/get_expert_talk",{},
        {
            headers:{"x-auth-token":localStorage.getItem("Token")}
        });
        //const resp=response.json();
        console.log(response.data);
        setData(response.data);
    } 
    let filtered=Data;
    if(serchQuery){
        filtered=Data.filter(m=> m.title_talk.toLowerCase().includes(serchQuery.toLowerCase()));
    }

    //onclick add new button - show form
    const [Show,setShow] = useState(false) 
    
    return ( 
        <>
            <Searchbar value={serchQuery} onChange={handleSearch}/>
            {/* add new button */}
            <div className='add-btn'>
                <button className='btn' onClick={() =>{setShow(true);clearform()}}><span><AiOutlinePlus /></span>add new</button>
                <button className='btn upload-excel'><span><AiOutlinePlus /></span>upload excel file</button>

            </div>

            <div className='table-show-outer-box'>
                <div ref={componentRef} className='showData' id='PrintData'>
                <h2>outside interactions</h2>
            <table>
                <tr>
                    <th>title talk</th>
                    <th>faculty</th>
                    <th>title program</th>
                    <th>date</th>
                    <th>place</th>
                    <th>edit</th>
                </tr>
                  {Data.map((item, i) => (
                    <tr key={i}>
                        <td>{item.title_talk}</td>
                        <td>{item.faculty_name}</td>
                        <td>{item.title_program}</td>
                        <td>{item.date}</td>
                        <td>{item.vanue}</td>
                        <td>
                            <button onClick={()=>handleDelete(item._id)} className=''>Delete</button>
                            <button onClick={()=>{handleDelete(item._id);handleUpdate(item) }} >Update</button>
                        </td>
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
                documentTitle="expert talk"
                pageStyle="print"
                />             </div>

            {/* add paper details */}
            {Show?<div className='forms'>
                <div className='form-header'>
                    <h3>Expert talk details</h3>
                    <div className='close-btn' onClick={() =>setShow(false)}>
                        <AiOutlineClose/>
                    </div>
                </div>

                <div className='input-grid'>    
                    <div className='input-field'>
                        <input onChange={handleChange} name='title_talk' type='text' value={Talks.title_talk} placeholder='title'/>
                    </div>
                    <div className='input-field'>
                        <input onChange={handleChange} name='faculty_name' type='text' value={Talks.faculty_name} placeholder='faculty'/>
                    </div>
                </div>

                <div className='input-grid'>
                    <div className='input-field'>
                        <input onChange={handleChange} name='title_program' type='text' value={Talks.title_program} placeholder='title program'/>
                    </div>
                    <div className='input-field'>
                        <p className='input-title'>talk date:</p>
                        <input onChange={handleChange} name='date' type='date' value={Talks.date} placeholder='date'/>
                    </div>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} name='vanue' type='text' value={Talks.vanue} placeholder='vanue'/>
                </div>
                <div className='submit'>
                    <button onClick={handleSubmit} className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Expert_talks;