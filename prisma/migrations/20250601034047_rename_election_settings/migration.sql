/*
  Warnings:

  - You are about to drop the `ElectionSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ElectionSettings";

-- CreateTable
CREATE TABLE "ElectionSetting" (
    "id" TEXT NOT NULL DEFAULT 'current',
    "registrationStart" TIMESTAMP(3) NOT NULL,
    "registrationEnd" TIMESTAMP(3) NOT NULL,
    "votingStart" TIMESTAMP(3) NOT NULL,
    "votingEnd" TIMESTAMP(3) NOT NULL,
    "enableRegistration" BOOLEAN NOT NULL DEFAULT true,
    "enableVoting" BOOLEAN NOT NULL DEFAULT false,
    "showResults" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ElectionSetting_pkey" PRIMARY KEY ("id")
);
