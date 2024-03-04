/*
  Warnings:

  - You are about to drop the column `handle` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `option1` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `option2` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `option3` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `options` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `parent_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `published_scope` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `site_url` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `template_suffix` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `barcode` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `compare_at_price` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `fulfillment_service` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `image_id` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `inventory_item_id` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `inventory_management` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `inventory_policy` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `inventory_quantity` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `parent_variant_id` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `requires_shipping` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `store_id` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `taxable` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `variant_id` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `ProductVariant` table. All the data in the column will be lost.
  - You are about to drop the column `weight_unit` on the `ProductVariant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "handle",
DROP COLUMN "images",
DROP COLUMN "option1",
DROP COLUMN "option2",
DROP COLUMN "option3",
DROP COLUMN "options",
DROP COLUMN "parent_id",
DROP COLUMN "product_id",
DROP COLUMN "published_scope",
DROP COLUMN "site_url",
DROP COLUMN "store_id",
DROP COLUMN "template_suffix",
ADD COLUMN     "barcode" TEXT,
ADD COLUMN     "categories" TEXT,
ADD COLUMN     "cog" DOUBLE PRECISION,
ADD COLUMN     "costPrice" DOUBLE PRECISION,
ADD COLUMN     "height" DOUBLE PRECISION,
ADD COLUMN     "length" DOUBLE PRECISION,
ADD COLUMN     "quantity" INTEGER,
ADD COLUMN     "recommendedPrice" DOUBLE PRECISION,
ADD COLUMN     "sku" TEXT,
ADD COLUMN     "sortBy" TEXT,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "weight" DOUBLE PRECISION,
ADD COLUMN     "width" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "barcode",
DROP COLUMN "compare_at_price",
DROP COLUMN "fulfillment_service",
DROP COLUMN "image_id",
DROP COLUMN "inventory_item_id",
DROP COLUMN "inventory_management",
DROP COLUMN "inventory_policy",
DROP COLUMN "inventory_quantity",
DROP COLUMN "parent_variant_id",
DROP COLUMN "position",
DROP COLUMN "requires_shipping",
DROP COLUMN "store_id",
DROP COLUMN "taxable",
DROP COLUMN "variant_id",
DROP COLUMN "weight",
DROP COLUMN "weight_unit",
ADD COLUMN     "cog" DOUBLE PRECISION,
ADD COLUMN     "quantity" INTEGER;
