ALTER TABLE `ledger` CHANGE `state_id` `state_id` VARCHAR(255) NOT NULL;
ALTER TABLE `ledger` ADD `credit_limit` INT(255) NOT NULL AFTER `status_id`;
