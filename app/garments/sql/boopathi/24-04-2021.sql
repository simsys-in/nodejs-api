ALTER TABLE `yarn_invoice` ADD `vehicle_no` VARCHAR(255) NOT NULL AFTER `vouno`;
ALTER TABLE `fabric_invoice` ADD `vehicle_no` VARCHAR(255) NOT NULL AFTER `amount`;
ALTER TABLE `jobwork_invoice` ADD `vehicle_no` VARCHAR(255) NOT NULL AFTER `menu_id`;
ALTER TABLE `garments_invoice` ADD `vehicle_no` VARCHAR(255) NOT NULL AFTER `vouno`;
