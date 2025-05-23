-- AlterTable
ALTER TABLE "User" ADD COLUMN     "age" INTEGER,
ADD COLUMN     "hasVoted" BOOLEAN DEFAULT false,
ADD COLUMN     "verified" BOOLEAN DEFAULT false;
