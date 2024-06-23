import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import villaImage from "../images/Villa.png";
import Header from "../components/Header";
import Footer from "../components/Footer";

type about = {}
const About: React.FC<about> = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {" "}
      {/* Flex container for page content */}
      <Header />
      <Container
        fluid
        className="flex-grow-1 d-flex align-items-center justify-content-center"
      >
        <Row className="align-items-center text-center">
          <Col md={6}>
            <h1 className="display-3 fw-bold" style={{ color: "#4C95A0" }}>
              Villa Investments
            </h1>
            <p className="lead fw-normal mb-4">
              At Villa Capital, we specialize in diversifying investment
              opportunities within the real estate sector.
            </p>
          </Col>
          <Col md={6}>
            <img
              src={villaImage}
              alt="Villa"
              className="img-fluid"
              style={{ maxHeight: "450px" }}
            />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default About;
