import React, { useState } from 'react'
import axios from 'axios';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
const App = () => {

  const [accounts,setAccounts] = useState([])
  const [newAccount, setNewAccount] =useState({name:'',email:'',password:''})

  const onSignup = (name, email, password) => {
    fetch('http://localhost:3001/accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }) // Directly using the arguments
    })
    .then(response => {
      if (!response.ok) {
        if (response.status === 409) {
          throw new Error('Email already exists');
        }
      }
      return response.json();
    })
    .then(data => {
      toast.success("Account created successfully!");
      console.log('Success:', data); // Log the response data
      // Here you might want to update your 'accounts' state or perform other actions
    })
    .catch(error => {
      toast.error(error.message);
    });
  };


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup onSignup={onSignup}/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App