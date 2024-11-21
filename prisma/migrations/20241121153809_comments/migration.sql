/*
  Warnings:

  - You are about to drop the column `userId` on the `profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Profile_userId_key` ON `profile`;

-- AlterTable
ALTER TABLE `profile` DROP COLUMN `userId`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `author_id` INTEGER NOT NULL,
    `post_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Profile_user_id_key` ON `Profile`(`user_id`);
