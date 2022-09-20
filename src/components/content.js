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
import Researches from '../forms/Researches';
import Tours from '../forms/Tours';
import Works from '../forms/Works';
import Expert_talks from '../forms/Expert_talks';


const Content = (props) => {

    const map1={
        'profile':<Profile />,
        'papers' :<Papers />,
        'events' :<Events />,
        'grants' : <Grants />,
        'workshops' : <Workshops />,
        'book publish' :<Book_publish />,
        'patents' : <Patents />,
        'phds' : <Phds />,
        'researches' : <Researches />,
        'tours' :<Tours />,
        'works' : <Works />,
        'expert talk' : <Expert_talks />,

    };
    return ( 
        <>
        
        <div className='content'>
        <Searchbar/>
        {map1[props.category]}
        </div>
        </>
     );
}
 
export default Content;
