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
        coordinator:"", project_title:"",funding_agency:"",amount:""
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

    const handleSubmit =async (e)=> {
        const newData = {
            "cordinator":Grant.coordinator, 
            "project_title":Grant.project_title,            
            "funding_agency":Grant.funding_agency,            
            "amount":Grant.amount
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
        setGrant("");
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
            </div>

            {/* showing the fetched data */}
            <div className='table-show-outer-box'>
            <div ref={componentRef} className='showData' >
                <h2>grants</h2>
                    <table>
                        <tr>
                            <th>coordinator</th>
                            <th>project title</th>
                            <th>funding agency</th>
                            <th>amount</th>
                        </tr>                      
                        {filtered.map((item, i) => (
                            <tr key={i}>
                                <td>{item.cordinator}</td>
                                <td>{item.project_title}</td>
                                <td>{item.funding_agency[0]}</td>
                                <td>{item.amount}</td>
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
            {Show?<div className='forms'>
                <div className='form-header'>
                    <h3>grant details</h3>
                    <div className='close-btn' onClick={() =>setShow(false)}>
                        <AiOutlineClose/>
                    </div>
                </div>
                <div className='input-field'>
                    <input type='text' onChange={handleChange} value={Grant.coordinator} name='coordinator' placeholder='coordinator'/>
                </div>
                <div className='input-field'>
                    <input type='text' onChange={handleChange} value={Grant.project_title} name='project_title' placeholder='project title'/>
                </div>
                <div className='input-field'>
                    <input type='text' onChange={handleChange} value={Grant.funding_agency} name='funding_agency' placeholder='funding agency'/>
                </div>
                <div className='input-field'>
                    <input type='text' onChange={handleChange} value={Grant.amount} name='amount' placeholder='amount'/>
                </div>
                
                <div className='submit'>
                    <button onClick={handleSubmit} className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Grants;