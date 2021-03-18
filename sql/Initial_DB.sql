CREATE TABLE `user_mas` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `phone` VARCHAR(255) NOT NULL , `dob` DATE NOT NULL , `password` VARCHAR(255) NOT NULL , `address1` VARCHAR(255) NOT NULL , `address2` VARCHAR(255) NOT NULL , `city` VARCHAR(255) NOT NULL , `state` VARCHAR(255) NOT NULL , `country` VARCHAR(255) NOT NULL , `pincode` VARCHAR(255) NOT NULL , `tenant` INT(255) NOT NULL , `status` VARCHAR(255) NOT NULL , `confirmed` BOOLEAN NOT NULL , `menu_package` INT(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


CREATE TABLE `tenant_mas` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `shortname` VARCHAR(255) NOT NULL , `phone` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `address1` VARCHAR(255) NOT NULL , `address2` VARCHAR(255) NOT NULL , `city` VARCHAR(255) NOT NULL , `state` VARCHAR(255) NOT NULL , `country` VARCHAR(255) NOT NULL , `pincode` VARCHAR(255) NOT NULL , `status` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


CREATE TABLE `db_config` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `tenant_id` INT(255) NOT NULL , `dbname` VARCHAR(255) NOT NULL , `dbpassword` VARCHAR(255) NOT NULL , `dbuser` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


CREATE TABLE `subscription` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `description` VARCHAR(255) NOT NULL , `period_in_months` VARCHAR(255) NOT NULL , `sms` BOOLEAN NOT NULL , `whatsapp` BOOLEAN NOT NULL , `mail` BOOLEAN NOT NULL , `no_of_users` VARCHAR(255) NOT NULL , `no_of_students` VARCHAR(255) NOT NULL , `fees_for_month` VARCHAR(255) NOT NULL , `fees_for_annual` VARCHAR(255) NOT NULL , `status` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `tenant_subscription_details` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `tenant_id` INT(255) NOT NULL , `subscription_id` INT(255) NOT NULL , `validity_start` DATE NOT NULL , `validity_end` DATE NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `reports_mas` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `size` VARCHAR(255) NOT NULL , `file_name` VARCHAR(255) NOT NULL , `tenant_id` INT(255) NOT NULL , `json` LONGBLOB NOT NULL , `status` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


CREATE TABLE `module_mas` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `description` VARCHAR(255) NOT NULL , `homepage` VARCHAR(255) NOT NULL , `status` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `menu_group_mas` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `icon` VARCHAR(255) NOT NULL , `module_id` INT(255) NOT NULL , `order` VARCHAR(255) NOT NULL , `status` VARCHAR(255) NOT NULL , `createdd_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `menu_mas` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `icon` VARCHAR(255) NOT NULL , `url` VARCHAR(255) NOT NULL , `menu_group_id` INT(255) NOT NULL , `component_name` VARCHAR(255) NOT NULL , `order` VARCHAR(255) NOT NULL , `status` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


CREATE TABLE `package_mas` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `description` VARCHAR(255) NOT NULL , `all` BOOLEAN NOT NULL , `menulist` JSON NOT NULL , `status` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

ALTER TABLE `user_mas` ADD `country` VARCHAR(255) NOT NULL AFTER `state`;

ALTER TABLE `reports_mas` CHANGE `json` `json` LONGTEXT NOT NULL;
