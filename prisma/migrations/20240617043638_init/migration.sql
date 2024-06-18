-- CreateTable
CREATE TABLE "Users" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "user_name" VARCHAR(100),
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "role" VARCHAR(50) NOT NULL DEFAULT 'subscriber',
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "user_data" JSONB DEFAULT '{}',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriptions" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "user_id" VARCHAR(100) NOT NULL,
    "user_name" VARCHAR(100) NOT NULL,
    "trial_status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "trial_start" TIMESTAMP(3) NOT NULL,
    "trial_end" TIMESTAMP(3) NOT NULL,
    "subscription_start" TIMESTAMP(3) NOT NULL,
    "subscription_status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "subscription_code" VARCHAR(100) NOT NULL,
    "subscription_end" TIMESTAMP(3) NOT NULL,
    "down_date" TIMESTAMP(3),
    "down_reason" VARCHAR(100),

    CONSTRAINT "Subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_user_id_key" ON "Subscriptions"("user_id");
