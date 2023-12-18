-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_connectionId_fkey";

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "connections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
