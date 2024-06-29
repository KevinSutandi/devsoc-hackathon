-- CreateTable
CREATE TABLE `Todo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `profileUid` VARCHAR(191) NOT NULL,
    `check` BOOLEAN NOT NULL,
    `note` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Todo` ADD CONSTRAINT `Todo_profileUid_fkey` FOREIGN KEY (`profileUid`) REFERENCES `Profile`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
