-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "created_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "created_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3);
