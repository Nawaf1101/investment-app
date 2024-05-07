import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { onEdit } from "../functionalities/AccountsFunctions";

import Footer from "../components/Footer";
import Header from "../components/Header";
const EditProfile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    fetch("http://localhost:3001/getSession", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          // Check if the response status is 2xx
          return res.json(); // Parse JSON data from the response
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((data) => {
        if (data.valid) {
          setUser({ name: data.name, email: data.email });
          setEmail(data.email);
          setName(data.name);
        } else {
          toast.error("No active session found");
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err); // Log errors to the console
      });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name === user.name && email === user.email && !password) {
      toast.success("No changes applied");
      navigate("/");
      return;
    }
    if (await onEdit(name, user.email, email, password)) {
      navigate("/");
    } else {
      toast.error("Unknown error!");
    }
  };

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
