const { PrismaClient } = require('@prisma/client');
const app = require('./src/app');
const config = require('./src/config/config');
const logger = require('./src/config/logger');

const prisma = new PrismaClient();

let server;

prisma
  .$connect()
  .then(() => {
    logger.info('Connected to PostgreSQL database');
    server = app.listen(config.port, () => {
      logger.info(`Listening to port http://localhost:${config.port}`);
    });
  })
  .catch((error) => {
    logger.error('Error connecting to PostgreSQL database:', error);
    process.exit(1);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      prisma.$disconnect();
      process.exit(1);
    });
  } else {
    prisma.$disconnect();
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
