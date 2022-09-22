import React, { useState,useEffect,useRef } from 'react';
import './form.css';
import '../components/showData.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { HiPrinter } from "react-icons/hi";
import axios from 'axios';
import ReactToPrint from 'react-to-print';

const Events = () => {
    const [Event, setEvent] = useState({
        type:"Seminar", cordinator:"",title:"",start_date:"",end_date:"",no_of_participants:"",sponsor:"",for_whome:"Faculties",report:""
    });

    const componentRef = useRef();
    
    //onclick add new button - show form
    const [Show,setShow] = useState(false) 
    
    // function for changing the states
    const handleChange = (e) => {
        //window.alert(e.target.value);
        setEvent({...Event,[e.target.name]:e.target.value});
    }

    const handleSubmit =async (e)=> {
        const newData = {
            "type":Event.type, 
            "cordinator":Event.cordinator,
            "title":Event.title,
            "start_date":Event.start_date,
            "end_date":Event.end_date,
            "no_of_participants":Event.no_of_participants,
            "sponsor":Event.sponsor,
            "for_whome":Event.for_whome,
            "report":Event.report
      }
        const result=await axios.post("http://localhost:5000/addevent", newData,{
          
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
        // setToken(localStorage.getItem("Token"))
        fetchData()
    },[]);
    
    const fetchData=async()=>{
        
        const response =await axios.post("http://localhost:5000/getevent",{},
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
                <h2>events</h2>
                    <table>
                        <tr>
                            <th>type</th>
                            <th>coordinator</th>
                            <th>title</th>
                            <th>start date</th>
                            <th>end date</th>
                            <th>number of participants</th>
                            <th>sponsors</th>
                            <th>for whom</th>
                            <th>report</th>
                        </tr>                      
                        {Data.map((item, i) => (
                            <tr key={i}>
                                <td>{item.type}</td>
                                <td>{item.cordinator}</td>
                                <td>{item.title}</td>
                                <td>{item.start_date}</td>
                                <td>{item.end_date}</td>
                                <td>{item.no_of_participants}</td>
                                <td>{item.sponsor[0]}</td>
                                <td>{item.for_whome}</td>
                                <td>{item.report}</td>
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
                />            
            </div>

            {/* add Event details */}
            {Show?<div className='forms event-form'>
                <div className='form-header'>
                    <h3>Event details</h3>
                    <div className='close-btn' onClick={() =>setShow(false)}>
                        <AiOutlineClose/>
                    </div>
                </div>
                <div className='input-field'>
                    <p className='input-title'>choose a type:</p>
                    <select name='type' onChange={handleChange} value={Event.type} className='select-options'>
                        <option value="Seminar">Seminar</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Conference">Conference</option>
                        <option value="Webinar">Webinar</option>
                        <option value="expert talk">expert talk</option>
                    </select>
                </div>
                <div className='input-field'>
                    <input type='text' onChange={handleChange} name='title' value={Event.title} placeholder='title'/>
                </div>
                <div className='input-field'>
                    <input type='text' onChange={handleChange} name='cordinator' value={Event.cordinator} placeholder='coordinator'/>
                </div>
                <div className='input-field'>
                    <input type='text' onChange={handleChange} name='start_date' value={Event.start_date} placeholder='start date'/>
                </div>
                <div className='input-field'>
                    <input type='text' onChange={handleChange} name='end_date' value={Event.end_date} placeholder='end date'/>
                </div>
                <div className='input-field'>
                    <input type='text' onChange={handleChange} name='no_of_participants' value={Event.no_of_participants} placeholder='number of participants'/>
                </div>
                <div className='input-field'>
                    <input type='text' onChange={handleChange} name='sponsor' value={Event.sponsor} placeholder='sponsors'/>
                </div>
                <div className='input-field'>
                    <p className='input-title'>choose a type:</p>
                    <select name='for_whome' onChange={handleChange} value={Event.for_whome} className='select-options'>
                        <option value="faculties">faculties</option>
                        <option value="students">student</option>
                    </select>
                </div>
                <div className='input-field file-input'>
                    <p className='input-title'>add a report:</p>
                    <input type='file' onChange={handleChange} name='report' value={Event.report}/>
                </div>
                <div className='submit'>
                    <button onClick={handleSubmit} className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Events;