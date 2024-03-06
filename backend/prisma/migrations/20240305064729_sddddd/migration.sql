/*
  Warnings:

  - You are about to drop the column `body_html` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "body_html",
ADD COLUMN     "description" TEXT;
