import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { config as dotenvConfig } from 'dotenv'; // Importing named export 'config' from dotenv
import * as middlewares from './middlewares.js'; // Importing all named exports from middlewares module
import api from './api.js'; // Importing default export from api module

// Load environment variables from .env file
dotenvConfig();

// Create Express application
const app = express();

// Middleware setup
app.use(morgan('dev')); // Logging middleware
app.use(helmet()); // Security headers middleware
app.use(cors()); // CORS middleware
app.use(express.json()); // JSON body parser middleware

// Route to root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Authentication System', // Response message
  });
});

// API routes
app.use('/api/v1', api);

// Middleware for handling 404 Not Found errors
app.use(middlewares.notFound);

// Middleware for handling other errors
app.use(middlewares.errorHandler);

// Export the Express application
export default app;
