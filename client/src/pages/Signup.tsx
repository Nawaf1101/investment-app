import React, { useState } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { onSignup, validate } from "../functionalities/AccountsFunctions";
import useAccount from "../hooks/useAccount";

interface ValidationErrors {
  email?: string;
  password?: string;
  name?: string;
}
const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [errors, setErrors] = useState<ValidationErrors>({});

  const { handleSignUp } = useAccount();

  const onSubmit = (event) => {
    event.preventDefault();
    const ValidationErrors = validate(email, password);
    setErrors(ValidationErrors || {});
    if (ValidationErrors) return;

    handleSignUp(name, email, password);
  };

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <Container
          style={{
            backgroundColor: "#EEEEEE",
            padding: "2rem",
            borderRadius: "15px",
            maxWidth: "400px",
            marginTop: "10rem",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isInvalid={!!errors.name}
                placeholder="ex: Nawaf Saleh"
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Your email</Form.Label>
              <Form.Control
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!errors.email}
                placeholder="example@gmail.com"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
                placeholder="Password"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#17a2b8",
                borderColor: "#17a2b8",
                borderRadius: "20px",
              }}
            >
              Sign Up
            </Button>
          </Form>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <p style={{ marginBottom: "0" }}>Have an account?</p>
            <a
              href="/login"
              style={{ textDecoration: "none", color: "#378C99" }}
            >
              Login!
            </a>
          </div>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default Signup;
