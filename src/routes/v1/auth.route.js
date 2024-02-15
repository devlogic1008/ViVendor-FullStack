const express = require('express');
const router = express.Router();
const { registerUser} = require('../../controllers/auth.controllers');

// Register route
router.post('/register', registerUser);

module.exports = router;
