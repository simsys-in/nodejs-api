ALTER TABLE `garments_delivery_note_inventory` ADD `description` VARCHAR(255) NOT NULL AFTER `color`;
ALTER TABLE `garments_delivery_note` ADD `vouno` VARCHAR(255) NOT NULL AFTER `vou_date`;
