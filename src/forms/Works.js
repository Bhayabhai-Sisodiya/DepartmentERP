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


const Works = ({alterSidebar}) => {
    const [Work, setWork] = useState({
        detail:"", client:"",cost:"",faculty_involved:""
    });
    
    const componentRef = useRef();
    
    const handleChange = (e) => {
        //window.alert(e.target.value);
        setWork({...Work,[e.target.name]:e.target.value});
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
        const result=await axios.post("http://localhost:5000/delete_work", newData,{
          headers:{"x-auth-token":localStorage.getItem("Token")}
        });
        const uiData=Data.filter(i=>i._id !==item);
        setData(uiData);
    }


    //handle update
    const handleUpdate=async (item)=>{
        let newData = {
            "details":item.detail, 
            "client":item.client,
            "cost":item.cost,
            "faculty_involved":item.faculty_involved
    }
    setWork(newData);
    setShow(true);

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
        setWork({
            detail:"", client:"",cost:"",faculty_involved:""
        });
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
            <Searchbar value={serchQuery} alterSidebar={alterSidebar} onChange={handleSearch}/>
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
                                documentTitle="consultancy work"
                                pageStyle="print"
                            />
                        </div>
                        <div className='print-btn-to-excel printBtn'><SiMicrosoftexcel/><span>to excel</span></div>            
                    </div>  
                </div>        
            :null}

            <div className='table-show-outer-box'>
            <h2>consultancy work</h2>
            <div ref={componentRef} className='showData' >
            <table>
                <tr>
                    <th>detail</th>
                    <th>client</th>
                    <th>cost</th>
                    <th>faculty involved</th>
                    <th>edit</th>
                </tr>
                  {filtered.map((item, i) => (
                    <tr key={i}>
                        <td>{item.details}</td>
                        <td>{item.client}</td>
                        <td>{item.cost}</td>
                        <td>{item.faculty_involved}</td>
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
                <div className='input-grid'>
                    <div className='input-field'>
                        <input onChange={handleChange} name='detail' type='text' value={Work.detail} placeholder='detail'/>
                    </div>
                    <div className='input-field'>
                        <input onChange={handleChange} name='client' type='text' value={Work.client} placeholder='client'/>
                    </div>
                </div> 
                <div className='input-grid'>   
                    <div className='input-field'>
                        <input onChange={handleChange} name='cost' type='text' value={Work.cost} placeholder='cost'/>
                    </div>
                    <div className='input-field'>
                        <input onChange={handleChange} name='faculty_involved' type='text' value={Work.faculty_involved} placeholder='faculty involved'/>
                    </div>
                </div>
                <div className='input-grid'>
                    <div className='file-input'>
                        <p className='input-title'>add a certificate:</p>
                        <input type='file' onChange={handleChange} name='certificate' value={Work.certificate}/>
                    </div>
                    <div className='file-input'>
                        <p className='input-title'>add a report:</p>
                        <input type='file' onChange={handleChange} name='report' value={Work.report}/>
                    </div>
                </div>
                <div className='submit'>
                    <button onClick={handleSubmit} className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Works;