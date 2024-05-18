import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../cssFiles/Custom.css";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3  footer-bg">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={4} className="text-center">
            <a
              href="https://www.linkedin.com/company/villacapitalsa/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "2rem", color: "white" }}
            >
              <FaLinkedin />
            </a>{" "}
            {/* This adds space between icons */}
            <a
              href="https://x.com/Villacapital1"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "2rem", color: "white" }}
            >
              <BsTwitterX />
            </a>
          </Col>
        </Row>
        <h6 className="text-center" style={{ padding: "6px", color: "white" }}>
          © VILLA TEAM{" "}
        </h6>
      </Container>
    </footer>
  );
};

export default Footer;
