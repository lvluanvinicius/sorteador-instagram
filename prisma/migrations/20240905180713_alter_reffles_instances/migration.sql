/*
  Warnings:

  - You are about to drop the column `provider_account_id` on the `raffles_instances` table. All the data in the column will be lost.
  - Added the required column `type` to the `raffles_instances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `raffles_instances` DROP COLUMN `provider_account_id`,
    ADD COLUMN `type` VARCHAR(191) NOT NULL;
