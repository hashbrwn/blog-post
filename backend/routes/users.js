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
  console.log('req.body',req.body);
  const { userName, email, password } = req.body;
  console.log('User details -->:',userName, email,password);
  // Assuming you have a function createUser that inserts a user into the database
  userinfo.createUser(userName, email, password)
    .then((result) => {
      // console.log(result.rows[0])
      // Assuming createUser returns the newly created user
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

module.exports = router;
