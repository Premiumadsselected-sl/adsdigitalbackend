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
    "email_logs" JSONB DEFAULT '{}',

    CONSTRAINT "Emails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Emails_user_id_key" ON "Emails"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Emails_email_key" ON "Emails"("email");

-- AddForeignKey
ALTER TABLE "Emails" ADD CONSTRAINT "Emails_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
