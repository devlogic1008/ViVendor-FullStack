/*
  Warnings:

  - You are about to drop the column `permisionId` on the `userPermissions` table. All the data in the column will be lost.
  - Added the required column `permissionId` to the `userPermissions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "userPermissions" DROP CONSTRAINT "userPermissions_permisionId_fkey";

-- AlterTable
ALTER TABLE "userPermissions" DROP COLUMN "permisionId",
ADD COLUMN     "permissionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "userPermissions" ADD CONSTRAINT "userPermissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
