-- CreateTable
CREATE TABLE "ElectionSettings" (
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

    CONSTRAINT "ElectionSettings_pkey" PRIMARY KEY ("id")
);
