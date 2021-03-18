CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_group_id` int(11) NOT NULL,
  `product_category_id` int(11) NOT NULL,
  `product` varchar(32) NOT NULL,
  `unit_id` int(11) NOT NULL,
  `qrcode` varchar(16) NOT NULL,
  `narration` varchar(24) NOT NULL,
  `purchase_rate` varchar(12) NOT NULL DEFAULT '',
  `sales_rate` varchar(12) NOT NULL DEFAULT '',
  `qty` varchar(9) NOT NULL,
  `purchase_rate_last` float(8,2) NOT NULL,
  `min_stock_qty` float(8,3) NOT NULL,
  `hsnsac` varchar(8) NOT NULL DEFAULT '',
  `gst` varchar(6) NOT NULL,
  `sgst` varchar(6) NOT NULL,
  `cgst` varchar(6) NOT NULL,
  `sts` tinyint(1) NOT NULL DEFAULT 0,
  `unit2_id` int(11) NOT NULL DEFAULT 0,
  `unit2_convert` varchar(6) NOT NULL DEFAULT '',
  `clo_qty` varchar(3) NOT NULL,
  `status_id` int(11) NOT NULL,
  `purchase_rate_incltax` varchar(8) NOT NULL DEFAULT '',
  `sales_rate_incltax` varchar(8) NOT NULL DEFAULT '',
  `purchase_amount` int(11) NOT NULL,
  `sales_amount` int(11) NOT NULL,
  `alias` varchar(64) NOT NULL,
  `unit2` varchar(24) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM