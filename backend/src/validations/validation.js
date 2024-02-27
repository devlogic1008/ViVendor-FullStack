const { check } = require('express-validator');

const createRole = [check('name', 'Name is required').not().isEmpty()];

const registerUser = [
  check('firstName', 'First name is required').not().isEmpty(),
  check('lastName', 'Last name is required').not().isEmpty(),
  check('email', 'Invalid email address').isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
  check('password', 'Password is required')
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage('Password should be at least 6 characters long'),
];

module.exports = {
  createRole,
  registerUser,
};
