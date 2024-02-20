const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const config = require('../config/config');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');

/**
 * Generate token
 * @param {string} userId
 * @param {moment.Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {string} userId
 * @param {moment.Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise}
 */
const saveToken = async (token, userId, expires, type, blacklisted = false) => {
  await prisma.token.create({
    data: {
      token,
      userId,
      expires: expires.toDate(),
      type: 'REFRESH', // Or use the correct token type based on your application logic
      blacklisted,
    },
  });
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise}
 */

const verifyToken = async (token, type) => {
  console.log('token', token, 'type', type);
  console.log('token', typeof token, 'type', typeof type);
  const secretkey = config.jwt.secret;
  console.log('🚀 ~ verifyToken ~ config: jtw secret: ', secretkey); 

  try {
    // const payload = jwt.verify(token, secretkey);
    const tokenString = token.token; // Extract the token string from the object
    const payload = jwt.verify(tokenString, secretkey); // Verify the token string

    // console.log('🚀 ~ verifyToken ~ payload:', payload);

    const tokenDoc = await prisma.token.findFirst({
      where: {
        token: tokenString,
        type,
        userId: payload.sub,
        blacklisted: false,
      },
    });

    // console.log('🚀 ~ verifyToken ~ tokenDoc:', tokenDoc); 

    if (!tokenDoc) {
      throw new Error('Token not found');
    }

    return tokenDoc;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw new Error('Token verification failed');
  }
};

/**
 * Generate auth tokens
 * @param {string} userId
 * @returns {Promise<Object>}
 */

const generateAuthTokens = async (userId) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    'minutes'
  );
  const accessToken = generateToken(
    userId,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    'days'
  );
  const refreshToken = generateToken(
    userId,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );
  await saveToken(
    refreshToken,
    userId,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
const generateResetPasswordToken = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
  }
  const expires = moment().add(
    config.jwt.resetPasswordExpirationMinutes,
    'minutes'
  );
  const resetPasswordToken = generateToken(
    user.id,
    expires,
    tokenTypes.RESET_PASSWORD
  );
  await saveToken(
    resetPasswordToken,
    user.id,
    expires,
    tokenTypes.RESET_PASSWORD
  );
  return resetPasswordToken;
};

/**
 * Generate verify email token
 * @param {string} userId
 * @returns {Promise<string>}
 */
const generateVerifyEmailToken = async (userId) => {
  const expires = moment().add(
    config.jwt.verifyEmailExpirationMinutes,
    'minutes'
  );
  const verifyEmailToken = generateToken(
    userId,
    expires,
    tokenTypes.VERIFY_EMAIL
  );
  await saveToken(verifyEmailToken, userId, expires, tokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
  generateResetPasswordToken,
  generateVerifyEmailToken,
};
