ALTER TABLE `receipt` CHANGE `inventory_amount_total` `inventory_amount_total` DECIMAL(15,2) NOT NULL;
ALTER TABLE `jobwork_outward_product` ADD `weight` INT(255) NOT NULL AFTER `vou_id`;