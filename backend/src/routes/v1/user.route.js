const express = require('express');
const { userController } = require('../../controllers');
const getUserDataWithRole = require('../../middlewares/authMiddleware');

const router = express.Router();
router.route('/').get(getUserDataWithRole);
router.route('/staff').get(userController.getStaff);
module.exports = router;
