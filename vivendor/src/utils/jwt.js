const jwt = require('jsonwebtoken');

// Function to generate an access token for a user
// Access tokens are typically short-lived and used for authenticating API requests
function generateAccessToken(user) {
  // Sign the payload containing the user ID with the access secret and set expiration time to 5 minutes
  return jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: '1800s', // '30m'
  });
}

// Function to generate a refresh token for a user
// Refresh tokens are used to obtain new access tokens without requiring the user to log in again
function generateRefreshToken(user, jti) {
  // Sign the payload containing the user ID and JWT identifier (jti) with the refresh secret
  // Set expiration time to 8 hours
  return jwt.sign(
    {
      userId: user.id,
      jti,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: '8h', 
    }
  );
}

// Function to generate both access and refresh tokens for a user
function generateTokens(user, jti) {
  // Generate access token using the generateAccessToken function
  const accessToken = generateAccessToken(user);
  // Generate refresh token using the generateRefreshToken function
  const refreshToken = generateRefreshToken(user, jti);

  // Return both tokens as an object
  return {
    accessToken,
    refreshToken,
  };
}

// Export functions for use in other modules
module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
};
