/*
  Warnings:

  - Added the required column `isRead` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "isRead" BOOLEAN NOT NULL;
