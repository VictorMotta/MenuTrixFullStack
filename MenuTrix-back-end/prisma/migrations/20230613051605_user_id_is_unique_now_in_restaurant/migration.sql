/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `restaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "restaurant_userId_key" ON "restaurant"("userId");
