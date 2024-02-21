const express = require('express');
const router = express.Router();
const { authController } = require('../../controllers');

// Register route
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-token', authController.refreshTokens);
router.post('/send-verification-email', authController.sendVerificationEmail);

module.exports = router;
