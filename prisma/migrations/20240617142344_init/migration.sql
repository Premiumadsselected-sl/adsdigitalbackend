-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "user_service_domain_url" VARCHAR(255),
ADD COLUMN     "user_service_name" VARCHAR(100),
ADD COLUMN     "user_service_support_email" VARCHAR(100);
