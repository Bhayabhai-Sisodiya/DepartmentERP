import React, { useState,useEffect,useRef } from 'react';
import './form.css';
import '../components/showData.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { HiPrinter } from "react-icons/hi";
import Searchbar from '../components/searchbar';
import axios from 'axios';
import ReactToPrint from 'react-to-print';


const Book_publish = () => {
    const [Book, setBook] = useState({
        title:"",author:"",co_author:"",publication_date:"",publisher:"",ISBN:""
    });

    const componentRef = useRef();

    //onclick add new button - show form
    const [Show,setShow] = useState(false) 
    
    // function for changing the states
    const handleChange = (e) => {
        //window.alert(e.target.value);
        setBook({...Book,[e.target.name]:e.target.value});
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
        const result=await axios.post("http://localhost:5000/delete_book", newData,{
          headers:{"x-auth-token":localStorage.getItem("Token")}
        });
        const uiData=Data.filter(i=>i._id !==item);
        setData(uiData);
    }

    //handle update
    const handleUpdate=async (item)=>{
        let newData = {
            "title":item.title, 
            "author":item.author,
            "co_author":item.co_author,
            "publication_date":item.publication_date,
            "publisher":item.publisher,
            "ISBN":item.ISBN
    }
    setBook(newData);
    setShow(true);

    }

    const handleSubmit =async (e)=> {
        const newData = {
            "title":Book.title, 
            "author":Book.author,
            "co_author":Book.co_author,
            "publication_date":Book.publication_date,
            "publisher":Book.publisher,
            "ISBN":Book.ISBN
      }
        const result=await axios.post("http://localhost:5000/addbook",newData,{
          
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
        setBook({
            title:"",author:"",co_author:"",publication_date:"",publisher:"",ISBN:""
        });
    }

    //fetching data from the database
    const [Data,setData]=useState([]);
    useEffect(()=>{
        fetchData()
    },[]);
    
    const fetchData=async()=>{
        
        const response =await axios.post("http://localhost:5000/getbook",{},
        {
            headers:{"x-auth-token":localStorage.getItem("Token")}
        });
        //const resp=response.json();
        console.log(response.data);
        setData(response.data);
    }

    let filtered=Data;
    if(serchQuery){
        filtered=Data.filter(m=> m.author.toLowerCase().includes(serchQuery.toLowerCase()));
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
                <h2>book publication</h2>
                    <table>
                        <tr>
                            <th>book title</th>
                            <th>author</th>
                            <th>co author</th>
                            <th>publication date</th>
                            <th>publisher</th>
                            <th>ISBN</th>
                            <th>edit</th>
                        </tr>                      
                        {filtered.map((item, i) => (
                            <tr key={i}>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>{item.co_author[0]}</td>
                                <td>{item.publication_date}</td>
                                <td>{item.publisher}</td>
                                <td>{item.ISBN}</td>
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
                documentTitle="book publish"
                pageStyle="print"
                />            
                </div>
            {/* add book publish details */}
            {Show?<div className='forms'>
                <div className='form-header'>
                    <h3>add book publication details</h3>
                    <div className='close-btn' onClick={() =>setShow(false)}>
                        <AiOutlineClose/>
                    </div>
                </div>
                <div className='input-grid'>
                    <div className='input-field'>
                        <input type='text' onChange={handleChange} name='title' value={Book.title} placeholder='book Title'/>
                    </div>
                    <div className='input-field'>
                    <p className='input-title'>publication date:</p>
                    <input type='date' onChange={handleChange} name='publication_date' value={Book.publication_date} placeholder='publication date'/>
                    </div>
                </div>

                <div className='input-grid'>
                    <div className='input-field'>
                            <input type='text' onChange={handleChange} name='author' value={Book.author} placeholder='author'/>
                        </div>
                    <div className='input-field'>
                        <input type='text' onChange={handleChange} name='co_author' value={Book.co_author} placeholder='co author'/>
                    </div>
                </div>    

                <div className='input-grid'>
                    <div className='input-field'>
                        <input type='text' onChange={handleChange} name='publisher' value={Book.publisher} placeholder='publisher'/>
                    </div>
                    <div className='input-field'>
                        <input type='text' onChange={handleChange} name='ISBN' value={Book.ISBN} placeholder='ISBN'/>
                    </div>
                </div>
                <div className='submit'>
                    <button onClick={handleSubmit} className="btn" type="submit">Submit</button>
                </div>
                
            </div>:null}
        </>
     );
}
 
export default Book_publish;