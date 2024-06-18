/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "payment_trial_amount" DOUBLE PRECISION DEFAULT 0.60,
ALTER COLUMN "payment_amount" SET DEFAULT 49.99,
ALTER COLUMN "payment_currency" SET DEFAULT 'EUR',
ALTER COLUMN "payment_method" SET DEFAULT 'card',
ALTER COLUMN "payment_refund_amount" SET DEFAULT 49.99,
ALTER COLUMN "payment_refund_currency" SET DEFAULT 'EUR',
ALTER COLUMN "payment_refund_method" SET DEFAULT 'card';

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "token" VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "Users_token_key" ON "Users"("token");
