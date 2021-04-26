ALTER TABLE `ledger` ADD `value` VARCHAR(255) NOT NULL AFTER `route_id`;

ALTER TABLE `ledger` ADD `rule` VARCHAR(255) NOT NULL AFTER `value`;
