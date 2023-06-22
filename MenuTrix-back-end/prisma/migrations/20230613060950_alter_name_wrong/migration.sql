/*
  Warnings:

  - You are about to drop the `openningHour` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "openningHour" DROP CONSTRAINT "openningHour_daysWeekId_fkey";

-- DropForeignKey
ALTER TABLE "openningHour" DROP CONSTRAINT "openningHour_restaurantId_fkey";

-- DropTable
DROP TABLE "openningHour";

-- CreateTable
CREATE TABLE "openingHour" (
    "id" SERIAL NOT NULL,
    "startHour" TEXT NOT NULL,
    "endHour" TEXT NOT NULL,
    "restaurantId" INTEGER NOT NULL,
    "daysWeekId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "openingHour_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "openingHour" ADD CONSTRAINT "openingHour_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "openingHour" ADD CONSTRAINT "openingHour_daysWeekId_fkey" FOREIGN KEY ("daysWeekId") REFERENCES "daysWeek"("id") ON DELETE CASCADE ON UPDATE CASCADE;
