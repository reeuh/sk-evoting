/*
  Warnings:

  - You are about to drop the column `party` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `candidateId` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `bio` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_userId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_candidateId_fkey";

-- DropIndex
DROP INDEX "Candidate_userId_key";

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "party",
DROP COLUMN "platform",
DROP COLUMN "userId",
ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "candidateId";

-- CreateTable
CREATE TABLE "Voter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Voter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Voter_email_key" ON "Voter"("email");
