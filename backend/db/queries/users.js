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

const createUser = (userName,email,password)=>{
  const newUser = `
  INSERT INTO Users (Username, Email, Password)
  VALUES($1, $2, $3)
  RETURNING *;
  `;
  return db.query(newUser,[userName,email,password]);

};

module.exports = { getUsers,getOnlyOneUser,createUser };
