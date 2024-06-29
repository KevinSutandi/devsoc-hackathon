/*
  Warnings:

  - You are about to drop the column `journalId` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `profileUid` to the `Journal` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Profile` DROP FOREIGN KEY `Profile_journalId_fkey`;

-- AlterTable
ALTER TABLE `Journal` ADD COLUMN `profileUid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `journalId`;

-- AddForeignKey
ALTER TABLE `Journal` ADD CONSTRAINT `Journal_profileUid_fkey` FOREIGN KEY (`profileUid`) REFERENCES `Profile`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
