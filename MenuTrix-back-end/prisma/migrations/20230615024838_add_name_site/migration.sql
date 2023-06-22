/*
  Warnings:

  - A unique constraint covering the columns `[nameParamSite]` on the table `restaurant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `nameParamSite` to the `restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "restaurant" ADD COLUMN     "nameParamSite" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_nameParamSite_key" ON "restaurant"("nameParamSite");
