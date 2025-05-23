-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verificationMessage" TEXT,
ADD COLUMN     "verificationStatus" TEXT DEFAULT 'pending';
