/*
  Warnings:

  - You are about to drop the column `bedroomDescription` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "bedroomDescription",
ADD COLUMN     "bedroomDesc" TEXT;
