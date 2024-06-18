/*
  Warnings:

  - Added the required column `email` to the `Subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscriptions" ADD COLUMN     "email" VARCHAR(100) NOT NULL;
