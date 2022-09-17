import React, { useState } from 'react';
import { Link, Navigate, useHistory } from 'react-router-dom';
import pic from "../images/Side-img.webp";
import bg from "../images/bvm.jpg"; 
import { BsEnvelopeFill } from "react-icons/bs";
import {BsLockFill} from "react-icons/bs";
// import "../App.css"
// import "../App.css"


export default function Form() {
 
  // States for registration
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
 
  // Handling the name change
  /* const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  }; */
 
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if ( email === '' || password === '') {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
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
            <form onSubmit={handleSubmit} method="POST">
              <div className='input-detail'>
                <BsEnvelopeFill/>
                <input onChange={handleEmail} className="input" value={email} type="email" placeholder='Email'/>
              </div>

              <div className='input-detail'>
                <BsLockFill/>
                <input onChange={handlePassword} className="input" value={password} type="password" placeholder='Password'/>
              </div>

              {/* <div className='input-detail'>
                <BsLockFill/>
                <input onChange={handleConPass} className="input" value={conpass} type="password" placeholder='Confirm Password'/>
              </div> */}

              <div className='submit-btn'>
              <button className="btn" type="submit">Submit</button>
              </div>
            </form>
            <p>New User? <Link to='/signup'>Register here.</Link></p>
          </div>
        </div>
      </div> 
    </React.Fragment>
  );
}