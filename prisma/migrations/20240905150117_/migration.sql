/*
  Warnings:

  - Added the required column `raffles_instances_id` to the `raffles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `raffles_instances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `raffles` ADD COLUMN `raffles_instances_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `raffles_instances` ADD COLUMN `code` TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `raffles` ADD CONSTRAINT `raffles_raffles_instances_id_fkey` FOREIGN KEY (`raffles_instances_id`) REFERENCES `raffles_instances`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
