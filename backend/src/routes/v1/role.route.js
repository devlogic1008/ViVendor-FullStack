const express = require('express');
const router = express.Router();
const { roleController } = require('../../controllers');
const { validation } = require('../../validations');
// Register route
router.post('/', validation.createRole, roleController.createRole);
// Route to get a role by its ID
router.get('/', roleController.getRoleById);

// Route to get all roles
router.get('/roles', roleController.getAllRoles);
module.exports = router;
