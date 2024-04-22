import React from 'react'
import villaImage from "../images/Villa2.png"
import { Button, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import Headroom from 'react-headroom';

import '../cssFiles/Custom.css';

const Header = () => {
  return (
    <Headroom>
      <Navbar  variant="dark" expand="lg" className="nav-bg" style={{ paddingLeft: '2rem' }}>
        <Navbar.Brand href="#home">
          <img src={villaImage} alt="Villa" className="d-inline-block align-top" style={{ maxHeight: '100px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav className="align-items-center">
            <HashLink smooth to="#home-section" className="nav-link custom-nav-link">Home</HashLink>
            <HashLink smooth to="#about-section" className="nav-link custom-nav-link">About</HashLink>
            <HashLink smooth to="#contact-section" className="nav-link custom-nav-link">Contact</HashLink>
          </Nav>
        </Navbar.Collapse>
        <div className="ms-auto">
          <Button variant="outline-light" className="mx-2">Login</Button>
          <Button variant="light" className="mx-2" style={{ backgroundColor: '#ffffff', color: 'black' }}>Sign Up</Button>
        </div>
      </Navbar>
    </Headroom>
  )
}

export default Header;