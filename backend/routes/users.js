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
  console.log('User login details:', email, password);

  // Assuming you have a function loginUser that authenticates a user
  userinfo.loginUser(email, password)
    .then((user) => {
      // User authenticated successfully, send a response with user details
      res.status(200).json({ message: "User logged in successfully", user });
    })
    .catch((error) => {
      // If an error occurs (e.g., invalid email or password), send a 401 Unauthorized response
      console.error("Error logging in:", error);
      res.status(401).json({ error: "Invalid email or password" });
    });
});

module.exports = router;
