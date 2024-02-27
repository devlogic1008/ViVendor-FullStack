/*
  Warnings:

  - You are about to drop the column `userId` on the `userRoles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "userRoles" DROP CONSTRAINT "userRoles_userId_fkey";

-- AlterTable
ALTER TABLE "userRoles" DROP COLUMN "userId";
