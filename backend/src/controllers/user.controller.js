const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: req.body,
    });
    res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};
const getStaff = async (req, res) => {
  try {
    // Query all staff from the database
    const users = await prisma.user.findMany({
      include: {
        roles: {
          include: {
            role: true,
          },
        },
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });

    // Count the number of staff
    const staffCount = await prisma.user.count();

    // Return the staff list and count
    res.json({ count: staffCount, staff: users });
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.send(users);
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.userId),
      },
    });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

const countUsers = async (req, res) => {
  try {
    const userCount = await prisma.user.count();
    // Similar logic for other models
    const counts = {
      users: userCount,
      // Add counts for other models
    };
    res.status(httpStatus.OK).json(counts);
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

const getUserByToken = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming req.user is set by your authentication middleware
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ error: 'User not found' });
    }
    // Additional logic for merging data based on user role
    res.send({ user });
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(req.params.userId),
      },
      data: req.body,
    });
    res.send(updatedUser);
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: parseInt(req.params.userId),
      },
    });
    res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error(error);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Unauthorized: Missing or invalid token');
    }
    const token = authHeader.split(' ')[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Retrieve user information from the database based on the token
    const user = await prisma.user.findUnique({
      where: { id: decoded.sub },
    });

    if (!user) {
      throw new ApiError(401, 'Unauthorized: Invalid token');
    }

    // Send the user object in the response
    res.json({ user });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  countUsers,
  createUser,
  getUsers,
  getStaff,
  getUser,
  updateUser,
  deleteUser,
  getUserByToken,
  authMiddleware,
};
