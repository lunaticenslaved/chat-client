/*
  Warnings:

  - You are about to drop the column `dialogId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `isRead` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the `dialogs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `connectionId` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_dialogId_fkey";

-- AlterTable
DELETE FROM "messages";
ALTER TABLE "messages" DROP COLUMN "dialogId",
DROP COLUMN "isRead",
ADD COLUMN     "connectionId" TEXT NOT NULL;

-- DropTable
DROP TABLE "dialogs";

-- CreateTable
CREATE TABLE "connections" (
    "id" TEXT NOT NULL,
    "users" TEXT[],

    CONSTRAINT "connections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "oneToOneDialogs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "connectionId" TEXT NOT NULL,

    CONSTRAINT "oneToOneDialogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groupDialogs" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "connectionId" TEXT NOT NULL,

    CONSTRAINT "groupDialogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "oneToOneDialogs_connectionId_key" ON "oneToOneDialogs"("connectionId");

-- CreateIndex
CREATE UNIQUE INDEX "groupDialogs_connectionId_key" ON "groupDialogs"("connectionId");

-- AddForeignKey
ALTER TABLE "oneToOneDialogs" ADD CONSTRAINT "oneToOneDialogs_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "connections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupDialogs" ADD CONSTRAINT "groupDialogs_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "connections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "connections"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
