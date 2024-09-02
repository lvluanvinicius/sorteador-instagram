-- AlterTable
ALTER TABLE `sessions` ADD COLUMN `remote_ip` TEXT NULL,
    ADD COLUMN `user_agent` TEXT NULL;
