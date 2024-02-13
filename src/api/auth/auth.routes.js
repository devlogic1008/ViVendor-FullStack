import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { generateTokens } from '../../utils/jwt.js';
import { addRefreshTokenToWhitelist } from './auth.services.js';
import {
  findUserByEmail,
  createUserByEmailAndPassword,
} from '../users/users.services.js';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    // Extract email and password from request body
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      res
        .status(400)
        .json({ error: 'You must provide an email and a password.' });
      return;
    }

    // Check if user with provided email already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ error: 'Email already in use.' });
      return;
    }

    // Create new user with provided email and password
    const user = await createUserByEmailAndPassword({ email, password });

    // Generate unique token identifier (jti)
    const jti = uuidv4();

    // Generate access and refresh tokens for the user
    const { accessToken, refreshToken } = generateTokens(user, jti);

    // Add refresh token to whitelist
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

    // Send success response with tokens
    res.json({ accessToken, refreshToken });
    console.log('Registration successful.');
  } catch (err) {
    // Handle errors
    console.error('Error during registration:', err.message);
    next(err);
  }
});

export default router;
