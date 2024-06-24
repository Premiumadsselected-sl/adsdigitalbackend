-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "role" VARCHAR(50) DEFAULT 'subscriber',
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "token" VARCHAR(255),
    "status" VARCHAR(50) DEFAULT 'active',
    "locale" VARCHAR(10) DEFAULT 'en',
    "downloads" INTEGER DEFAULT 0,
    "user_name" VARCHAR(100),
    "user_data" JSONB DEFAULT '{}',
    "user_password_token" VARCHAR(100),
    "user_service_emails_styles" VARCHAR(255),
    "user_service_domain_url" VARCHAR(255),
    "user_service_support_email" VARCHAR(100),
    "user_service_name" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriptions" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "user_id" VARCHAR(100) NOT NULL,
    "user_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "trial_status" VARCHAR(50) DEFAULT 'active',
    "trial_start" TIMESTAMP(3),
    "trial_end" TIMESTAMP(3),
    "subscription_start" TIMESTAMP(3),
    "subscription_status" VARCHAR(50) DEFAULT 'pending',
    "subscription_code" VARCHAR(100),
    "subscription_end" TIMESTAMP(3),
    "down_date" TIMESTAMP(3),
    "down_reason" VARCHAR(100),

    CONSTRAINT "Subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Emails" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "user_id" VARCHAR(100) NOT NULL,
    "user_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "email_status" VARCHAR(50) DEFAULT 'pending',
    "email_code" VARCHAR(100),
    "email_date" TIMESTAMP(3),
    "email_subject" VARCHAR(255),
    "email_body" VARCHAR(255),
    "email_response" JSONB DEFAULT '{}',
    "email_error" JSONB DEFAULT '{}',

    CONSTRAINT "Emails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "id" TEXT NOT NULL,
    "user_id" VARCHAR(100) NOT NULL,
    "user_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "payment_status" VARCHAR(50) DEFAULT 'pending',
    "payment_code" VARCHAR(100),
    "payment_date" TIMESTAMP(3),
    "payment_amount" DOUBLE PRECISION DEFAULT 49.99,
    "payment_trial_amount" DOUBLE PRECISION DEFAULT 0.60,
    "payment_currency" VARCHAR(10) DEFAULT 'EUR',
    "payment_method" VARCHAR(50) DEFAULT 'card',
    "payment_details" VARCHAR(255),
    "payment_response" JSONB DEFAULT '{}',
    "payment_error" JSONB DEFAULT '{}',
    "payment_refund" JSONB DEFAULT '{}',
    "payment_refund_date" TIMESTAMP(3),
    "payment_refund_reason" VARCHAR(100),
    "payment_refund_status" VARCHAR(50) DEFAULT 'pending',
    "payment_refund_code" VARCHAR(100),
    "payment_refund_amount" DOUBLE PRECISION DEFAULT 49.99,
    "payment_refund_currency" VARCHAR(10) DEFAULT 'EUR',
    "payment_refund_method" VARCHAR(50) DEFAULT 'card',
    "payment_refund_details" JSONB DEFAULT '{}',
    "payment_refund_response" JSONB DEFAULT '{}',
    "payment_refund_error" JSONB DEFAULT '{}',
    "payment_logs" JSONB DEFAULT '{}',

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_token_key" ON "Users"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_user_id_key" ON "Subscriptions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriptions_email_key" ON "Subscriptions"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Emails_user_id_key" ON "Emails"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Emails_email_key" ON "Emails"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_user_id_key" ON "Payments"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_email_key" ON "Payments"("email");

-- AddForeignKey
ALTER TABLE "Subscriptions" ADD CONSTRAINT "Subscriptions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emails" ADD CONSTRAINT "Emails_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
