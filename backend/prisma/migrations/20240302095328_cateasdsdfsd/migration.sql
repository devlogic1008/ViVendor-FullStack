/*
  Warnings:

  - Made the column `title` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `body_html` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `ProductVariant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "body_html" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProductVariant" ALTER COLUMN "title" SET NOT NULL;
