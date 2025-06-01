/*
  Warnings:

  - The `status` column on the `Candidate` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "CandidateStatus" AS ENUM ('active', 'inactive');

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "status",
ADD COLUMN     "status" "CandidateStatus" NOT NULL DEFAULT 'active';
