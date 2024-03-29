/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userinfo = require('../db/queries/users');

router.get('/', (req, res) => {
  userinfo.getUsers()
    .then((result) => {

      res.json(result.rows);
    });
});
router.post('/register', (req, res) => {

  const { userName, email, password } = req.body;

  userinfo.createUser(userName, email, password)
    .then((result) => {
      //returns the newly created user
      const createdUser = result.rows[0];
      // Send a response with the created user
      res.status(201).json({ message: "User created successfully", user: createdUser });
    })
    .catch((error) => {
      // If an error occurs, send an error response
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    });
});
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  //print user infor for testing purposes;
  console.log('User login details:', email, password);

  userinfo.loginUser(email, password)
    .then((user) => {
      // User authenticated successfully, send a response with user details
      res.status(200).json({ message: "User logged in successfully", user });
    })
    .catch((error) => {
      // If an error occurs (e.g., invalid email or password), send a 401 Unauthorized response
      console.error("Error logging in:", error.message);
      res.status(401).json({ error: error.message });
    });
});
// retrieve all posts 
router.get('/posts', (req, res) => {
  userinfo.getAllPostsWithComments()
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((error) => {
      console.error("Error retrieving blog posts:", error);
      res.status(500).json({ error: "Failed to retrieve blog posts" });
    });
});
//get post by Id
router.get('/posts/:postId', (req, res) => {
  const postId = req.params.postId;
  userinfo.getPostByIdWithComments(postId)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Post not found" });
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch((error) => {
      console.error("Error retrieving blog post:", error);
      res.status(500).json({ error: "Failed to retrieve blog post" });
    });
});
//Create post 
router.post('/createPost', (req, res) => {
 
  const { BlogPostUserID, Title, Content, Tags } = req.body;
  userinfo.createPost(BlogPostUserID, Title, Content, Tags)
    .then((result) => {
      res.status(201).json(result.rows[0]);
    })
    .catch((error) => {
      console.error("Error creating blog post:", error);
      res.status(500).json({ error: "Failed to create blog post" });
    });
});
// Update a blog post
router.post('/posts/:postId/update', (req, res) => {
  const postId = req.params.postId;
  const { Title, Content, Tags } = req.body;
  userinfo.updatePost(postId, Title, Content, Tags)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Post not found" });
      } else {
        res.status(200).json(result.rows[0]);
      }
    })
    .catch((error) => {
      console.error("Error updating blog post:", error);
      res.status(500).json({ error: "Failed to update blog post" });
    });
});
// Delete a blog post
router.post('/posts/:postId/delete', (req, res) => {
  const postId = req.params.postId;
  userinfo.deletePost(postId)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({ error: "Post not found" });
      } else {
        res.status(200).json({ message: "Post deleted successfully" });
      }
    })
    .catch((error) => {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    });
});

// Endpoint to handle retrieveing  commentById
router.get('/comments/:postId', (req, res) => {
  const postId = req.params.postId;
  userinfo.getAllCommentsForPost(postId)
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((error) => {
      console.error("Error retrieving comments:", error);
      res.status(500).json({ error: "Failed to retrieve comments" });
    });
});
// Endpoint to handle creating a new comment
router.post('/createComment', (req, res) => {
  const { CommentUserID, CommentPostID, Text } = req.body;

  // Call the createComment function
  userinfo.createComment(CommentUserID, CommentPostID, Text)
    .then(result => {
      // Send the newly created comment as response
      res.status(201).json(result.rows[0]);
    })
    .catch(error => {
      // If an error occurs, send an error response
      console.error('Error creating comment:', error);
      res.status(500).json({ error: 'Failed to create comment' });
    });
});
// Endpoint to handle updating an existing comment
router.post('/comments/:commentId/update', (req, res) => {
  const { commentId } = req.params;
  const { Text } = req.body;

  // Call the updateComment function
  userinfo.updateComment(commentId, Text)
    .then(result => {
      // Send the updated comment as response
      res.status(200).json(result.rows[0]);
    })
    .catch(error => {
      // If an error occurs, send an error response
      console.error('Error updating comment:', error);
      res.status(500).json({ error: 'Failed to update comment' });
    });
});

// Endpoint to handle deleting an existing comment
router.post('/comments/:commentId/delete', (req, res) => {
  const { commentId } = req.params;

  // Call the deleteComment function
  userinfo.deleteComment(commentId)
    .then(result => {
      // Send the deleted comment as response
      res.status(200).json(result.rows[0]);
    })
    .catch(error => {
      // If an error occurs, send an error response
      console.error('Error deleting comment:', error);
      res.status(500).json({ error: 'Failed to delete comment' });
    });
});



module.exports = router;
