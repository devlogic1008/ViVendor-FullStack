const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const Helper = require('../utils/Helper');
const { categoryService } = require('../services');
const api = require('../utils/messages');

const createCategory = catchAsync(async (req, res) => {
  console.log('createCategory body', req.body);
  try {
    const category = await categoryService.createCategory(req.body);
    // console.log("🚀 ~ createCategory ~ category:", category)
    if (!category) {
      res
        .status(httpStatus.BAD_REQUEST)
        .send(
          Helper.apiResponse(httpStatus.BAD_REQUEST, api.category.storeError)
        );
    } else {
      res
        .status(httpStatus.CREATED)
        .send(Helper.apiResponse(httpStatus.CREATED, category));
    }
  } catch (error) {
    console.error('Error while creating category:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
      error: 'Internal server error',
    });
  }
});

module.exports = {
  createCategory,
};
