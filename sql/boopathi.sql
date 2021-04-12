ALTER TABLE `fabric_outward` ADD `vehicle_no` VARCHAR(255) NOT NULL AFTER `menu_id`;
ALTER TABLE `jobwork_outward` ADD `vehicle_no` VARCHAR(255) NOT NULL AFTER `size9_total`;
ALTER TABLE `yarn_outward` ADD `vehicle_no` VARCHAR(255) NOT NULL AFTER `menu_id`;
ALTER TABLE `garments_delivery_note` ADD `vehicle_no` VARCHAR(255) NOT NULL AFTER `order_no`;