import React from 'react';
import { Button, Container, Row, Col, Form,Navbar,Nav } from 'react-bootstrap';
import { HashLink } from 'react-router-hash-link';
import { Link,NavLink } from 'react-router-dom';
import investImage from "../images/Invest.png";
import waveImage from "../images/wave.png";
import villaImage from "../images/Villa2.png"
import villaImage2 from "../images/Villa.png"
import '../cssFiles/Custom.css';
import Footer from '../components/Footer';
import Headroom from 'react-headroom';


const Home = () => {
  return (
    <>
      <section className="pg-primary vh-100 d-flex flex-column" id="home-section">
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
            <NavLink
              variant="outline-light"
              to="/login"
              className="mx-2 text-white"
              style={{ textDecoration: 'none' }}
            >
              Login
            </NavLink>
            <NavLink variant="light" to="/signup" style={{textDecoration: 'none',}} >
            <Button variant="light" className="mx-2" style={{ backgroundColor: '#ffffff', color: 'black' }}>Sign Up</Button>
            </NavLink>
          {/* <Button variant="outline-light" className="mx-2"><Link to="/login">Login</Link></Button>
          <Button variant="light" className="mx-2" style={{ backgroundColor: '#ffffff', color: 'black' }}><Link to="/signup">Sign Up</Link> Up</Button> */}

        </div>
      </Navbar>
    </Headroom>
        <Container fluid className="flex-grow-1 d-flex px-4 align-items-center justify-content-center text-white">
          <Row className="justify-content-center align-items-center">
            <Col lg={5} md={6} className="text-center text-lg-start">
              <h1 className="display-3 fw-bold">Villa Investments</h1>
              <p className="lead fw-normal mb-4">
                Future of Landed Property Investments with Cutting-Edge AI Insights
              </p>
              <Link variant="light" to="/signup" style={{textDecoration: 'none',}} >
                <Button variant="primary" size="lg" className="me-2" >SIGN UP</Button>
                </Link>
                <Link variant="light" to="/signup" style={{textDecoration: 'none',}} >
                  <Button variant="light" className="mx-2 sign-up-button"size="lg">Login</Button>
                </Link>
            </Col>
            <Col xs={9} md={5} className="text-center">
              <img src={investImage} alt="Invest" className="img-fluid" />
            </Col>
          </Row>
        </Container>
          <img src={waveImage} alt="Wave" className="img-fluid position-absolute bottom-0 start-0 w-100" />
      </section>
      <section className="pg-body text-center" id="about-section">
        <Container className="py-5">
          <Row className="justify-content-center">
            <h1 className="display-3 fw-bold" style={{ color: '#4C95A0' }}>Villa Investments</h1>
          </Row>
        </Container>
        <Container className="pt-5"> {/* This adds padding to the top of the container */}
          <Row className="align-items-center"> {/* This centers the content vertically */}
            <Col md={6}>
              <h6 className="display-5 fw-bold" style={{ color: '#68B0BB' }}>Who we are?</h6>
              <p className="text-start lead fw-normal mb-4">
                At Villa Capital, we specialize in diversifying investment opportunities within the real estate sector.
              </p>
            </Col>
            <Col md={6} className="text-md-right"> {/* This aligns the column content to the right on medium devices and up */}
              <img src={villaImage2} alt="Villa" className="img-fluid" style={{ maxHeight: '300px' }} /> {/* You can adjust maxHeight as needed */}
            </Col>
          </Row>
        </Container>
        </section>
        <section id="contact-section">
          <div className='pt-5'></div>
          <div className='pt-5'></div>
          <Container className="pt-3">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <h2>Contact Us</h2>
            <p className="mb-4">Most calendars are designed for teams. Slate is designed for freelancers</p>
            <Form className="contact-form p-4 shadow">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Control type="text" placeholder="Your Name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Your Email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicMessage">
                <Form.Control as="textarea" rows={3} placeholder="Your Message" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Send
              </Button>
            </Form>
          </Col>
        </Row>
        </Container>
      </section>
      <section>
        <Footer/>
      </section>

    </>
  );
};

export default Home;





// //    <div className='header'>
// <div className='logo'>
// <img src={villaImage}className='villaImage' alt="Villa" />
// </div>
// <nav>
// <ul className='nav-menu'>
//   <li>Home</li>
//   <li>About</li>
//   <li>Contact</li>
// </ul>
// </nav>
// <div className='action-buttons'>
//   <Button className='button login'>Login</Button>
//   <Button className='button signup'>Sign up</Button>
// </div>
// </div>
// )
// }