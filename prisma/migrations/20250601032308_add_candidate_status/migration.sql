/*
  Warnings:

  - You are about to drop the column `position` on the `Vote` table. All the data in the column will be lost.
  - Made the column `hasVoted` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `chairpersonId` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Vote_userId_position_key";

-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "hasVoted" SET NOT NULL;

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "position",
ADD COLUMN     "chairpersonId" TEXT NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "VoteDetail" (
    "id" TEXT NOT NULL,
    "voteId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VoteDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_chairpersonId_fkey" FOREIGN KEY ("chairpersonId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteDetail" ADD CONSTRAINT "VoteDetail_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES "Vote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteDetail" ADD CONSTRAINT "VoteDetail_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
