import React, { useState,createContext,useContext} from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import pic from "../images/Side-img.webp";
import bg from "../images/bvm.jpg"; 
import { BsEnvelopeFill } from "react-icons/bs";
import {BsLockFill} from "react-icons/bs";
import axios from 'axios';
import TokenContext from './tokenContext';

// import "../App.css";
// import "../App.css"



export default function LoginForm({setToken}) {
 
  //Radio button user type 
  const [selectedPath,setSelectedPath] = useState('faculty');

  // States for registration 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate(); 

  // Handling the name change
  /* const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  }; */
 
  //handling radio buttons
  const handleRadio = (e) => {
    setSelectedPath(e.target.value);
    // window.alert(e.target.value)
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };
 
  // Handling the form submission
  const handleSubmit =async (e) => {
    //e.preventDefault();
    if ( email === '' || password === '') {
      setError(true);
    } 
    else if(selectedPath === 'faculty'){
      /* const requestOptions={
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({username:email,password:password})
      }
      const res=await fetch('http://localhost:5000/login',requestOptions) */
      //setSubmitted(true);
      //setError(false);
      const res=await axios.post("http://localhost:5000/login", {
        username: email,
        password: password,
      }); 

      if(res.status===401 ){
        window.alert("Please try again!");
        console.log("Some error accured");
      }
      else if(res.status===409){
        window.alert("No user found!");
        console.log("User not found");
      }
      else if(res.status===200){
        console.log(res)
        window.alert("Successfull login!")
        console.log("login successfully");

        console.log(res.data["x-auth-token"]);
        setToken(res.data["x-auth-token"]);
        localStorage.setItem('Token',res.data["x-auth-token"]);
        navigate('/Faculty_dashboard');
        
      }
      else{
        window.alert("You have not approved by admin!")
        console.log("adminin-aproval:false");
      }
  }
  else if(selectedPath === 'admin'){
    const res=await axios.post("http://localhost:5000/admin_login", {
        username: email,
        password: password,
      }); 

      if(res.status===401 ){
        window.alert("Please try again!");
        console.log("Some error accured");
      }
      else if(res.status===409){
        window.alert("No user found!");
        console.log("User not found");
      }
      else if(res.status===200){
        console.log(res)
        window.alert("Successfull login!")
        console.log("login successfully");

        console.log(res.data["x-auth-token"]);
        setToken(res.data["x-auth-token"]);
        localStorage.setItem('Token',res.data["x-auth-token"]);
        navigate('/dashboard');
        
      }
      else{
        window.alert("You have not approved by admin!")
        console.log("adminin-aproval:false");
      }
  }
  };
 
  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>successfully Logged in as faculty!!</h1>
      </div>
    );
  };
 
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };
 
  return (
    <React.Fragment>
      {/* Calling the error methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
 
      <div className="form-box">
        <div className='left-part'>
          <img src={pic} alt='Registration image'></img>
        </div>
        <div className='right-part'>
          <h1 className='form-heading'>User Login</h1>
          <div className='registration-form'>
            {/* <form  method="POST"> */}
            <div className='radio-detail'>
              <h3 className='user-type'>user type</h3>
              <div className='radio-btn'>
              <div className='btn'>
                <input className="input" onChange={handleRadio} name='user' value="faculty" type="radio" required/><p>faculty</p></div>
              <div className='btn'>  
                <input className="input" onChange={handleRadio} name='user' value="admin" type="radio" required/><p>admin</p></div>
              </div>
              </div>
              <div className='input-detail'>
                <BsEnvelopeFill/>
                <input onChange={handleEmail} className="input" value={email} type="email" placeholder='Email'/>
              </div>

              <div className='input-detail'>
                <BsLockFill/>
                <input onChange={handlePassword} className="input" value={password} type="password" placeholder='Password'/>
              </div>

              <div className='submit-btn'>
              <button onClick={()=>handleSubmit()} className="btn" type="submit">Submit</button>
              </div>
            {/* </form> */}
            <p className='form-para'>New User? <Link to='/signup'>Register here.</Link></p>
          </div>
        </div>
      </div> 
    </React.Fragment>
  );
}