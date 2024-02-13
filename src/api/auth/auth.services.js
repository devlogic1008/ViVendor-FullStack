import { db } from '../../utils/db.js';
import { hashToken } from '../../utils/hashToken.js';

/**
 * Adds a refresh token to the whitelist.
 * @param {object} data - Object containing jti, refreshToken, and userId.
 * @returns {Promise} - A promise that resolves to the created refresh token.
 */
function addRefreshTokenToWhitelist({ jti, refreshToken, userId }) {
  return db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
}

/**
 * Finds a refresh token by ID.
 * @param {string} id - The ID of the refresh token to find.
 * @returns {Promise} - A promise that resolves to the found refresh token.
 */
function findRefreshTokenById(id) {
  return db.refreshToken.findUnique({
    where: {
      id,
    },
  });
}

/**
 * Soft deletes a refresh token by ID.
 * @param {string} id - The ID of the refresh token to delete.
 * @returns {Promise} - A promise that resolves when the refresh token is deleted.
 */
function deleteRefreshToken(id) {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
}

/**
 * Revokes all refresh tokens associated with a user.
 * @param {string} userId - The ID of the user whose tokens need to be revoked.
 * @returns {Promise} - A promise that resolves when the tokens are revoked.
 */
function revokeTokens(userId) {
  return db.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
}

export {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
};
