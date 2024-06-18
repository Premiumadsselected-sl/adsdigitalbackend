/*
  Warnings:

  - You are about to alter the column `user_service_emails_styles` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `JsonB` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "user_service_emails_styles" DROP DEFAULT,
ALTER COLUMN "user_service_emails_styles" SET DATA TYPE VARCHAR(255);
