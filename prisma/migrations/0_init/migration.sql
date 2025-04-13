CREATE TABLE `quotations` (
    `id` SERIAL NOT NULL,
    `salesperson` VARCHAR(255) NOT NULL,
    `content` TEXT,
    `status` VARCHAR(16) NOT NULL DEFAULT 'pending',
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);