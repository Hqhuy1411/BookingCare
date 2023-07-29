-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "isCancelByPatient" BOOLEAN;

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "description" TEXT,
    "star" DOUBLE PRECISION NOT NULL,
    "byPatient" INTEGER NOT NULL,
    "toDoctor" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_toDoctor_fkey" FOREIGN KEY ("toDoctor") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
