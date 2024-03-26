import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Createblog from './components/Createblog'; // Ensure the correct path and component name

function App() {
  return (
    <Router>
      <Routes> {/* This correctly wraps all of your Route components */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        {/* Corrected the closing tag for the Route element below */}
        <Route path="/create" element={<Createblog userId={1} />} />
        {/* Future routes will be updated similarly */}
      </Routes>
    </Router>
  );
}

export default App;












