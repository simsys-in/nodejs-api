CREATE TABLE `fitness_cloud_db`.`user_mas` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `phone` VARCHAR(255) NOT NULL , `password` VARCHAR(255) NOT NULL , `tenant_id` INT(255) NOT NULL , `role` VARCHAR(255) NOT NULL , `created_by` VARCHAR(255) NOT NULL , `created_time` DATETIME NOT NULL , `updated_time` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

ALTER TABLE `user_mas` CHANGE `created_time` `createdAt` DATE NOT NULL;

ALTER TABLE `user_mas` CHANGE `updated_time` `updatedAt` DATE NOT NULL;