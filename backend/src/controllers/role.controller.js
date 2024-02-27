const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const httpStatus = require('http-status');
const { validationResult } = require('express-validator');
const catchAsync = require('../utils/catchAsync');
const Helper = require('../utils/Helper');
const { userRoleService } = require('../services');

// Function to create a new role
const createRole = catchAsync(async (req, res) => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, msg: 'Errors', errors: errors.array() });
    }
    const role = await userRoleService.createRole(req.body);
    if (!role) {
      res
        .status(httpStatus.BAD_REQUEST)
        .send(Helper.apiResponse(httpStatus.BAD_REQUEST, api.role.storeError));
    } else {
      res
        .status(httpStatus.OK)
        .send(Helper.apiResponse(httpStatus.CREATED, role));
    }
  } catch (error) {
    console.error('Error creating role:', error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: 'Internal server error',
    });
  }
});

// Function to get a role by its ID
const getRoleById = catchAsync(async (req, res) => {
  console.log('get id by query ', req.query.id);
  try {
    const role = await userRoleService.getRoleById(req.query.id);
    return res.status(httpStatus.OK).json(role);
  } catch (error) {
    console.error('Error getting role by ID:', error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error' });
  }
});

// Function to get all roles
const getAllRoles = catchAsync(async (req, res) => {
  console.log('get all role', req);
  try {
    const roles = await userRoleService.getAllRoles();
    return res.status(httpStatus.OK).json(roles);
  } catch (error) {
    console.error('Error getting all roles:', error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal server error' });
  }
});

module.exports = {
  createRole,
  getRoleById,
  getAllRoles,
};
