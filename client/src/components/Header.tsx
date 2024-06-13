import React from "react";
import villaImage from "../images/Villa2.png";
import { Button, Navbar, Nav, Dropdown } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import Headroom from "react-headroom";
import "../cssFiles/Custom.css";
import useAccount from "../hooks/useAccount";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

type header = {};
const Header: React.FC<header> = () => {
  const { isLoggedIn, user, handleLogOut } = useAccount();
  const location = useLocation();
  const navbarClass = location.pathname === "/" ? "navhome-bg" : "nav-bg";

  return (
    <Headroom>
      <Navbar variant="dark" expand="lg" className={navbarClass}>
        <Navbar.Brand href="/">
          <img
            src={villaImage}
            alt="Villa"
            className="d-inline-block align-top"
            style={{ maxHeight: "100px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center"
        >
          <Nav className="align-items-center">
            <NavLink to="/" className="nav-link custom-nav-link">
              Home
            </NavLink>
            <NavLink to="/about" className="nav-link custom-nav-link">
              About
            </NavLink>
            <NavLink to="/contact" className="nav-link custom-nav-link">
              Contact
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        <div className="ms-auto">
          {isLoggedIn ? (
            <Dropdown align="end" className="custom-nav-dropdown">
              <Dropdown.Toggle
                id="dropdown-basic"
                className="custom-dropdown-toggle mx-2"
              >
                <i className="bi bi-person-circle"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.ItemText>Name: {user.name}</Dropdown.ItemText>
                <Dropdown.ItemText>Email: {user.email}</Dropdown.ItemText>
                <Dropdown.Item
                  href="/editprofile"
                  style={{ backgroundColor: "#5da6c2", color: "#fff" }}
                >
                  Edit Profile
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleLogOut}
                  style={{ backgroundColor: "#f01132", color: "#fff" }}
                >
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <>
              <NavLink
                to="/login"
                className="mx-2 text-white"
                style={{ textDecoration: "none" }}
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="mx-2"
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant=""
                  className="mx-2"
                  style={{ backgroundColor: "#ffffff", color: "black" }}
                >
                  Sign Up
                </Button>
              </NavLink>
            </>
          )}
        </div>
      </Navbar>
    </Headroom>
  );
};

export default Header;
