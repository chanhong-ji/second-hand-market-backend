/*
  Warnings:

  - Added the required column `postId` to the `Interest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Interest" ADD COLUMN     "postId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Interest" ADD CONSTRAINT "Interest_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
