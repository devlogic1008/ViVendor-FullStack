const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createRole = async (data) => {
  try {
    // Create the role in the database using Prisma
    const role = await prisma.role.create({
      data: {
        name: data.name,
      },
    });

    return role; // Return the created role object
  } catch (error) {
    throw error; // Throw any errors that occur during role creation
  }
};

module.exports = {
  createRole,
};
