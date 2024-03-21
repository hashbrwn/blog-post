const db = require('../connection');

// const getUsers = () => {
//   return db.query('SELECT * FROM users;')
//     .then(data => {
//       return data.rows;
//     });
// };
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
        // User with the same email already exists, handle accordingly (throw error, return existing user, etc.)
        throw new Error('User with the same email already exists');
      } else {
        // User does not exist, insert the new user
        return db.query(insertNewUser, [userName, email, password]);
      }
    });
};

module.exports = { getUsers,getOnlyOneUser,createUser };
