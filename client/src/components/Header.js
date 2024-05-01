import React from 'react'
import villaImage from "../images/Villa2.png"
import { Button, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Headroom from 'react-headroom';

import '../cssFiles/Custom.css';

const Header = () => {
  return (
    <Headroom>
      <Navbar variant="dark" expand="lg" className="nav-bg">
        <Navbar.Brand href="/">
        <img src={villaImage} alt="Villa" className="d-inline-block align-top" style={{ maxHeight: '100px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav className="align-items-center">
            <NavLink to="/" className="nav-link custom-nav-link">Home</NavLink>
            <NavLink to="/about" className="nav-link custom-nav-link">About</NavLink>
            <NavLink to="/contact" className="nav-link custom-nav-link">Contact</NavLink>
          </Nav>
        </Navbar.Collapse>
        <div className="ms-auto">
        <NavLink
              variant="outline-light"
              to="/login"
              className="mx-2 text-white"
              style={{ textDecoration: 'none' }}
            >
              Login
            </NavLink>
            <NavLink to="/signup" className="mx-2" style={{ textDecoration: 'none' }}>
  <Button variant="light" className="mx-2" style={{ backgroundColor: '#ffffff', color: 'black' }}>
    Sign Up
  </Button>
</NavLink>
          
          {/* <Button variant="outline-light" className="mx-2">Login</Button>
          <Button variant="light" className="mx-2" style={{ backgroundColor: '#ffffff', color: 'black' }}>Sign Up</Button> */}
        </div>
      </Navbar>
    </Headroom>
  )
}

export default Header;