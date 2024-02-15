const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const Helper = require('../utils/Helper');
const { authService, userService } = require('../services');
const api = require('../utils/messages');

const register = catchAsync(async (req, res) => {
  // Create the user in the PostgreSQL database using Prisma
  try {
    const user = await userService.createUser(req.body);
    // Check if user creation was successful
    if (!user) {
      res
        .status(httpStatus.BAD_REQUEST)
        .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.user.storeError));
    } else {
      
      res
        .status(httpStatus.OK)
        .send(Helper.apiResponse(httpStatus.CREATED,  user));
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
  console.log( 'login body', req.body)
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  // const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user });
});

module.exports = {
  register,
  login,
};
