import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


 function Login() {
  //store user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function handleSubmit(event) {
  event.preventDefault(); // Prevent form from reloading the page on submit

  // post request to login endpoint with email and password
  axios.post('/users/login', { email, password })
    .then(response => {
      // the backend sends back a token on successful login
      if (response.data.token) {
        // Store the token in localStorage 
        localStorage.setItem('userToken', response.data.token);
        alert('Login successful!');
        // Redirect user or update UI/State 
      }
    })
    .catch(error => {
      alert('Login failed! Check your credentials and try again.');
      console.error('Login error:', error);
    });
};










//   // Function to handle form submissio
//   // const handleSubmit = async (event) => {
//   //   event.preventDefault(); // Prevent form from reloading the page on submit
//   //   try {
//   //     // post request to login endpoint with email and password
//   //     const response = await axios.post('http://localhost:8001/users/login', {email, password});
//   //     // Assuming the backend sends back a token on successful login
//   //     if (response.data.token) {
//   //       // Store the token in localStorage or sessionStorage
//   //       localStorage.setItem('userToken', response.data.token);
//   //       alert('Login successful!');
//   //       // Redirect user or update UI/State as needed
//   //     }
//   //   } catch (error) {
//   //     alert('Login failed! Check your credentials and try again.');
//   //     console.error('Login error:', error);
//   //   }
//   // };


  return (
    
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        <p>
  Don't have an account? <Link to="/register">Register here</Link>.
</p>
      </form>
    </div>
    
  );
}

export default Login;



