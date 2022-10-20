import React, { useState,useEffect,useRef } from 'react';
import './form.css';
import '../components/showData.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { HiPrinter } from "react-icons/hi";
import { VscFilePdf } from "react-icons/vsc";
import { SiMicrosoftexcel } from "react-icons/si";
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import Searchbar from '../components/searchbar';

const Tours = () => {
    const [Tour, setTour] = useState({
        date:"",faculty_name:"", place:"",no_of_student:""
    });
    
    const componentRef = useRef();
    
    const handleChange = (e) => {
        //window.alert(e.target.value);
        setTour({...Tour,[e.target.name]:e.target.value});
    }

    //function for show popup when click on print button
    const [ShowPopup,setShowPopup] = useState(false) ;
    const handlePopup=()=>{
        setShowPopup(!ShowPopup)
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
        const result=await axios.post("http://localhost:5000/delete_study_tour", newData,{
          headers:{"x-auth-token":localStorage.getItem("Token")}
        });
        const uiData=Data.filter(i=>i._id !==item);
        setData(uiData);
    }

    //handle update
    const handleUpdate=async (item)=>{
        let newData = {
            "date":item.date,
            "faculty_name":item.faculty_name, 
            "place":item.place,
            "no_of_students":item.no_of_student
    }
    setTour(newData);
    setShow(true);

    }

    const handleSubmit =async (e)=> {
            
        const newData={
            "date":Tour.date,
            "faculty_name":Tour.faculty_name, 
            "place":Tour.place,
            "no_of_students":Tour.no_of_student
        }
        const result=await axios.post("http://localhost:5000/addtour", newData
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
        setTour({
            date:"",faculty_name:"", place:"",no_of_student:""
        });
    }

    //fetching data from the database
    const [Data,setData]=useState([]);
    useEffect(()=>{
        fetchData()
    },[]);
    const fetchData=async()=>{
        
        const response =await axios.post("http://localhost:5000/gettour",{},
        {
            headers:{"x-auth-token":localStorage.getItem("Token")}
        });
        //const resp=response.json();
        console.log(response.data);
        setData(response.data);
    } 

    let filtered=Data;
    if(serchQuery){
        filtered=Data.filter(m=> m.faculty_name.toLowerCase().includes(serchQuery.toLowerCase()));
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
                <button className='download-btn' onClick={handlePopup}><HiPrinter/><span>print</span></button>
            </div>

            {/* popup-box for pdf & excel */}
            {ShowPopup?
                <div className='popup-box'>
                    <div className='close-btn' onClick={() =>setShowPopup(false)}><AiOutlineClose/></div>
                    <div className='print-btns'>
                        <div className='print-btn-to-pdf printBtn'>
                            <ReactToPrint
                                trigger={()=>{
                                return <button onClick={() =>{setShowPopup(false)}} ><VscFilePdf/><span>to pdf</span></button>
                                }}
                                content={()=>componentRef.current}
                                documentTitle="Tours"
                                pageStyle="print"
                            />
                        </div>
                        <div className='print-btn-to-excel printBtn'><SiMicrosoftexcel/><span>to excel</span></div>            
                    </div>  
                </div>        
            :null}

            <div className='table-show-outer-box'>
            <h2>study tours</h2>
            <div ref={componentRef} className='showData' >
            <table>
                <tr>
                    <th>date</th>
                    <th>tour guide</th>
                    <th>place</th>
                    <th>number of student</th>
                    <th>edit</th>
                </tr>
                  {filtered.map((item, i) => (
                    <tr key={i}>
                        <td>{item.date}</td>
                        <td>{item.faculty_name}</td>
                        <td>{item.place}</td>
                        <td>{item.no_of_students}</td>
                        <td>
                                <button onClick={()=>handleDelete(item._id)} className=''>Delete</button>
                                <button onClick={()=>{handleDelete(item._id);handleUpdate(item) }} >Update</button>
                                </td>
                    </tr>
                ))}  
            </table>
            </div>
                
                {/* print button    onClick={downloadPdfDocument}   */}
                {/* <ReactToPrint
                trigger={()=>{
                    return <button className='download-btn' ><HiPrinter/>print </button>
                }}
                content={()=>componentRef.current}
                documentTitle="events"
                pageStyle="print"
                /> */}
            </div>


            {/* add paper details */}
            {Show?<div className='forms'>
                <div className='form-header'>
                    <h3>add study tours details</h3>
                    <div className='close-btn' onClick={() =>setShow(false)}>
                        <AiOutlineClose/>
                    </div>
                </div>

            
                <div className='input-field'>
                    <p className='input-title'>tour date:</p>
                    <input onChange={handleChange} name="date" type='date' value={Tour.date} />
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} name="faculty_name" type='text' value={Tour.faculty_name} placeholder='tour guide'/>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} name="place" type='text' value={Tour.place} placeholder='place'/>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} name="no_of_student" type='text' value={Tour.no_of_student} placeholder='number of students'/>
                </div>
                
                <div className='submit'>
                    <button onClick={handleSubmit} className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
} 
export default Tours;