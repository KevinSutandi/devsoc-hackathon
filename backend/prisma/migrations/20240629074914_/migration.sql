-- AlterTable
ALTER TABLE `Journal` ALTER COLUMN `createdAt` DROP DEFAULT;

-- CreateTable
CREATE TABLE `Calendar` (
    `uid` VARCHAR(191) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `day` INTEGER NOT NULL,
    `month` INTEGER NOT NULL,
    `year` INTEGER NOT NULL,
    `mood` ENUM('LAUGHING', 'HAPPY', 'NEUTRAL', 'CRYING', 'WORRIED', 'SAD', 'ANGRY') NOT NULL,

    UNIQUE INDEX `Calendar_uid_day_month_year_key`(`uid`, `day`, `month`, `year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Calendar` ADD CONSTRAINT `Calendar_uid_fkey` FOREIGN KEY (`uid`) REFERENCES `Profile`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
