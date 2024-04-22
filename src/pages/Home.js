import React from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import investImage from "../images/Invest.png";
import waveImage from "../images/wave.png";
import villaImage from "../images/Villa.png"
import Header from '../components/Header';
import '../cssFiles/Custom.css';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <section className="pg-primary vh-100 d-flex flex-column" id="home-section">
        <Header />
        <Container fluid className="flex-grow-1 d-flex px-4 align-items-center justify-content-center text-white">
          <Row className="justify-content-center align-items-center">
            <Col lg={5} md={6} className="text-center text-lg-start">
              <h1 className="display-3 fw-bold">Villa Investments</h1>
              <p className="lead fw-normal mb-4">
                Future of Landed Property Investments with Cutting-Edge AI Insights
              </p>
              <Button variant="primary" size="lg" className="me-2" >SIGN UP</Button>
              <Button variant="light" className="mx-2 sign-up-button"size="lg">Login</Button>
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
              <img src={villaImage} alt="Villa" className="img-fluid" style={{ maxHeight: '300px' }} /> {/* You can adjust maxHeight as needed */}
            </Col>
          </Row>
        </Container>
        </section>
        <section id="contact-section">
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