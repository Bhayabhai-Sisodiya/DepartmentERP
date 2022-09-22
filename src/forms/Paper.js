import React, { useState,useEffect,useRef } from 'react';
import './form.css';
import '../components/showData.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { HiPrinter } from "react-icons/hi";
import axios from 'axios';
import ReactToPrint from 'react-to-print';


const Papers = () => {
    // const downloadData = () => {
    //     // using Java Script method to get PDF file
    //     fetch('SamplePDF.pdf').then(response => {
    //         response.blob().then(blob => {
    //             // Creating new object of PDF file
    //             const fileURL = window.URL.createObjectURL(blob);
    //             // Setting various property values
    //             let alink = document.createElement('a');
    //             alink.href = fileURL;
    //             alink.download = 'SamplePDF.pdf';
    //             alink.click();
    //         })
    //     })
    // } 

    const [Paper, setPaper] = useState({
        type1:"national", title:"",volume:"",issue:"",year:"",author:"",type2:"conference",indexing:"scoops",ISBN:""
    });

    const componentRef = useRef();
    
    //onclick add new button - show form
    const [Show,setShow] = useState(false) ;

    // function for changing the states
    const handleChange = (e) => {
        //window.alert(e.target.value);
        setPaper({...Paper,[e.target.name]:e.target.value});
    }

    const handleSubmit =async (e)=> {
        const newData = {
            "type1":Paper.type1, 
            "title":Paper.title,
            "volume":Paper.volume,
            "issue":Paper.issue,
            "year":Paper.year,
            "author":Paper.author,
            "type":Paper.type2,
            "indexing":Paper.indexing,
            "ISBN":Paper.ISBN
      }
        const result=await axios.post("http://localhost:5000/addpaper", newData,{
          
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
        
        const response =await axios.post("http://localhost:5000/getpaper",{},
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

            <div  className='table-show-outer-box'>
                <div ref={componentRef} className='showData' >
                <h2>papers</h2>
                    <table id='PrintData'>
                        <tr>
                            <th>national/international</th>
                            <th>title</th>
                            <th>volume</th>
                            <th>issue</th>
                            <th>year</th>
                            <th>author</th>
                            <th>conference/journal</th>
                            <th>indexing</th>
                            <th>ISBN</th>
                        </tr>                      
                        {Data.map((item, i) => (
                            <tr key={i}>
                                <td>{item.type1}</td>
                                <td>{item.title}</td>
                                <td>{item.volume}</td>
                                <td>{item.issue}</td>
                                <td>{item.year}</td>
                                <td>{item.author[0]}</td>
                                <td>{item.type}</td>
                                <td>{item.indexing}</td>
                                <td>{item.ISBN}</td>
                            </tr>
                        ))}  
                    </table>
                </div>

                {/* print button  */}

                <ReactToPrint
                trigger={()=>{
                    return <button className='download-btn' ><HiPrinter/>print </button>
                }}
                content={()=>componentRef.current}
                documentTitle="paper"
                pageStyle="print"
                />
            </div>

            {/* add paper details */}
            {Show?<div className='forms'>
                <div className='form-header'>
                    <h3>paper details</h3>
                
                <div className='close-btn' onClick={() =>setShow(false)}>
                <AiOutlineClose/>
                </div>
                </div>
                <div className='input-field'>
                    <p className='input-title'>choose a type:</p>
                    <select onChange={handleChange} name='type1' value={Paper.type1} className='select-options'>
                        <option value="national">national</option>
                        <option value="international">international</option>
                    </select>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} type='text' name='title' value={Paper.title} placeholder='Paper Title'/>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} type='text' name='volume' value={Paper.volume} placeholder='volume'/>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} type='text' name='issue' value={Paper.issue} placeholder='issue'/>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} type='text' name='year' value={Paper.year} placeholder='year'/>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} type='text' name='author' value={Paper.author} placeholder='author'/>
                </div>
                <div className='input-field'>
                    <p className='input-title'>choose a type:</p>
                    <select onChange={handleChange} name='type2' value={Paper.type2} className='select-options'>
                        <option value="conference">conference</option>
                        <option value="journal">journal</option>
                    </select>
                </div>
                <div className='input-field'>
                    <p className='input-title'>indexing:</p>
                    <select onChange={handleChange} name='indexing' value={Paper.indexing} className='select-options'>
                        <option value="scoops">scoops</option>
                        <option value="ugc">ugc</option>
                        <option value="wos">web of science</option>
                        <option value="other">other</option>
                    </select>
                </div>
                <div className='input-field'>
                    <input onChange={handleChange} type='text' name='ISBN' value={Paper.ISBN} placeholder='ISBN'/>
                </div>
                <div className='submit'>
                    <button onClick={handleSubmit} className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Papers;