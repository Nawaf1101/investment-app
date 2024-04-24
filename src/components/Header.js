import React from 'react'
import villaImage from "../images/Villa2.png"
import { Button, Navbar, Nav } from 'react-bootstrap';
import { NavLink,Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Headroom from 'react-headroom';

import '../cssFiles/Custom.css';

const Header = () => {
  return (
    <div>
        <Navbar  variant="dark" expand="lg" className="nav-bg justify-content-center" style={{ paddingLeft: '2rem' }}>
        <Navbar.Brand href="/ ">
        <img src={villaImage} alt="Villa" className="d-inline-block align-top " style={{ maxHeight: '100px' }} />
        </Navbar.Brand>
        </Navbar>
    </div>
)
}

export default Header;