import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import logo from '../logo (2).png'

const Navbar = () => {
 

  return (
    <>

    <Link  to='/'><img src={logo}  alt="" className='logo' /></Link>
      <ul class="nav flex-column mt-4">
        <li className="nav-item shadow-sm">
          <Link className="nav-link " to="/"><i class="fa-sharp fa-solid fa-house"></i><span className='nav-name'>  Home</span></Link>
        </li>
        <li className="nav-item bg-gradient shadow-sm">
          <Link className="nav-link " to="/profile"><i class="fa-sharp fa-solid fa-user"></i><span className='nav-name'>  Profile</span></Link>
        </li>
        <li className="nav-item bg-gradient shadow-sm">
          <Link className="nav-link " to="/explore"><i class="fa-solid fa-gear"></i><span className='nav-name'>  Explore</span></Link>
        </li>
        <li className="nav-item bg-gradient shadow-sm">
          <Link className="nav-link " to="/setting"><i class="fa-solid fa-snowflake"></i><span className='nav-name'> Settings</span></Link>
        </li>
      </ul>
    </>
  )
}

export default Navbar

