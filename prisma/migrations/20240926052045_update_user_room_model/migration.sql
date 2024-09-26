/*
  Warnings:

  - You are about to drop the column `description` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `User` table. All the data in the column will be lost.
  - Added the required column `desc` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "description",
ADD COLUMN     "desc" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "description",
ADD COLUMN     "desc" TEXT;
