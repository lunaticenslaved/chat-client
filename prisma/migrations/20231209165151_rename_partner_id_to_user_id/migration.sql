/*
  Warnings:

  - You are about to drop the column `partnerId` on the `dialogs` table. All the data in the column will be lost.
  - Added the required column `userId` to the `dialogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dialogs" RENAME COLUMN "partnerId" TO "userId";
