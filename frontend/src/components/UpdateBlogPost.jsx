import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate

function UpdateBlogPost() {
    const { postId } = useParams(); // Get postId from URL
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [post, setPost] = useState({ Title: '', Content: '', Tags: '' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Assuming your API endpoint for fetching a single post is correctly structured
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/users/posts/${postId}`);
                setPost(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error);
                // Handle error for fetching post
            }
        };
        fetchPost();
    }, [postId]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/users/posts/${postId}`, post);
            alert('Post updated successfully!');
            navigate('/users/login'); // Use navigate for redirecting
        } catch (error) {
            console.error('Error updating post:', error);
            alert('Failed to update the post.');
        }
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSubmit}>
            <h2>Update Blog Post</h2>
            <div>
                <label>Title:</label>
                <input
                    name="Title"
                    type="text"
                    value={post.Title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Content:</label>
                <textarea
                    name="Content"
                    value={post.Content}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Tags:</label>
                <input
                    name="Tags"
                    type="text"
                    value={post.Tags}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Update Post</button>
        </form>
    );
}

export default UpdateBlogPost;

