import React, { Component, useState } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import Content from './content';
import './dashboard.css';


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
                </div>
            </>
  )
}


export default Dashboard;

