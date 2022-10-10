import React, { useState,useEffect,useRef } from 'react';
import './form.css';
import '../components/showData.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { HiPrinter } from "react-icons/hi";
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import Searchbar from '../components/searchbar';

const Workshops = () => {
    const [Workshop, setWorkshop] = useState({
        start_date:"",end_date:"",expert:"",title:"",type:"STTP",funding_agency:"",certificate:"",report:"",
    });
    
    const componentRef = useRef();
    
    //onclick add new button - show form
    const [Show,setShow] = useState(false) 
    
    // function for changing the states
    const handleChange = (e) => {
        //window.alert(e.target.value);
        setWorkshop({...Workshop,[e.target.name]:e.target.value});
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
        const result=await axios.post("http://localhost:5000/delete_faculty_workshop", newData,{
          headers:{"x-auth-token":localStorage.getItem("Token")}
        });
        const uiData=Data.filter(i=>i._id !==item);
        setData(uiData);
    }
    const handleSubmit =async (e)=> {
        const newData = {
            "start_date":Workshop.start_date, 
            "end_date":Workshop.end_date,            
            "expert":Workshop.expert,            
            "title":Workshop.title,
            "type":Workshop.type,            
            "funding_agency":Workshop.funding_agency,
            "certificate":Workshop.certificate,
            "report":Workshop.report,
      }
        const result=await axios.post("http://localhost:5000/add_faculty_workshop",newData ,{
          
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
        setWorkshop({
            start_date:"",end_date:"",expert:"",title:"",type:"STTP",funding_agency:"",certificate:"",report:"",
        });
    }

    //fetching data from the database
    const [Data,setData]=useState([]);
    useEffect(()=>{
        fetchData()
    },[]);

    const fetchData=async()=>{
        
        const response =await axios.post("http://localhost:5000/get_faculty_workshop",{},
        {
            headers:{"x-auth-token":localStorage.getItem("Token")}
        });
        //const resp=response.json();
        console.log(response.data);
        setData(response.data);
    }

    let filtered=Data;
    if(serchQuery){
        filtered=Data.filter(m=> m.expert.toLowerCase().includes(serchQuery.toLowerCase()));
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
                <h2>events attended</h2>
                    <table>
                        <tr>
                            <th>start date</th>
                            <th>end_date</th>
                            <th>expert</th>
                            <th>title</th>
                            <th>type</th>
                            <th>funding agency</th>
                            <th>certificate</th>
                            <th>report</th>
                            <th>edit</th>
                        </tr>                      
                        {filtered.map((item, i) => (
                            <tr key={i}>
                                <td>{item.start_date}</td>
                                <td>{item.end_date}</td>
                                <td>{item.expert}</td>
                                <td>{item.title}</td>
                                <td>{item.type}</td>
                                <td>{item.funding_agency[0]}</td>
                                <td>{item.certificate}</td>
                                <td>{item.report}</td>
                                <td>
                                <button onClick={()=>handleDelete(item._id)} className=''>Delete</button>
                                {/* <button onClick={()=>handleDelete(item._id)} className=''>update</button> */}
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

            {/* add Workshops details */}
            {Show?<div className='forms'>
            <div className='form-header'>
                    <h3>add workshop attended details</h3>
                    <div className='close-btn' onClick={() =>setShow(false)}>
                        <AiOutlineClose/>
                    </div>
                </div>
                <div className='input-field'>
                    <input type='date' onChange={handleChange} name='start_date' value={Workshop.start_date} placeholder='start date'/>
                </div>
                <div className='input-field'>
                    <input type='date' onChange={handleChange} name='end_date' value={Workshop.end_date} placeholder='end date'/>
                </div>
                <div className='input-field'>
                    <input type='text' onChange={handleChange} name='expert' value={Workshop.expert} placeholder='expert'/>
                </div>
                <div className='input-field'>
                    <input type='text' onChange={handleChange} name='title' value={Workshop.title} placeholder='title'/>
                </div>
                <div className='input-field'>
                    <p className='input-title'>choose a type:</p>
                    <select name='type' onChange={handleChange} value={Workshop.type} className='select-options'>
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
                    <input type='text' onChange={handleChange} name='funding_agency' value={Event.funding_agency} placeholder='funding agency'/>
                </div>

                <div className='submit'>
                    <button onClick={handleSubmit} className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Workshops;