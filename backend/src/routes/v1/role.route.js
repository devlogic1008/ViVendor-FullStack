const express = require('express');
const router = express.Router();
const { roleController } = require('../../controllers');
const { validation } = require('../../validations');
// Register route
router.post(
  '/create-role',
  validation.createRole,
  roleController.createRole
);
// Route to get a role by its ID
router.get('/get-role-by-id', roleController.getRoleById);

// Route to get all roles
router.get('/get-all-roles', roleController.getAllRoles);
module.exports = router;
