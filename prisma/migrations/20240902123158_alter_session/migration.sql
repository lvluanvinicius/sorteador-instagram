/*
  Warnings:

  - Changed the type of `expires` on the `sessions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `sessions` DROP COLUMN `expires`,
    ADD COLUMN `expires` INTEGER NOT NULL;
