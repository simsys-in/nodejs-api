ALTER TABLE `product_details` ADD `size1_rate` FLOAT(10,3) NOT NULL AFTER `size9_total`, ADD `size2_rate` FLOAT(10,3) NOT NULL AFTER `size1_rate`, ADD `size3_rate` FLOAT(10,3) NOT NULL AFTER `size2_rate`, ADD `size4_rate` FLOAT(10,3) NOT NULL AFTER `size3_rate`, ADD `size5_rate` FLOAT(10,3) NOT NULL AFTER `size4_rate`, ADD `size6_rate` FLOAT(10,3) NOT NULL AFTER `size5_rate`, ADD `size7_rate` FLOAT(10,3) NOT NULL AFTER `size6_rate`, ADD `size8_rate` FLOAT(10,3) NOT NULL AFTER `size7_rate`, ADD `size9_rate` FLOAT(10,3) NOT NULL AFTER `size8_rate`


ALTER TABLE `product_details` ADD `id` INT(255) NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (`id`);
