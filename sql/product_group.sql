CREATE TABLE `product_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_group` varchar(16) NOT NULL,
  `narration` varchar(16) NOT NULL,
  `product_parent_id` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM