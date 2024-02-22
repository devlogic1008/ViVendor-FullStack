const express = require('express');
const { userController } = require('../../controllers');
const auth = require('../../middlewares/auth')
// const { PrismaClient } = require('@prisma/client');
// const Prisma = new PrismaClient();

const router = express.Router();

router.get('/me', userController.authMiddleware);

module.exports = router;
