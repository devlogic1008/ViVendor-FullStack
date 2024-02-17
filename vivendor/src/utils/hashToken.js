import { createHash } from 'crypto';

/**
 * Hashes a token using SHA-512 algorithm.
 * @param {string} token - The token to be hashed.
 * @returns {string} - The hashed token.
 */
function hashToken(token) {
  // Create a Hash object using SHA-512 algorithm
  const hash = createHash('sha512');

  // Update the Hash object with the token
  hash.update(token);

  // Generate the hashed token in hexadecimal format
  const hashedToken = hash.digest('hex');

  return hashedToken;
}

export { hashToken };
