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

    let productImages = [];

    if (req.files && req.files.images) {
      const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

      productImages = await Promise.all(files.map(async (file) => {
        const cloudinaryResponse = await cloudinary.uploader.upload(file.tempFilePath);
        return {
          url: cloudinaryResponse.url,
          altText: 'Image Alt Text',
        };
      }));
    }

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
        images: {
          create: productImages,
        },
        variants: variants
          ? {
              create: variants.map((variant) => ({ ...variant })),
            }
          : undefined,
      },
      include: {
        variants: true,
        images: true,
      },
    });

    // Create ProductCategories entries for each category
    await Promise.all(
      categories.map(async (category) => {
        await prisma.productCategories.create({
          data: {
            title: category,
            product_id: newProduct.id,
          },
        });
      })
    );

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






const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const allProducts = await prisma.product.findMany({
      include: {
        variants: true,
        images: true,
        categories: true,
      },
    });

    return res.status(200).json({
      success: true,
      data: allProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Delete product images from Cloudinary
    const productImages = await prisma.productImage.findMany({
      where: {
        product_id: productId,
      },
    });

    await Promise.all(
      productImages.map(async (image) => {
        if (image.publicId) {
          // Ensure 'publicId' property exists in the image object
          await cloudinary.uploader.destroy(image.publicId);
        }
      })
    );

    // Delete product and related entries from the database
    await prisma.productCategories.deleteMany({
      where: {
        product_id: productId,
      },
    });

    await prisma.productImage.deleteMany({
      where: {
        product_id: productId,
      },
    });

    await prisma.variant.deleteMany({
      where: {
        product_id: productId,
      },
    });

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
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
  getAllProducts,
  deleteProduct
};
