-- CreateTable
CREATE TABLE "_readedMessages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_readedMessages_AB_unique" ON "_readedMessages"("A", "B");

-- CreateIndex
CREATE INDEX "_readedMessages_B_index" ON "_readedMessages"("B");

-- AddForeignKey
ALTER TABLE "_readedMessages" ADD CONSTRAINT "_readedMessages_A_fkey" FOREIGN KEY ("A") REFERENCES "messages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_readedMessages" ADD CONSTRAINT "_readedMessages_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
