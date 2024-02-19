const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger');
const { PrismaClientKnownRequestError } = require('@prisma/client');
const ApiError = require('../utils/ApiError');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    let message = httpStatus[statusCode];
    let isOperational = false;

    if (error instanceof PrismaClientKnownRequestError) {
      // Handle Prisma specific known errors
      statusCode = httpStatus.BAD_REQUEST;
      message = error.message || httpStatus[statusCode];
    } else if (error instanceof Error) {
      // Handle general errors
      statusCode = httpStatus.INTERNAL_SERVER_ERROR;
      message = error.message || httpStatus[statusCode];
    }

    // Set isOperational to true for client errors
    if (statusCode >= 400 && statusCode < 500) {
      isOperational = true;
    }

    error = new ApiError(statusCode, message, isOperational, err.stack);
  }

  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
