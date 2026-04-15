/*
  Warnings:

  - You are about to drop the column `bakalariAccessToken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `bakalariConnected` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `bakalariLastSync` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `bakalariPasswordEnc` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `bakalariRefreshToken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `bakalariUsername` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `microsoftId` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('IN_PROGRESS', 'PLANNED', 'COMPLETED');

-- DropIndex
DROP INDEX "public"."users_microsoftId_idx";

-- DropIndex
DROP INDEX "public"."users_microsoftId_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "bakalariAccessToken",
DROP COLUMN "bakalariConnected",
DROP COLUMN "bakalariLastSync",
DROP COLUMN "bakalariPasswordEnc",
DROP COLUMN "bakalariRefreshToken",
DROP COLUMN "bakalariUsername",
DROP COLUMN "microsoftId";

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "date" TIMESTAMP(3),
    "author" TEXT,
    "status" "ProjectStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "createdById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "projects_status_idx" ON "projects"("status");

-- CreateIndex
CREATE INDEX "projects_date_idx" ON "projects"("date");

-- CreateIndex
CREATE INDEX "projects_createdById_idx" ON "projects"("createdById");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
