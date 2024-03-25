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
    WHERE "Email" = $1 AND "Password" = $2;
  `;

  return db.query(loginQuery, [email, password])
    .then((result) => {
      if (result.rows.length === 1) {
        // User with the provided email and password exists
        return result.rows[0]; // Return the user details
      } else {
        // No user found with the provided email and password
        throw new Error('Invalid email or password');
      }
    });
};

module.exports = { getUsers,getOnlyOneUser,createUser,loginUser};
