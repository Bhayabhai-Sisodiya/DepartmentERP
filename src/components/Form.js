import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Joi } from 'joi-browser';
import pic from "../images/Side-img.webp";
import bg from "../images/bvm.jpg";
import { BsEnvelopeFill } from "react-icons/bs";
import {BsLockFill} from "react-icons/bs";



export default function Form() {

  // States for registration
  //const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conpass, setconpass] = useState('');
  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  /* const schema=yup.object().shape({
    vemail : yup.string().required().email(),
    vpassword: yup.string().required(),
    vconfpassword: yup.string().required()
}); */

  /* const App =()=>
  {
  
      const{handleSubmit}=useForm({
          resolver:yupResolver(schema)
      })
  
  } */



  function validation(email, password, confpass) {
    const schema = Joi.object({
      vemail: Joi.String().required().email(),
      vpassword: Joi.String().required(),
      vconfpassword: Joi.String().required()
    });


    return schema.validate({
      vemail: email,
      vpassword: password,
      vconfpassword: confpass

    });
  }


  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };


  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };


  const handleConPass = (e) => {
    setconpass(e.target.value);
    setSubmitted(false);
  };


  const handleSubmit = async (e) => {


    if (password != "" && password == conpass) {
      const { err } = validation(email, password, conpass);
      if (err) {
        alert("Please entered email or password correctly");
        return;
      }
      else {
        setSubmitted(true);

        const res = await fetch("http://localhost:5000/registration", {

          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({

            "username": email,
            "password": password
          })
        })

      }

    }
    else {
      alert("Please enter password correctly");

    }
    // const mailformat = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";
    // e.preventDefault();
    // if (email === '' || password === '' || conpass === '') {
    //   setError(true);
    // }
    // if (password === conpass) {
    //     setError(true);
    //   }
    // if(email.match(mailformat)) {
    //     setSubmitted(true);
    // }



  };


  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>successfully registered!!</h1>
      </div>
    );
  };


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

  /*  const PostData= async (e)=>{
     e.preventDefault();
 
     const res=await  fetch("/registration",{
 
         method:"POST",
         headers:{
             "Content-Type" :"application/json"
         },
         body:JSON.stringify({
 
             "username":email,
             "password":password
         })
     })
   } */

  return (
    <React.Fragment>/
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <div className="form-box">
        <div className='left-part'>
          <img src={pic} alt='Registration image'></img>
        </div>
        <div className='right-part'>
          <h1 className='form-heading'>Faculty Registration</h1>
          <div className='registration-form'>
            <form onSubmit={handleSubmit} method="POST">
              <div className='input-detail'>
                <BsEnvelopeFill/>
                <input onChange={handleEmail} className="input" value={email} type="email" placeholder='Email' required/>
              </div>

              <div className='input-detail'>
                <BsLockFill/>
                <input onChange={handlePassword} className="input" value={password} type="password" placeholder='Password' required/>
              </div>

              <div className='input-detail'>
                <BsLockFill/>
                <input onChange={handleConPass} className="input" value={conpass} type="password" placeholder='Confirm Password' required/>
              </div>

              <div className='submit-btn'>
              <button className="btn" type="submit">Submit</button>
              </div>
            </form>
            <p>Already have an account? <Link to='/login'>Login Here.</Link></p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}