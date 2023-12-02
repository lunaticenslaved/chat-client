-- CreateTable
CREATE TABLE "dialogs" (
    "id" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "dialogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "authorId" TEXT NOT NULL,
    "dialogId" TEXT NOT NULL,
    "text" VARCHAR(4096) NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_dialogId_fkey" FOREIGN KEY ("dialogId") REFERENCES "dialogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
