/*
  Warnings:

  - Added the required column `userId` to the `userRoles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userRoles" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "userRoles" ADD CONSTRAINT "userRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
