import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

import Footer from "../components/Footer";
import Header from "../components/Header";
import useAccount from "../hooks/useAccount";
const EditProfile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { user, isLoggedIn } = useAccount();
  const { handelEditProfile } = useAccount();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name === user.name && email === user.email && !password) {
      toast.success("No changes applied");
      navigate("/");
      return;
    }
    await handelEditProfile(name, user.email, email, password);
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <div>
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
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(E) => setName(E.target.value)}
                  name="name"
                  value={name}
                  placeholder="New Name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(E) => setEmail(E.target.value)}
                  name="email"
                  value={email}
                  placeholder="newEmail@example.com"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Change Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(E) => setPassword(E.target.value)}
                  name="password"
                  value={password}
                  placeholder="New Password"
                />
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
                Edit Profile!
              </Button>
            </Form>
          </Container>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default EditProfile;
