import React, { useState } from 'react';
import './dashboard.css';
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';



const Header = ({setToken}) => {
    // click to logout 
    const [logout,setLogout] = useState();
    const navigate = useNavigate();
    const handleLogout =()=> {
        setToken("");
        localStorage.removeItem('Token');
        navigate("/login");
    }
    return (
    <>
    <div className='header'>
      <h1 className='header_title'>Computer Department ERP System</h1>

      {/* logout button */}
      <button className='logout-btn' onClick={handleLogout} title="logout"><FiLogOut/></button>
    </div>
        
    </>
        
      );
}
 
export default Header;
