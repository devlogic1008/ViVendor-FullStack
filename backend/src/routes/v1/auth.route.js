const express = require('express');
const router = express.Router();
const { authController } = require('../../controllers');
const { validation } = require('../../validations');

// Register route
router.post('/register', validation.registerUser, authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/refresh-token', authController.refreshTokens);
router.post('/send-verification-email', authController.sendVerificationEmail);

module.exports = router;
