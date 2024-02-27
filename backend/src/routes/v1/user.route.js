const express = require('express');
const { userController } = require('../../controllers');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/me', authMiddleware, (req, res) => {
  const userRole = req.userRole;
  if (userRole.permissions.includes('read')) {
    // User has read permission
    // Handle further logic based on user role and permissions
    res.json({ user: req.user });
  } else {
    // User does not have read permission
    res.status(403).json({ error: 'Unauthorized' });
  }
});
module.exports = router;
