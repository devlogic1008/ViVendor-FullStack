const Joi = require('joi');

const createRole = Joi.object({
  name: Joi.string().required(),
  // Add more validations as needed
});

module.exports = {createRole};
