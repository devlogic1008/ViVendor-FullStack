const express = require('express');
const { userController } = require('../../controllers');
const authMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/me', authMiddleware);
router
  .route('/', createUser)
  // .get(auth('all'), validate(userValidation.getUsers), userController.getUsers);
module.exports = router;
