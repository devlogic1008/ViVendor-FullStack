const httpStatus = require('http-status');
const { validationResult } = require('express-validator');
const catchAsync = require('../utils/catchAsync');
const Helper = require('../utils/Helper');
const { permissionService } = require('../services');

// Function to create a new role
const createPermission = catchAsync(async (req, res) => {
  // console.log("🚀 ~ createPermission ~ req:", req.body)
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, msg: 'Errors', errors: errors.array() });
    }
    const permission = await permissionService.createPermission(req.body);
    if (!permission) {
      res
        .status(httpStatus.BAD_REQUEST)
        .send(
          Helper.apiResponse(httpStatus.BAD_REQUEST, api.permission.storeError)
        );
    } else {
      res
        .status(httpStatus.OK)
        .send(Helper.apiResponse(httpStatus.CREATED, permission));
    }
  } catch (error) {
    console.error('Error creating role:', error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Internal server error',
    });
  }
});

// Function to get a role by its ID
const getPermissionById = catchAsync(async (req, res) => {
  // console.log('get id by query ', req.query.id);
  try {
    const permission = await permissionService.getPermissionById(req.query.id);
    return res.status(httpStatus.OK).json(permission);
  } catch (error) {
    console.error('Error getting role by ID:', error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error' });
  }
});

// Function to get all roles
const getAllPermission = catchAsync(async (req, res) => {
  // console.log('get all role', req);
  try {
    const permissions = await permissionService.getAllPermission();
    return res.status(httpStatus.OK).json(permissions);
  } catch (error) {
    console.error('Error getting all roles:', error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error' });
  }
});

module.exports = {
  createPermission,
  getPermissionById,
  getAllPermission,
};
