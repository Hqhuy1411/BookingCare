/*
  Warnings:

  - A unique constraint covering the columns `[appointmentId]` on the table `Record` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Record_appointmentId_key" ON "Record"("appointmentId");

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
