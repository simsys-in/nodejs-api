const express = require("express");
const router = express.Router();

const Controller = require('../controllers/masters.controller');


// router.get('/getAllLedgerSB', Controller.getAllLedgerSB);
router.put('/ledger', Controller.saveLedger);
router.get('/ledger', Controller.getLedger);
router.delete('/ledger', Controller.deleteLedger);
// router.get('/ledger', Controller.deleteLedger);


//product_group

router.put('/product_group', Controller.saveProductGroup);
router.get('/product_group', Controller.getProductGroup);
router.delete('/product_group', Controller.deleteProductGroup);


//unit

router.put('/unit', Controller.saveUnit);
router.get('/unit', Controller.getUnit);
router.delete('/unit', Controller.deleteUnit);




module.exports = router;
