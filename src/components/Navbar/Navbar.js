import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const navBar = (props) => {
  return (
    <div className='nav'>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/collection"> My Collection</Link></li>
        </ul>
    </div>
  )
}

export default navBar;
