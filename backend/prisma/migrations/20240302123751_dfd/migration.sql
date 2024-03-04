/*
  Warnings:

  - You are about to alter the column `cog` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `costPrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `height` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `length` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `recommendedPrice` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `weight` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `width` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `cost` on the `ProductVariant` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `price` on the `ProductVariant` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `cog` on the `ProductVariant` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "cog" SET DATA TYPE INTEGER,
ALTER COLUMN "costPrice" SET DATA TYPE INTEGER,
ALTER COLUMN "height" SET DATA TYPE INTEGER,
ALTER COLUMN "length" SET DATA TYPE INTEGER,
ALTER COLUMN "recommendedPrice" SET DATA TYPE INTEGER,
ALTER COLUMN "weight" SET DATA TYPE INTEGER,
ALTER COLUMN "width" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "ProductVariant" ALTER COLUMN "cost" SET DATA TYPE INTEGER,
ALTER COLUMN "price" SET DATA TYPE INTEGER,
ALTER COLUMN "cog" SET DATA TYPE INTEGER;
