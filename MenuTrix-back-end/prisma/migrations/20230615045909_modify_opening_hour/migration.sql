/*
  Warnings:

  - You are about to drop the column `endHour` on the `openingHour` table. All the data in the column will be lost.
  - You are about to drop the column `startHour` on the `openingHour` table. All the data in the column will be lost.
  - Added the required column `ofTimeHour` to the `openingHour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ofTimeMinute` to the `openingHour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toTimeHour` to the `openingHour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toTimeMinute` to the `openingHour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "openingHour" DROP COLUMN "endHour",
DROP COLUMN "startHour",
ADD COLUMN     "ofTimeHour" INTEGER NOT NULL,
ADD COLUMN     "ofTimeMinute" INTEGER NOT NULL,
ADD COLUMN     "toTimeHour" INTEGER NOT NULL,
ADD COLUMN     "toTimeMinute" INTEGER NOT NULL;
