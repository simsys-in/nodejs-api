const express = require("express");
const router = express.Router();

const Controller = require('../controllers/masters.controller');


// router.get('/getAllLedgerSB', Controller.getAllLedgerSB);
router.put('/ledger', Controller.saveLedger);
router.get('/ledger', Controller.getLedger);
router.delete('/ledger', Controller.deleteLedger);
// router.get('/ledger', Controller.deleteLedger);



module.exports = router;
