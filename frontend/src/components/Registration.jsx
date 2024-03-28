import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function Registration() {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle form submission
  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent form from reloading the page on submit

    try {
      // POST request to backend 
      const response = await axios.post('/users/register', { email, userName:username, password});
      // Handle successful registration 
      console.log('Registration successful', response.data);
    } catch (error) {
      // Handle errors (e.g., email already exists, validation errors)
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || 'Failed to register');
      } else {
        setErrorMessage('Failed to register');
      }
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
        {errorMessage && <p>{errorMessage}</p>}
        <p>
          Already have an account? <Link to="/">Log in here</Link>.
        </p>
      </form>
    </div>
  );

}

export default Registration;
