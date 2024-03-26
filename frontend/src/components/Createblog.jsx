import React, { useState } from 'react';
// import axios from 'axios';
// Import mock data directly if you plan to manipulate it for testing
import mockBlogPosts from '../mockBlogPosts'; // Adjust the path as necessary

function Createblog({ userId }) { // Note the lowercase 'b'
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      PostID: mockBlogPosts.length + 1, // Assume incrementing ID
      BlogPostUserID: userId, // Assuming you have a way to get the userId
      Title: title,
      Content: content,
      Tags: tags,
      PublicationDate: new Date().toISOString(), // Assume current date-time
    };

    // Here, you'd normally make an API call with axios, but for testing:
    setTimeout(() => {
      mockBlogPosts.push(newPost); // Add new post to the mock array for demonstration
      alert('Blog post created successfully!');
      // Reset form fields to simulate a successful submission
      setTitle('');
      setContent('');
      setTags('');
      // Implement any state updates or redirection as needed
    }, 500); // Simulate a delay to mimic async behavior
  };

  return (
    <form onSubmit={handleSubmit} className="create-blog-form">
      <h2>Create New Blog Post</h2>
      {             }
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label>Tags (comma-separated):</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <button type="submit">Publish</button>
    </form>
  );
}

export default Createblog; 



