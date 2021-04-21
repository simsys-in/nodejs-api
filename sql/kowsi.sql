ALTER TABLE `product_details` ADD `size1_rate` FLOAT(10,3) NOT NULL AFTER `size9_total`, ADD `size2_rate` FLOAT(10,3) NOT NULL AFTER `size1_rate`, ADD `size3_rate` FLOAT(10,3) NOT NULL AFTER `size2_rate`, ADD `size4_rate` FLOAT(10,3) NOT NULL AFTER `size3_rate`, ADD `size5_rate` FLOAT(10,3) NOT NULL AFTER `size4_rate`, ADD `size6_rate` FLOAT(10,3) NOT NULL AFTER `size5_rate`, ADD `size7_rate` FLOAT(10,3) NOT NULL AFTER `size6_rate`, ADD `size8_rate` FLOAT(10,3) NOT NULL AFTER `size7_rate`, ADD `size9_rate` FLOAT(10,3) NOT NULL AFTER `size8_rate`


ALTER TABLE `product_details` ADD `id` INT(255) NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (`id`);

ALTER TABLE `knitting_program` ADD `vouno` VARCHAR(255) NOT NULL AFTER `order_id`;

ALTER TABLE `route_accounts` ADD `description` VARCHAR(255) NOT NULL AFTER `vou_id`;

ALTER TABLE `jobwork_inward` ADD `vehicle_no` VARCHAR(255) NOT NULL AFTER `size9_total`;

ALTER TABLE `garments_receipt_note` ADD `vehicle_no` VARCHAR(255) NOT NULL AFTER `size9_total`;


CREATE TABLE `purchase_order` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `ledger_id` INT(255) NOT NULL , `delivery_address` VARCHAR(255) NOT NULL , `vou_date` DATE NOT NULL , `vouno` VARCHAR(255) NOT NULL , `narration` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

ALTER TABLE `purchase_order` ADD `inventory_qty_total` INT(255) NOT NULL AFTER `vouno`, ADD `inventory_amount_total` INT(255) NOT NULL AFTER `inventory_qty_total`;
ALTER TABLE `purchase_order_inventory` ADD `unit_id` INT(255) NOT NULL AFTER `amount`;
ALTER TABLE `purchase_order_inventory` ADD `qty` INT(255) NOT NULL AFTER `unit_id`;



CREATE TABLE `purchase_order_inventory` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `vou_id` INT(255) NOT NULL , `yarn_id` INT(255) NOT NULL , `hsnsac` VARCHAR(255) NOT NULL , `rate` VARCHAR(255) NOT NULL , `amount` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


ALTER TABLE `purchase_order` CHANGE `delivery_address` `delivery_address` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL, CHANGE `narration` `narration` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL;
