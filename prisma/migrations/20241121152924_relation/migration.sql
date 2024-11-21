/*
  Warnings:

  - Added the required column `author_id` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` ADD COLUMN `author_id` INTEGER NOT NULL,
    ADD COLUMN `content` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `join_state` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `bio` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Profile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
