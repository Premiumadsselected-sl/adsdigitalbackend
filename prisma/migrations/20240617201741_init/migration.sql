/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Payments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Payments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Subscriptions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payments_user_id_key" ON "Payments"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_email_key" ON "Payments"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_email_key" ON "Subscriptions"("email");

-- AddForeignKey
ALTER TABLE "Subscriptions" ADD CONSTRAINT "Subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
