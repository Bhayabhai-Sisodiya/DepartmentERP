import React, { Component, useState } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import Content from './content';
import './dashboard.css';


const Dashboard = ({Token}) => {
    const [category,setCategory]=useState ('')

    const onChangeCategory=(_category)=>{
        setCategory(_category);
    }
  return (
    <>
                <Header/>
                <div className='dashboard'>
                    <Sidebar onChangeCategory={onChangeCategory}/>
                    <Content category={category} token = {Token}/>
                </div>
            </>
  )
}


export default Dashboard;

