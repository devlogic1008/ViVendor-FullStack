const express = require('express');
const router = express.Router();
const { userRoleController } = require('../../controllers');
const validation = require('../../middlewares/validation');
const { userRoleValidation } = require('../../validations');
// Register route
router.post(
  '/create-role',
  validation(userRoleValidation.createRole),
  userRoleController.createRole
);

module.exports = router;
