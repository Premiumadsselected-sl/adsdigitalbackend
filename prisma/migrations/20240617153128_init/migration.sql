-- AlterTable
ALTER TABLE "Subscriptions" ALTER COLUMN "trial_status" DROP NOT NULL,
ALTER COLUMN "trial_start" DROP NOT NULL,
ALTER COLUMN "trial_end" DROP NOT NULL,
ALTER COLUMN "subscription_start" DROP NOT NULL,
ALTER COLUMN "subscription_status" DROP NOT NULL,
ALTER COLUMN "subscription_code" DROP NOT NULL,
ALTER COLUMN "subscription_end" DROP NOT NULL;
