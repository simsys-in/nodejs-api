ALTER TABLE `fabric_outward` ADD `vehicle_no` VARCHAR(255) NOT NULL AFTER `menu_id`;
ALTER TABLE `jobwork_outward` ADD `vehicle_no` VARCHAR(255) NOT NULL AFTER `size9_total`;
ALTER TABLE `yarn_outward` ADD `vehicle_no` VARCHAR(255) NOT NULL AFTER `menu_id`;
ALTER TABLE `garments_delivery_note` ADD `vehicle_no` VARCHAR(255) NOT NULL AFTER `order_no`;
ALTER TABLE `yarn_invoice` ADD `vouno` VARCHAR(255) NOT NULL AFTER `order_id`;
ALTER TABLE `yarn_return` ADD `vouno` VARCHAR(255) NOT NULL AFTER `created_at`;
