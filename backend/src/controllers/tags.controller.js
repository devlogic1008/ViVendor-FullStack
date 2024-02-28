
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createTag = async (req, res) => {
    try {
      const { title } = req.body;
  
      const newTag = await prisma.tag.create({
        data: {
          title,
        },
      });
  
      res.status(201).json(newTag);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const getAllTags = async (req, res) => {
    try {
      const tags = await prisma.tag.findMany();
      res.status(200).json(tags);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  const deleteTag = async (req, res) => {
    try {
      const { id } = req.params;
  
      await prisma.tag.delete({
        where: { id: parseInt(id) },
      });
  
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  module.exports = {
   createTag,
   getAllTags,
   deleteTag
  };
  