/*
  Warnings:

  - The values [Mal_Passado,Ao_Ponto,Bem_Passado] on the enum `TypeMeatPoint` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TypeMeatPoint_new" AS ENUM ('MEAT_RARE', 'MEDIUM_MEAT', 'WELL_DONE_MEAT');
ALTER TABLE "meatPoint" ALTER COLUMN "name" TYPE "TypeMeatPoint_new" USING ("name"::text::"TypeMeatPoint_new");
ALTER TYPE "TypeMeatPoint" RENAME TO "TypeMeatPoint_old";
ALTER TYPE "TypeMeatPoint_new" RENAME TO "TypeMeatPoint";
DROP TYPE "TypeMeatPoint_old";
COMMIT;
