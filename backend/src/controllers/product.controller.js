const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProduct = async (req, res) => {
  try {
    // Extract product data from the request body
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
      categories
    } = req.body;

    // Assume you have a Product model
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
        tags,
        categories,
        // ... other product fields ...
        variants: variants
          ? {
              create: variants.map((variant) => ({
                ...variant,
              })),
            }
          : undefined,
      },
      include: {
        variants: true, // Include the created variants in the response
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
