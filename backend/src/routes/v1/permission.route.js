const express = require('express');
const router = express.Router();
const { permissionController } = require('../../controllers');
const { validation } = require('../../validations');
// Register route
router.post(
  '/',
  validation.createPermission,
  permissionController.createPermission
);
// Route to get a permission by its ID
router.get('/', permissionController.getPermissionById);

// Route to get all permission
router.get('/permissions', permissionController.getAllPermission);
module.exports = router;
