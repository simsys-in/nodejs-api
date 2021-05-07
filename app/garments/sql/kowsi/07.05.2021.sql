ALTER TABLE `payment` CHANGE `inventory_amount_total` `inventory_amount_total` DECIMAL(15,2) NULL DEFAULT NULL;

ALTER TABLE `process` ADD `type` VARCHAR(255) NOT NULL AFTER `process`;

ALTER TABLE `jobwork_invoice` ADD `order_id` INT(255) NOT NULL AFTER `process_id`;


ALTER TABLE `jobwork_invoice` ADD `product_id` INT(255) NOT NULL AFTER `order_id`, ADD `size_id` INT(255) NOT NULL AFTER `product_id`;
