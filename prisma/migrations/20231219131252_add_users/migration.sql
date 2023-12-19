-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "sockets" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "isOnline" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_sockets_key" ON "User"("sockets");
