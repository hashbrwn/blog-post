import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Createblog from './components/Createblog';
import BlogPostsList from './components/BlogPostsList'; 
import UpdateBlogPost from './components/UpdateBlogPost';


function App() {
  return (
    <Router>
      <Routes>
        {/* Set the BlogPostsList component to be the default page */}
        <Route path="/" element={<BlogPostsList />} />
        {/* Other routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/create" element={<Createblog userId={1} />} /> 
        <Route path="/update/:postId" element={<UpdateBlogPost />} />{/* Assuming userId will be dynamically handled later */}
        {/* Placeholder for the BlogPostDetail route */}
        {/* <Route path="/posts/:postId" element={<BlogPostDetail />} /> */}
        {}
      </Routes>
    </Router>
  );
}
export default App;













