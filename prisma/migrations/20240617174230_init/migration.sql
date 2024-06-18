/*
  Warnings:

  - You are about to alter the column `payment_details` on the `Payments` table. The data in that column could be lost. The data in that column will be cast from `JsonB` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Payments" ALTER COLUMN "payment_details" DROP DEFAULT,
ALTER COLUMN "payment_details" SET DATA TYPE VARCHAR(255);
