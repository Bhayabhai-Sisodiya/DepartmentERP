import React, { useState,useEffect,useRef } from 'react';
import './form.css';
import '../components/showData.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { HiPrinter } from "react-icons/hi";
import axios from 'axios';
import ReactToPrint from 'react-to-print';

const Researches = () => {
    const [Research, setResearch] = useState({
       cordinator:"",title:"",funding_agency:"",amount:"",date:""
    });
    
    const componentRef = useRef();
    
    //onclick add new button - show form
    const [Show,setShow] = useState(false) 
    
    // function for changing the states
    const handleChange = (e) => {
        //window.alert(e.target.value);
        setResearch({...Research,[e.target.name]:e.target.value});
    }

    const handleSubmit =async (e)=> {
        const newData = {
            "cordinator":Research.cordinator, 
            "title":Research.title,            
            "funding_agency":Research.funding_agency,            
            "amount":Research.amount,
            "date":Research.date,            
      }
        const result=await axios.post("http://localhost:5000/addrnd",newData ,{
          
          headers:{"x-auth-token":localStorage.getItem("Token")}
      });
        console.log(result.status);
        window.alert(result.status);
        if(result.status===401){
            window.alert("some error has been accured");
        }
        else if(result.status===200) {
            setData(prev => [...prev,newData])
        }
    }

    //fetching data from the database
    const [Data,setData]=useState([]);
    useEffect(()=>{
        fetchData()
    },[]);

    const fetchData=async()=>{
        
        const response =await axios.post("http://localhost:5000/getrnd",{},
        {
            headers:{"x-auth-token":localStorage.getItem("Token")}
        });
        //const resp=response.json();
        console.log(response.data);
        setData(response.data);
    }

    return ( 
        <>
            {/* add new button */}
            <div className='add-btn'>
                <button className='btn' onClick={() =>setShow(true)}><span><AiOutlinePlus /></span>add new</button>
            </div>

            {/* showing the fetched data */}
            <div className='table-show-outer-box'>
            <div ref={componentRef} className='showData' >
                <h2>research and development</h2>
                    <table>
                        <tr>
                            <th>coordinator</th>
                            <th>title</th>
                            <th>funding agency</th>
                            <th>amount</th>
                            <th>date</th>
                        </tr>                      
                        {Data.map((item, i) => (
                            <tr key={i}>
                                <td>{item.cordinator}</td>
                                <td>{item.title}</td>
                                <td>{item.funding_agency[0]}</td>
                                <td>{item.amount}</td>
                                <td>{item.date}</td>
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
                    <h3>research and development details</h3>
                    <div className='close-btn' onClick={() =>setShow(false)}>
                        <AiOutlineClose/>
                    </div>
                </div>
                <div className='input-field'>
                    <input type='text' onChange={handleChange} name='cordinator' value={Research.cordinator} placeholder='coordinator'/>
                </div>
                <div className='input-field'>
                    <input type='text' onChange={handleChange} name='title' value={Research.title} placeholder='Paper Title'/>
                </div>
                <div className='input-field'>
                    <input type='text' onChange={handleChange} name='funding_agency' value={Research.funding_agency} placeholder='funding agency'/>
                </div>
                <div className='input-field'>
                    <input type='text' onChange={handleChange} name='amount' value={Research.amount} placeholder='amount'/>
                </div>
                <div className='input-field'>
                    <input type='text' onChange={handleChange} name='date' value={Research.date} placeholder='date'/>
                </div>
                
                <div className='submit'>
                    <button onClick={handleSubmit} className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Researches;