import React, { useState } from 'react';
import axios from 'axios';

function Createblog({ userId }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const newPost = {
      BlogPostUserID: userId, 
      Title: title,
      Content: content,
      Tags: tags, 
    };
    

    try {
     
      const response = await axios.post('/users/createPost', newPost);
      console.log(response.data); 
      alert('Blog post created successfully!');
     
      setTitle('');
      setContent('');
      setTags('');
      
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Failed to create blog post.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-blog-form">
      <h2>Create New Blog Post</h2>
      <div>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <div>
        <label>Tags (comma-separated):</label>
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>
      <button type="submit">Publish</button>
    </form>
  );
}

export default Createblog;




