import React, { useState,useEffect,useRef } from 'react';
import './form.css';
import '../components/showData.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { HiPrinter } from "react-icons/hi";
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import Searchbar from '../components/searchbar';


const Grants = () => {
    
    const [Grant, setGrant] = useState({
        type:"grant",coordinator:"", project_title:"",start_date:"",end_date:"",funding_agency:"",amount:"",approval_letter:"",completion_letter:"",
    });

    const componentRef = useRef();
    
    //onclick add new button - show form
    const [Show,setShow] = useState(false) 
    
    // function for changing the states
    const handleChange = (e) => {
        //window.alert(e.target.value);
        setGrant({...Grant,[e.target.name]:e.target.value});
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
        const result=await axios.post("http://localhost:5000/delete_grant", newData,{
          headers:{"x-auth-token":localStorage.getItem("Token")}
        });
        const uiData=Data.filter(i=>i._id !==item);
        setData(uiData);
    }

    //handle update
    const handleUpdate=async (item)=>{
        let newData = {
            "type":item.type,
            "cordinator":item.coordinator, 
            "project_title":item.project_title,
            "start_date":item.start_date,
            "end_date":item.end_date,            
            "funding_agency":item.funding_agency,            
            "amount":item.amount,
            "approval_letter":item.approval_letter,
            "completion_letter":item.completion_letter,
    }
    setGrant(newData);
    setShow(true);

    }

    const handleSubmit =async (e)=> {
        const newData = {
            "type":Grant.type,
            "cordinator":Grant.coordinator, 
            "project_title":Grant.project_title,
            "start_date":Grant.start_date,
            "end_date":Grant.end_date,            
            "funding_agency":Grant.funding_agency,            
            "amount":Grant.amount,
            "approval_letter":Grant.approval_letter,
            "completion_letter":Grant.completion_letter,
      }
        const result=await axios.post("http://localhost:5000/addgrant",newData ,{
          
          headers:{"x-auth-token":localStorage.getItem("Token")}
      });
        console.log(result.status);
        // window.alert(result.status);
        if(result.status===401){
            window.alert("some error has been accured");
        }
        else if(result.status===200) {
            setData(prev => [...prev,newData]);
            setShow(false);
            window.alert("data added successfully!");
        }
    }

    const clearform = () => {
        setGrant({
            type:"grant",coordinator:"", project_title:"",start_date:"",end_date:"",funding_agency:"",amount:"",approval_letter:"",completion_letter:"",
        });
    }
    //fetching data from the database
    const [Data,setData]=useState([]);
    useEffect(()=>{
        fetchData()
    },[]);

    const fetchData=async()=>{
        
        const response =await axios.post("http://localhost:5000/getgrant",{},
        {
            headers:{"x-auth-token":localStorage.getItem("Token")}
        });
        //const resp=response.json();
        console.log(response.data);
        setData(response.data);
    } 

    let filtered=Data;
    if(serchQuery){
        filtered=Data.filter(m=> m.cordinator.toLowerCase().includes(serchQuery.toLowerCase()));
    }

    return ( 
        <>
            <Searchbar value={serchQuery} onChange={handleSearch}/>
            {/* add new button */}
            <div className='add-btn'>
                <button className='btn' onClick={() =>{setShow(true);clearform()}}><span><AiOutlinePlus /></span>add new</button>
                <button className='btn upload-excel'><span><AiOutlinePlus /></span>upload excel file</button>
            </div>

            {/* showing the fetched data */}
            <div className='table-show-outer-box'>
            <div ref={componentRef} className='showData' >
                <h2>grants</h2>
                    <table>
                        <tr>
                            <th>grant/research</th>
                            <th>coordinator</th>
                            <th>project title</th>
                            <th>start date</th>
                            <th>end date</th>
                            <th>funding agency</th>
                            <th>amount</th>
                            <th>approval letter</th>
                            <th>completion letter</th>
                            <th>edit</th>
                        </tr>                      
                        {filtered.map((item, i) => (
                            <tr key={i}>
                                <td>{item.type}</td>
                                <td>{item.cordinator}</td>
                                <td>{item.project_title}</td>
                                <td>{item.start_date}</td>
                                <td>{item.end_date}</td>
                                <td>{item.funding_agency[0]}</td>
                                <td>{item.amount}</td>
                                <td>{item.approval_letter}</td>
                                <td>{item.completion_letter}</td>
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

            {/* add Grant details */}
            {Show?<div className='forms grant-form'>
                <div className='form-header'>
                    <h3>grant details</h3>
                    <div className='close-btn' onClick={() =>setShow(false)}>
                        <AiOutlineClose/>
                    </div>
                </div>
                <div className='input-field'>
                    <p className='input-title'>choose a type:</p>
                    <select onChange={handleChange} name='type1' value={Grant.type} className='select-options'>
                        <option value="national">grant</option>
                        <option value="international">research project</option>
                    </select>
                </div>
                <div className='input-grid'>
                    <div className='input-field'>
                        <input type='text' onChange={handleChange} value={Grant.project_title} name='project_title' placeholder='project title'/>
                    </div>
                    <div className='input-field'>
                        <input type='text' onChange={handleChange} value={Grant.coordinator} name='coordinator' placeholder='coordinator'/>
                    </div>
                </div>

                <div className='input-grid'>
                    <div className='input-field'>
                        <p className='input-title'>start date:</p>
                        <input type='date' onChange={handleChange} name='start_date' value={Grant.start_date} placeholder='start date'/>
                    </div>
                    <div className='input-field'>
                        <p className='input-title'>end date:</p>
                        <input type='date' onChange={handleChange} name='end_date' value={Grant.end_date} placeholder='end date'/>
                    </div>
                </div>

                <div className='input-grid'>
                    <div className='input-field'>
                        <input type='text' onChange={handleChange} value={Grant.funding_agency} name='funding_agency' placeholder='funding agency'/>
                    </div>
                    <div className='input-field'>
                        <input type='text' onChange={handleChange} value={Grant.amount} name='amount' placeholder='amount'/>
                    </div>
                </div>

                <div className='input-grid'>
                    <div className='file-input'>
                        <p className='input-title'>add a approval letter:</p>
                        <input type='file' onChange={handleChange} name='approval_letter' value={Grant.approval_letter}/>
                    </div>
                    <div className='file-input'>
                        <p className='input-title'>add a completion letter:</p>
                        <input type='file' onChange={handleChange} name='completion_letter' value={Grant.completion_letter}/>
                    </div>
                </div>
                <div className='submit'>
                    <button onClick={handleSubmit} className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Grants;