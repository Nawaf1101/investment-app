import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import investImage from "../images/Invest.png";
import waveImage from "../images/wave.png";
import villaImage from "../images/Villa.png";
import Header from "../components/Header";
import "../cssFiles/Custom.css";
import Footer from "../components/Footer";
import OpportunitiesList from "../components/OpprtunityCard";

const Home: React.FC<any> = () => {
  return (
    <>
      <section
        className="pg-primary vh-100 d-flex flex-column"
        id="home-section"
      >
        <Header />
        <Container
          fluid
          className="flex-grow-1 d-flex px-4 align-items-center justify-content-center text-white"
        >
          <Row className="justify-content-center align-items-center">
            <Col lg={5} md={6} className="text-center text-lg-start">
              <h1 className="display-3 fw-bold">Villa Investments</h1>
              <p className="lead fw-normal mb-4">
                Future of Landed Property Investments with Cutting-Edge AI
                Insights
              </p>
            </Col>
            <Col xs={9} md={5} className="text-center">
              <img src={investImage} alt="Invest" className="img-fluid" />
            </Col>
          </Row>
        </Container>
        <img
          src={waveImage}
          alt="Wave"
          className="img-fluid position-absolute bottom-0 start-0 w-100"
        />
      </section>
      <div className="pt-5"></div>
      <div className="pt-5"></div>
      <section className="pg-body text-center" id="invest-section">
        <OpportunitiesList />
      </section>
      <div className="pt-5"></div>

      <section>
        <Footer />
      </section>
    </>
  );
};

export default Home;
