CREATE TABLE `unit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unit` varchar(12) NOT NULL,
  `decimal_digit` tinyint(1) NOT NULL DEFAULT 0,
  `narration` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM