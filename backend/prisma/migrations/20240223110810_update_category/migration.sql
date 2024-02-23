-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_parentCategoryId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "image" SET DATA TYPE TEXT;
