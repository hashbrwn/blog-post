const db = require('../connection');

 // BROWSE - display all users;
 const getUsers = () => {
  const allUsers = `
  SELECT * FROM users;
  `;
  return db.query(allUsers);
};
//  Get specific user
const getOnlyOneUser = (userId) => {

  const oneUser = `
  SELECT * FROM users WHERE id = $1;
  `;
  return db.query(oneUser,[userId]);

};

// REGISTER NEW USER

const createUser = (userName, email, password) => {
  const checkUserQuery = `
    SELECT * FROM Users
    WHERE Email = $1;
  `;

  const insertNewUser = `
    INSERT INTO Users (Username, Email, Password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  console.log("++++++++++++", userName, email, password)
  // Check if user with the same email already exists
  return db.query(checkUserQuery, [email])
    .then((result) => {
      if (result.rows.length > 0) {
        // User with the same email already exists, throw error
        throw new Error('User with the same email already exists');
      } else {
        // User does not exist, insert the new user
        return db.query(insertNewUser, [userName, email, password]);
      }
    });
};
// function loginUser that authenticates a user
const loginUser = (email, password) => {
  const loginQuery = `
    SELECT * FROM Users
    WHERE email = $1 ;
  `;
  console.log("======", email, loginQuery)

  return db.query(loginQuery, [email])
    .then((result) => {
      console.log("$$$$$ ", result.rows)
      if ( result.rows.length === 0 ) {
        throw new Error('email does not exist');
      }

      const user= result.rows[0]
      if ( user.password !== password ) {
        throw new Error('invalid password please try again');
      }

      return result.rows[0];
      if (result.rows.length === 1) {
        // User with the provided email and password exists
        return result.rows[0]; // Return the user details
      } else {
        // No user found with the provided email and password
        throw new Error('Invalid email or password');
      }
    });
};
// Function to retrieve a list of all published blog posts
const getAllPosts = () => {
  const query = `
    SELECT Title,Content FROM BlogPosts
    WHERE PublicationDate >= NOW();
  `;
  return db.query(query);
};

//retrieve the full content of a specific blog post, including comments
const getPostById = (postId) => {
  const query = `
    SELECT * FROM BlogPosts
    WHERE PostID = $1;
  `;
  return db.query(query, [postId]);
};
// Function to create a new blog post
const createPost = (BlogPostUserID, Title, Content, Tags) => {
  const query = `
    INSERT INTO BlogPosts (BlogPostUserID, Title, Content, Tags)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  return db.query(query, [BlogPostUserID, Title, Content, Tags]);
};
// Function to update an existing blog post
const updatePost = (postId, Title, Content, Tags) => {
  const query = `
    UPDATE BlogPosts
    SET Title = $1, Content = $2, Tags = $3
    WHERE PostID = $4
    RETURNING *;
  `;
  return db.query(query, [Title, Content, Tags, postId]);
};
// Function to delete an existing blog post
const deletePost = (postId) => {
  const query = `
    DELETE FROM BlogPosts
    WHERE PostID = $1
    RETURNING *;
  `;
  return db.query(query, [postId]);
};
module.exports = {
  getUsers,getOnlyOneUser,
  createUser,loginUser,getAllPosts,getPostById,createPost,updatePost,deletePost};
