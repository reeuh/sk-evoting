-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "idBackUrl" TEXT,
ADD COLUMN     "idFrontUrl" TEXT,
ADD COLUMN     "idType" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "province" TEXT;
