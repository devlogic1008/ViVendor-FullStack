const httpStatus = require('http-status');
const { validationResult } = require('express-validator');
const catchAsync = require('../utils/catchAsync');
const Helper = require('../utils/Helper');
const { userRoleService } = require('../services');
const api = require('../utils/messages');

// Create role controller method
const createRole = catchAsync(async (req, res) => {
  
  // Extract role data from request body
  const { name } = req.body;

  try {
    // Create the role in the database
    const role = await userRoleService.createRole({ name });

    // Check if role creation was successful
    if (!role) {
      // If role creation failed, return a 400 Bad Request response
      return res
        .status(httpStatus.BAD_REQUEST)
        .send(Helper.apiResponse(httpStatus.BAD_REQUEST));
    }

    // If role creation was successful, return a 201 Created response with the created role data
    res
      .status(httpStatus.CREATED)
      .send(Helper.apiResponse(httpStatus.CREATED, role));
  } catch (error) {
    // If an error occurs during role creation, handle it and return a 500 Internal Server Error response
    console.error('Error while creating role:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: 'Internal server error',
    });
  }
});

module.exports = {
  createRole,
};
