import React,{useState} from 'react'
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';

import Footer from '../components/Footer';
import Header from '../components/Header';
const Signup = ({onSignup}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')


    const handleChange = (event) =>{
        const {name, value} = event.target;
        if (name ==='email'){
            setEmail(value);
        }else if (name ==='password'){
            setPassword(value)
        }else if(name==='name'){
            setName(value)
        }
    }

    
    const onSubmit = (e) => {
        e.preventDefault();
        onSignup(name,email,password)

    }
    


  return (
    <>
        <div className="d-flex flex-column min-vh-100">
            <Header/>
            <div>
            <Container style={{ backgroundColor: '#EEEEEE', padding: '2rem', borderRadius: '15px', maxWidth: '400px', marginTop: '10rem', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formGroupName">
                        <Form.Label>Your name</Form.Label>
                        <Form.Control type="text" onChange={handleChange} name="name" value={name} placeholder="ex: Nawaf saleh" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Your email</Form.Label>
                        <Form.Control type="email" onChange={handleChange} name="email" value={email} placeholder="example@gmail.com" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={handleChange} name="password" value={password} placeholder="Password" />
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{ width: '100%', backgroundColor: '#17a2b8', borderColor: '#17a2b8', borderRadius: '20px' }}>
                        Signup
                    </Button>
                </Form>
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <p style={{ marginBottom: '0' }}>Have an account?</p>
                    <a href="/login" style={{ textDecoration: 'none',color:"#378C99" }}>Login!</a>
                </div>
            </Container>
            </div>

            <Footer/>
        </div>
    </>
  )
}

export default Signup