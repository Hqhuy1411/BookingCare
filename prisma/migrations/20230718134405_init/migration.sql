-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "descriptionByPatient" TEXT,
ADD COLUMN     "isAcceptByDoctor" BOOLEAN,
ADD COLUMN     "isCancel" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isFinshed" BOOLEAN NOT NULL DEFAULT false;
