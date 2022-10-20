import React, { useState,useEffect,useRef } from 'react';
import './form.css';
import '../components/showData.css';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { HiPrinter } from "react-icons/hi";
import { VscFilePdf } from "react-icons/vsc";
import { SiMicrosoftexcel } from "react-icons/si";
import axios from 'axios';
import ReactToPrint from 'react-to-print';
import Searchbar from '../components/searchbar'
import { x } from 'joi';

const Papers = ({alterSidebar}) => {

    const [Paper, setPaper] = useState({
        type1:"national", title:"",volume:"",issue:"",year:"",author:"",type2:"conference",indexing:"scoops",ISBN:"",certificate:"",paper:""
    });

    const componentRef = useRef();
    
    //onclick add new button - show form
    const [Show,setShow] = useState(false) ;

    //function for show popup when click on print button
    const [ShowPopup,setShowPopup] = useState(false) ;
    const handlePopup=()=>{
        setShowPopup(!ShowPopup)
    }   

    // function for changing the states
    const handleChange = (e) => {
        setPaper({...Paper,[e.target.name]:e.target.value});
    }

    //search handle
    const [searchQuery,setSearchQuery]=useState("");
    const handleSearch=(query)=>{
        setSearchQuery(query);
        console.log(query);
    }

     //handel delete
     const handleDelete=async (item)=>{
        const newData = {"id":item}
        const result=await axios.post("http://localhost:5000/delete_paper", newData,{
          headers:{"x-auth-token":localStorage.getItem("Token")}
        });
        const uiData=Data.filter(i=>i._id !==item);
        setData(uiData);
    }

    //handle update
    const handleUpdate=async (item)=>{
        let newData = {
            "type1":item.type1, 
            "title":item.title,
            "volume":item.volume,
            "issue":item.issue,
            "year":item.year,
            "author":item.author,
            "type":item.type2,
            "indexing":item.indexing,
            "ISBN":item.ISBN,
            "certificate":item.certificate,
            "paper":item.paper
    }
    setPaper(newData);
    setShow(true);

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
            "ISBN":Paper.ISBN,
            "certificate":Paper.certificate,
            "paper":Paper.paper
      }
        const result=await axios.post("http://localhost:5000/addpaper", newData,{
          
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
        setPaper({
            type1:"national", title:"",volume:"",issue:"",year:"",author:"",type2:"conference",indexing:"scoops",ISBN:"",certificate:"",paper:""
        });
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

    let filtered=Data;
    if(searchQuery){
        filtered=filtered.filter(m=> m.author[0].toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    const filter_items = [
        {
            "id":1,
            "name":"national",
            "isChecked":false
        },
        {
            "id":2,
            "name":"international",
            "isChecked":false
        },
        {
            "id":3,
            "name":"conference",
            "isChecked":false
        },
        {
            "id":4,
            "name":"journal",
            "isChecked":false
        },
        {
            "id":5,
            "name":"scopus",
            "isChecked":false
        },
        {
            "id":6,
            "name":"ugc",
            "isChecked":false
        },
        {
            "id":7,
            "name":"web of science",
            "isChecked":false
        }
    ];

     const handleFilter = (x) => {
        
         filter_items.map(m=>{
        if(m.id===x.id)
            {
            m.isChecked= !(m.isChecked);
            } 
        })
    }
        
    const [filtered_1,setFiltered_1]=useState([]);
    let ram;
   
    
    if(filter_items[0].id==1 || filter_items[1].id==2){
        if(filter_items[0].isChecked==true || filter_items[1].isChecked==true){
            for(let i=0;i<2;i++){
             filtered=filtered.filter(m=> m.type1==filter_items[i].name);
             setFiltered_1([...filtered_1,filtered]);
             console.log(setFiltered_1);
            }
        }
    }

    return ( 
        <>
            {/* searchbar component */}
            <Searchbar value={searchQuery} alterSidebar={alterSidebar} onChange={handleSearch} filterItem={filter_items} onFilter={handleFilter}/>

            {/* add new button / excel button / print button*/}
            <div className='add-btn'>
                <button className='btn' onClick={() =>{setShow(true); clearform()}}><AiOutlinePlus /><span>add new</span></button>
                <button className='btn upload-excel'><AiOutlinePlus /><span>upload excel file</span></button>
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
                                documentTitle="paper"
                                pageStyle="print"
                            />
                        </div>
                        <div className='print-btn-to-excel printBtn'><SiMicrosoftexcel/><span>to excel</span></div>            
                    </div>  
                </div>        
            :null}

            {/* showing the fetched data */}
            <div  className='table-show-outer-box'>
                <h2>papers</h2>
                <div ref={componentRef} className='showData' >
                    
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
                            <th>certificate</th>
                            <th>paper</th>
                            <th>edit</th>
                        </tr>                      
                        {filtered.map((item, i) => (
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
                                <td>{item.certificate}</td>
                                <td>{item.paper}</td>
                                <td>
                                <button onClick={()=>handleDelete(item._id)} className=''>Delete</button>
                                <button onClick={()=>{handleDelete(item._id);handleUpdate(item) }} >Update</button>
                                </td>
                            </tr>
                        ))}  
                    </table>
                </div>

                 
                
                {/* <button className='download-btn' onClick={handleDropdown}><HiPrinter/><span>print</span></button> */}

                {/* <ReactToPrint
                trigger={()=>{
                    return <button className='download-btn' onClick={handleDropdown}><HiPrinter/>print </button>
                }}
                content={()=>componentRef.current}
                documentTitle="paper"
                pageStyle="print"
                /> */}
            </div>

            {/* add paper details */}
            {Show?
            <div className='forms paper-form'>
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
                <div className='input-grid'>
                    <div className='input-field'>
                        <input onChange={handleChange} type='text' name='title' value={Paper.title} placeholder='Paper Title'/>
                    </div>
                    <div className='input-field'>
                    <input onChange={handleChange} type='text' name='author' value={Paper.author} placeholder='author'/>
                    </div>
                </div>
                <div className='input-grid'>
                    <div className='input-field'>
                        <input onChange={handleChange} type='text' name='issue' value={Paper.issue} placeholder='issue'/>
                    </div>
                    <div className='input-field'>
                            <input onChange={handleChange} type='text' name='volume' value={Paper.volume} placeholder='volume'/>
                    </div>
                </div>
                <div className='input-field file-input'>
                    <p className='input-title'>paper publication date:</p>
                    <input onChange={handleChange} type='date' name='year' value={Paper.year} placeholder='year'/>
                </div>
                
                <div className='input-grid'>
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
                            <option value="scoops">scopus</option>
                            <option value="ugc">ugc</option>
                            <option value="wos">web of science</option>
                            <option value="other">other</option>
                        </select>
                    </div>
                </div>    
                <div className='input-field'>
                    <input onChange={handleChange} type='text' name='ISBN' value={Paper.ISBN} placeholder='ISBN'/>
                </div>
                <div className='input-grid'>
                    <div className='file-input'>
                        <p className='input-title'>add a certificate:</p>
                        <input type='file' onChange={handleChange} name='certificate' value={Paper.certificate}/>
                    </div>
                    <div className='file-input'>
                        <p className='input-title'>add a paper:</p>
                        <input type='file' onChange={handleChange} name='paper' value={Paper.paper}/>
                    </div>
                </div>
                <div className='submit'>
                    <button onClick={handleSubmit} className="btn" type="submit">Submit</button>
                </div>
                
            </div>
            :null}
        </>
     );
}
 
export default Papers;