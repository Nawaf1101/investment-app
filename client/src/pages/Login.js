import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { onLogin, validate } from "../functionalities/AccountsFunctions";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate(email, password);
    setErrors(validationErrors || {});
    if (validationErrors) return; // Prevent form submission if there are validation errors

    if (await onLogin(email, password)) {
      navigate("/");
    } // Proceed with the login if no errors
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
              Login
            </Button>
          </Form>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <p style={{ marginBottom: "0" }}>Don't have an account?</p>
            <a
              href="/signup"
              style={{ textDecoration: "none", color: "#378C99" }}
            >
              Join us!
            </a>
          </div>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default Login;
