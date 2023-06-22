/*
  Warnings:

  - Added the required column `meatPointId` to the `orderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeMeatPoint" AS ENUM ('Mal_Passado', 'Ao_Ponto', 'Bem_Passado');

-- AlterTable
ALTER TABLE "orderProduct" ADD COLUMN     "meatPointId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "meatPoint" (
    "id" SERIAL NOT NULL,
    "name" "TypeMeatPoint" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meatPoint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "meatPoint_name_key" ON "meatPoint"("name");

-- AddForeignKey
ALTER TABLE "orderProduct" ADD CONSTRAINT "orderProduct_meatPointId_fkey" FOREIGN KEY ("meatPointId") REFERENCES "meatPoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;
