ALTER TABLE `order_program` ADD `style_id` VARCHAR(255) NOT NULL AFTER `size_id`;
ALTER TABLE `order_program` ADD `ledger_id` VARCHAR(255) NOT NULL AFTER `order_no`;
ALTER TABLE `order_fabric` CHANGE `fabric_id` `fabric_id` INT(255) NOT NULL;
ALTER TABLE `order_program` CHANGE `ledger_id` `ledger_id` INT(255) NOT NULL, CHANGE `style_id` `style_id` INT(255) NOT NULL;
