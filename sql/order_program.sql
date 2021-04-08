ALTER TABLE `order_program` ADD `style_id` INT(255) NOT NULL AFTER `size_id`;
ALTER TABLE `order_program` ADD `ledger_id` INT(255) NOT NULL AFTER `order_no`;
