import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button, Container, Row, Form } from "react-bootstrap";

type contact = {}
const Contact: React.FC<contact> = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Row className="justify-content-center">
          <h2 style={{ textAlign: "center" }}>Contact Us</h2>
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
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Contact;
