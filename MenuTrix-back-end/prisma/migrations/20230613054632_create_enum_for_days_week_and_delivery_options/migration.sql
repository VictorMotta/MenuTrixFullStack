/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `daysWeek` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `deliveryOptions` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `name` on the `daysWeek` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `name` on the `deliveryOptions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DeliveryOptionsName" AS ENUM ('delivery', 'withdrawal', 'local');

-- CreateEnum
CREATE TYPE "DaysWeekName" AS ENUM ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');

-- AlterTable
ALTER TABLE "daysWeek" DROP COLUMN "name",
ADD COLUMN     "name" "DaysWeekName" NOT NULL;

-- AlterTable
ALTER TABLE "deliveryOptions" DROP COLUMN "name",
ADD COLUMN     "name" "DeliveryOptionsName" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "daysWeek_name_key" ON "daysWeek"("name");

-- CreateIndex
CREATE UNIQUE INDEX "deliveryOptions_name_key" ON "deliveryOptions"("name");
