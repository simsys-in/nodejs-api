ALTER TABLE `garments_receipt_note` ADD `vouno` VARCHAR(255) NOT NULL AFTER `inventory_qty_total`;
ALTER TABLE `garments_receipt_note` ADD `marketing_user_id` VARCHAR(255) NOT NULL AFTER `vouno`;
ALTER TABLE `garments_receipt_note_inventory` ADD `description` VARCHAR(255) NOT NULL AFTER `product_id`;

