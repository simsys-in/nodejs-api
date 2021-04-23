CREATE TABLE `general_purchase_order` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `ledger_id` INT(255) NOT NULL , `delivery_address` VARCHAR(255) NOT NULL , `vou_date` DATE NOT NULL , `vouno` VARCHAR(255) NOT NULL , `narration` VARCHAR(255) NOT NULL , `inventory_qty_total` INT(255) NOT NULL , `inventory_amount_total` INT(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;




CREATE TABLE `general_purchase_order_inventory` ( `id` INT(255) NOT NULL AUTO_INCREMENT , `vou_id` INT(255) NOT NULL , `product_id` INT(255) NOT NULL ,`unit_id` INT(255) NOT NULL ,`qty` INT(255) NOT NULL , `hsnsac` VARCHAR(255) NOT NULL , `rate` INT(255) NOT NULL , `amount` INT(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


ALTER TABLE `purchase_order` ADD `payment_mode` VARCHAR(255) NOT NULL AFTER `narration`, ADD `payment_terms_conditions` VARCHAR(255) NOT NULL AFTER `payment_mode`;

ALTER TABLE `purchase_order_inventory` ADD `gsm` INT(255) NOT NULL AFTER `qty`, ADD `count` INT(255) NOT NULL AFTER `gsm`;


ALTER TABLE `general_purchase_order` ADD `payment_mode` VARCHAR(255) NOT NULL AFTER `narration`, ADD `payment_terms_conditions` VARCHAR(255) NOT NULL AFTER `payment_mode`;


RENAME TABLE `purchase_order` TO `yarn_purchase_order`;

RENAME TABLE `purchase_order_inventory` TO `yarn_purchase_order_inventory`;

