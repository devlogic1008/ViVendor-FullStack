const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const Helper = require('../utils/Helper');
const { validationResult } = require('express-validator');
const {
  authService,
  userService,
  tokenService,
  emailService,
} = require('../services');
const api = require('../utils/messages');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Register controller method to create a new user
const register = catchAsync(async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, msg: 'Errors', errors: errors.array() });
    }

    const user = await userService.createUser(req.body);
    
    // Check if user creation was successful
    if (!user) {
      res
        .status(httpStatus.BAD_REQUEST)
        .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.user.storeError));
    } else {
      res
        .status(httpStatus.OK)
        .send(Helper.apiResponse(httpStatus.CREATED, user));
    }
  } catch (error) {
    // Handle any errors that occur during user creation
    console.error('Error while creating user:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: 'Internal server error',
    });
  }
});

// Login controller method to authenticate user and generate JWTs for user sessions
const login = catchAsync(async (req, res) => {
  console.log('login body', req.body);
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const userId = user.id; // Extract user ID
  const tokens = await tokenService.generateAuthTokens(userId); // Pass user ID
  res.send({ user, tokens });
});

// Logout the user by blacklisting the refresh token
const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});
// Refresh the access token using the refresh token
const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body);
  res.send({ ...tokens });
});

// Send verification email to the user
const sendVerificationEmail = catchAsync(async (req, res) => {
  console.log('sendVerificationEmail', req.body);
  try {
    const email = req.body.email;
    // Generate verify email token
    // const emailVerified = tokenService.generateVerifyEmailToken();  //add (req.user) in the function call

    // Save verify email token to the user record in the database
    // await prisma.user.update({
    //   where: { id: req.user.id },
    //   data: { emailVerified },
    // });

    // Send verification email
    await emailService.sendVerificationEmail(email); //send emailVerified in the function call to sendVerificationEmail

    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error('Error sending verification email:', error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send('Error sending verification email');
  }
});

// Verify the user's email
const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  sendVerificationEmail,
  verifyEmail,
};
