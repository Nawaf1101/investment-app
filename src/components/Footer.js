import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../cssFiles/Custom.css';
import { BsTwitterX  } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";



const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <Container>
        <Row className="justify-content-center">
            <Col xs={12} md={4} className="text-center">
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '2rem' }}>
                    <FaLinkedin />
                </a>
                {' '} {/* This adds space between icons */}
                <a href="https://x.com/Villacapital1" target="_blank" rel="noopener noreferrer" style={{ fontSize: '2rem', color: 'black' }}>
                    <BsTwitterX />
                </a>
            </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;