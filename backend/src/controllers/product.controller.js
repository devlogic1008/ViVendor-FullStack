const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dvkeelhmh', 
  api_key: '685198765693854', 
  api_secret: '_lOdyb5XDhgVzXVtiQne6vXn9nQ' 
});

const createProduct = async (req, res) => {
  try {
    const {
      title,
      body_html,
      variants,
      status,
      sortBy,
      product_type,
      vendor,
      costPrice,
      cog,
      recommendedPrice,
      quantity,
      weight,
      sku,
      barcode,
      length,
      width,
      height,
      tags,
      categories,
    } = req.body;

    const tagsString = Array.isArray(tags) ? tags.join(',') : '';
    const categoriesString = Array.isArray(categories) ? categories.join(',') : '';

    let imageUrl = ''; // Variable to store the Cloudinary image URL

    if (req.files && req.files.image) {
      const file = req.files.image;

      // Upload image to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(file.tempFilePath);

      // Get the image URL from the Cloudinary response
      imageUrl = cloudinaryResponse.url;
    }

    // Create a new product including the image URL
    const newProduct = await prisma.product.create({
      data: {
        title,
        body_html,
        status,
        sortBy,
        product_type,
        vendor,
        costPrice,
        cog,
        recommendedPrice,
        quantity,
        weight,
        sku,
        barcode,
        length,
        width,
        height,
        tags: tagsString,
        categories: categoriesString,
        image: imageUrl, // Include the Cloudinary image URL
        variants: variants
          ? {
              create: variants.map((variant) => ({
                ...variant,
              })),
            }
          : undefined,
      },
      include: {
        variants: true,
      },
    });

    return res.status(201).json({
      success: true,
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

module.exports = {
  createProduct,
};
