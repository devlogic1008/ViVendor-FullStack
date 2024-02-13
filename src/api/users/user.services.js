import bcrypt from 'bcrypt';
import { db } from '../../utils/db.js';

/**
 * Finds a user by email.
 * @param {string} email - The email of the user to find.
 * @returns {Promise} - A promise that resolves to the found user.
 */
function findUserByEmail(email) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

/**
 * Creates a user with the provided email and hashed password.
 * @param {object} user - The user object containing email and password.
 * @returns {Promise} - A promise that resolves to the created user.
 */
function createUserByEmailAndPassword(user) {
  // Hash the password using bcrypt with a cost factor of 12
  user.password = bcrypt.hashSync(user.password, 12);
  return db.user.create({
    data: user,
  });
}

/**
 * Finds a user by ID.
 * @param {string} id - The ID of the user to find.
 * @returns {Promise} - A promise that resolves to the found user.
 */
function findUserById(id) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

export { findUserByEmail, findUserById, createUserByEmailAndPassword };
