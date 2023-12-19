/*
  Warnings:

  - You are about to drop the column `sockets` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `users` on the `connections` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_sockets_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "sockets";

-- AlterTable
ALTER TABLE "connections" DROP COLUMN "users";

-- CreateTable
CREATE TABLE "Socket" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Socket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ConnectionToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Socket_userId_key" ON "Socket"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_id_key" ON "Contact"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_ConnectionToUser_AB_unique" ON "_ConnectionToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ConnectionToUser_B_index" ON "_ConnectionToUser"("B");

-- AddForeignKey
ALTER TABLE "Socket" ADD CONSTRAINT "Socket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConnectionToUser" ADD CONSTRAINT "_ConnectionToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "connections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConnectionToUser" ADD CONSTRAINT "_ConnectionToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
