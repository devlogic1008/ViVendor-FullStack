/*
  Warnings:

  - The `cog` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `costPrice` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `height` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `length` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `quantity` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `recommendedPrice` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `weight` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `width` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cost` column on the `ProductVariant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `price` column on the `ProductVariant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `cog` column on the `ProductVariant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `quantity` column on the `ProductVariant` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "cog",
ADD COLUMN     "cog" DOUBLE PRECISION,
DROP COLUMN "costPrice",
ADD COLUMN     "costPrice" DOUBLE PRECISION,
DROP COLUMN "height",
ADD COLUMN     "height" DOUBLE PRECISION,
DROP COLUMN "length",
ADD COLUMN     "length" DOUBLE PRECISION,
DROP COLUMN "quantity",
ADD COLUMN     "quantity" INTEGER,
DROP COLUMN "recommendedPrice",
ADD COLUMN     "recommendedPrice" DOUBLE PRECISION,
DROP COLUMN "weight",
ADD COLUMN     "weight" DOUBLE PRECISION,
DROP COLUMN "width",
ADD COLUMN     "width" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "cost",
ADD COLUMN     "cost" DOUBLE PRECISION,
DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION,
DROP COLUMN "cog",
ADD COLUMN     "cog" DOUBLE PRECISION,
DROP COLUMN "quantity",
ADD COLUMN     "quantity" INTEGER;
