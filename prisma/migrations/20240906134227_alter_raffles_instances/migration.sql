/*
  Warnings:

  - Added the required column `description` to the `raffles_instances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `raffles_instances` ADD COLUMN `description` TEXT NOT NULL;
