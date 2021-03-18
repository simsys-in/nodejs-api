CREATE TABLE `add_less_mas` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `type` VARCHAR(255) NOT NULL , `value` VARCHAR(255) NOT NULL , `calculate_type` VARCHAR(255) NOT NULL , `status` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `batch_mas` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `start_time` TIME NOT NULL , `end_time` TIME NOT NULL , `status` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `branch_mas` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `tenant_id` INT(255) NOT NULL , `address1` VARCHAR(255) NOT NULL , `address2` VARCHAR(255) NOT NULL , `city` VARCHAR(255) NOT NULL , `state` VARCHAR(255) NOT NULL , `country` VARCHAR(255) NOT NULL , `pincode` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `phone` VARCHAR(255) NOT NULL , `status` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


CREATE TABLE `designation_mas` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `shortname` VARCHAR(255) NOT NULL , `code` VARCHAR(255) NOT NULL , `status` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


CREATE TABLE `exercise_mas` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `min_repetition` VARCHAR(255) NOT NULL , `max_repetition` VARCHAR(255) NOT NULL , `min_weight` DOUBLE(10,3) NOT NULL , `max_weight` DOUBLE(10,3) NOT NULL , `sets` VARCHAR(255) NOT NULL , `status` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `fees_receipt_mas` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `member` INT(255) NOT NULL , `date` DATE NOT NULL , `receipt_date` DATE NOT NULL , `receipt_no` VARCHAR(255) NOT NULL , `period_from` DATE NOT NULL , `period_to` DATE NOT NULL , `grand_total` DOUBLE(10,2) NOT NULL , `remarks` VARCHAR(255) NOT NULL , `payment_mode` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


CREATE TABLE `fees_receipt_details` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `fees_receipt_id` INT(255) NOT NULL , `membership_id` INT(255) NOT NULL , `fees` DOUBLE(10,2) NOT NULL , `discount` DOUBLE(10,2) NOT NULL , `total` DOUBLE(10,2) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


CREATE TABLE `fees_receipt_add_less_details` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `add_less_id` INT(255) NOT NULL , `amount` DOUBLE(10,3) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `member_mas` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `code` VARCHAR(255) NOT NULL , `dob` DATE NOT NULL , `age` INT(255) NOT NULL , `address1` VARCHAR(255) NOT NULL , `address2` VARCHAR(255) NOT NULL , `city` VARCHAR(255) NOT NULL , `state` VARCHAR(255) NOT NULL , `country` VARCHAR(255) NOT NULL , `pincode` VARCHAR(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `phone` VARCHAR(255) NOT NULL , `image` BLOB NOT NULL , `status` VARCHAR(255) NOT NULL , `gender` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `member_physic_details` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `member_id` INT(255) NOT NULL , `height` DECIMAL(6,3) NOT NULL , `weight` DECIMAL(6,3) NOT NULL , `bicep` DECIMAL(6,3) NOT NULL , `chest` DECIMAL(6,3) NOT NULL , `hips` DECIMAL(6,3) NOT NULL , `neck` DECIMAL(6,3) NOT NULL , `shoulders` DECIMAL(6,3) NOT NULL , `thigh` DECIMAL(6,3) NOT NULL , `waist` DECIMAL(6,3) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `member_membership_details` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `member_id` INT(255) NOT NULL , `membership_id` INT(255) NOT NULL , `branch_id` INT(255) NOT NULL , `batch_id` INT(255) NOT NULL , `trainer_id` INT(255) NOT NULL , `registration_date` DATE NOT NULL , `period_in_months` VARCHAR(255) NOT NULL , `payment_date` VARCHAR(255) NOT NULL , `fees` FLOAT(10,3) NOT NULL , `discount` FLOAT(10,3) NOT NULL , `total` FLOAT(10,3) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


CREATE TABLE `membership_mas` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `period_in_month` VARCHAR(255) NOT NULL , `monthly_fees` FLOAT(10,3) NOT NULL , `annual_fees` FLOAT(10,3) NOT NULL , `status` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


CREATE TABLE `nutrients_mas` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `status` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `nutrient_items` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `nutrient_id` INT(255) NOT NULL , `name` VARCHAR(255) NOT NULL , `quantity` VARCHAR(255) NOT NULL , `uom` VARCHAR(255) NOT NULL , `dosage` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


CREATE TABLE `diet_plan` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `member_id` INT(255) NOT NULL , `nutrient_id` INT(255) NOT NULL , `date` DATE NOT NULL , `from_date` DATE NOT NULL , `to_date` DATE NOT NULL , `next_assessment` DATE NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


CREATE TABLE `staff_mas` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `batch_id` INT(255) NOT NULL , `branch_id` INT(255) NOT NULL , `email` VARCHAR(255) NOT NULL , `phone` VARCHAR(255) NOT NULL , `address1` VARCHAR(255) NOT NULL , `address2` VARCHAR(255) NOT NULL , `city` VARCHAR(255) NOT NULL , `state` VARCHAR(255) NOT NULL , `country` VARCHAR(255) NOT NULL , `pincode` VARCHAR(255) NOT NULL , `designation_id` INT(255) NOT NULL , `employee_code` VARCHAR(255) NOT NULL , `joining_date` DATE NOT NULL , `salary` FLOAT(10,3) NOT NULL , `salary_type` VARCHAR(255) NOT NULL , `image` BLOB NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


CREATE TABLE `workout_mas` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , `status` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

ALTER TABLE `workout_mas` ADD `exercises` VARCHAR(255) NOT NULL AFTER `name`;

CREATE TABLE `workout_assign` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `member_id` INT(255) NOT NULL , `date` DATE NOT NULL , `from_date` DATE NOT NULL , `to_date` DATE NOT NULL , `next_assessment` DATE NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `workout_assign_details` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `workout_assign_id` INT(255) NOT NULL , `day` VARCHAR(255) NOT NULL , `workout_id` INT(255) NOT NULL , `remarks` VARCHAR(255) NOT NULL , `created_at` DATETIME NOT NULL , `updated_at` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


alter table membership_mas drop annual_fees;

ALTER TABLE `membership_mas` CHANGE `monthly_fees` `fees` FLOAT(10,3) NOT NULL;

alter table nutrient_items CHANGE name item VARCHAR(255);


alter table staff_mas add column status varchar(255) after image;

ALTER TABLE `staff_mas` CHANGE `image` `image` LONGTEXT NOT NULL;

alter table member_mas CHANGE code member_code VARCHAR(255);


alter table member_mas change image image LONGTEXT;