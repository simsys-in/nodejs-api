 CREATE TABLE `ledger_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ledger_group` varchar(32) CHARACTER SET latin1 NOT NULL,
  `drcr` varchar(2) NOT NULL,
  `default_id` int(11) NOT NULL,
  `parent_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM