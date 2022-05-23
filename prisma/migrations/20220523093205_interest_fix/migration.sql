/*
  Warnings:

  - A unique constraint covering the columns `[postId,userId]` on the table `Interest` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Interest_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Interest_postId_userId_key" ON "Interest"("postId", "userId");
