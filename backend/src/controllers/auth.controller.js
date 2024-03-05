const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const Helper = require('../utils/Helper');
const jwt = require('jsonwebtoken');
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
    // Extract the JWT from the request headers
    const superAdminToken = req.headers.authorization.split(' ')[1];

    // Verify the JWT to get the user's role or permissions
    const decodedToken = jwt.verify(superAdminToken, process.env.JWT_SECRET);

    // Fetch the user record with its roles
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken.sub,
      },
      include: {
        roles: true,
      },
    });
    console.log('🚀 ~ register ~ user:', user);

    // Check if the user is a super-admin
    const isSuperAdmin = user.roles.some(
      (role) => role.roleId === 'c82b6f5e-6215-4ec6-9af5-86f0a394ae67'
    );
    console.log('🚀 ~ register ~ isSuperAdmin:', isSuperAdmin);

    if (!isSuperAdmin) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, msg: 'Errors', errors: errors.array() });
    }

    // Proceed with creating the new user
    const newUser = await userService.createUser(req.body);
    const userId = newUser.id;
    const token = await tokenService.generateAuthTokens(userId);

    console.log('🚀 ~ register ~ newUser:', newUser);

    // Check if user creation was successful
    if (!newUser) {
      res
        .status(httpStatus.BAD_REQUEST)
        .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.user.storeError));
    } else {
      res
        .status(httpStatus.OK)
        .send(Helper.apiResponse(httpStatus.CREATED, newUser, token));
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
