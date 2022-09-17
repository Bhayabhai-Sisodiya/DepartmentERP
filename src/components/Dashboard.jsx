import React, { Component, useState } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import Content from './content';
import './dashboard.css';
import Profile from '../forms/Profile';

const Dashboard = () => {
    const [category,setCategory]=useState ('profile')

    const onChangeCategory=(_category)=>{
        setCategory(_category);
    }
  return (
    <>
                <Header/>
                <div className='dashboard'>
                    <Sidebar onChangeCategory={onChangeCategory}/>
                    <Content category={category}/>
                    {/* <Profile/> */}
                </div>
            </>
  )
}


export default Dashboard;

