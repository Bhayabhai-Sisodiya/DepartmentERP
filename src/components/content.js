import React from 'react';
import './dashboard.css';
import Searchbar from './searchbar';
import Profile from '../forms/Profile';
import Papers from '../forms/Paper';
import Events from '../forms/Events';
import Grants from '../forms/Grants';
import Workshops from '../forms/Workshops';
import Book_publish from '../forms/Book_publish';
import Patents from '../forms/Patents';
import Phds from '../forms/Phds';
// import Researches from '../forms/Researches';
import Tours from '../forms/Tours';
import Works from '../forms/Works';
import Expert_talks from '../forms/Expert_talks';


const Content = ({category,alterSidebar}) => {

    const map1={
        'profile':<Profile/>,
        'papers' :<Papers alterSidebar={alterSidebar}/> ,
        'event organized' :<Events alterSidebar={alterSidebar} />,
        'grants' : <Grants alterSidebar={alterSidebar}/>,
        'event attended' : <Workshops alterSidebar={alterSidebar}/>,
        'book publication' :<Book_publish alterSidebar={alterSidebar}/>,
        'patents' : <Patents alterSidebar={alterSidebar}/>,
        'qualification' : <Phds alterSidebar={alterSidebar}/>,
        // 'research projects' : <Researches />,
        'study tours' :<Tours alterSidebar={alterSidebar}/>,
        'consultancy work' : <Works alterSidebar={alterSidebar}/>,
        'outside interaction' : <Expert_talks alterSidebar={alterSidebar}/>,

    };

    return ( 
        <>
        <div className='content'>
        {map1[category]}
        </div>
        </>
     );
}
 
export default Content;
