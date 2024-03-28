import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 

function BlogPostsList() {
    const [posts, setPosts] = useState([]); // State to store the list of posts
    const [isLoading, setIsLoading] = useState(true); // State to track loading status
    const [error, setError] = useState(null); // State to store any error that occurs

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                
                const response = await axios.get('/users/posts');
                setPosts(response.data); 
                setIsLoading(false); 
            } catch (error) {
                console.error("Failed to fetch posts:", error);
                setError("Failed to fetch posts."); 
                setIsLoading(false); 
            }
        };

        fetchPosts(); // fetchPosts function when the component mounts
    }, []);

    return (
        <div>
            <h1>Blog Posts</h1>
            {isLoading ? (
                <p>Loading posts...</p> 
            ) : error ? (
                <p>{error}</p> 
            ) : (
              <ul>
    {posts.map(post => (
        <li key={post.PostID}>
            <h2>{post.Title}</h2>
            {/* Display an excerpt and a link to the full post */}
            <p>{post.Content.substring(0, 100)}...</p>
            {/* Use React Router's Link component for navigation */}
            <Link to={`/posts/${post.PostID}`}>Read more</Link>
        </li>
    ))}
</ul>

            )}
        </div>
    );
}

export default BlogPostsList;

