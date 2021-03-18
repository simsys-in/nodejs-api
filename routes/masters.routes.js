const express = require("express");
const router = express.Router();

const Controller = require('../controllers/masters.controller');


// router.get('/getAllLedgerSB', Controller.getAllLedgerSB);
router.put('/ledger', Controller.saveLedger);
router.get('/ledger', Controller.getLedger);
router.delete('/ledger', Controller.deleteLedger);














router.put('/product_category', Controller.saveProduct_Category);
router.get('/product_category', Controller.getProduct_Category);
router.delete('/product_category', Controller.deleteProduct_Category);

router.put('/ledger_group', Controller.saveLedger_Group);
router.get('/ledger_group', Controller.getLedger_Group);
router.delete('/ledger_group', Controller.deleteLedger_Group);



router.put('/ledger_category', Controller.saveLedger_Category);
router.get('/ledger_category', Controller.getLedger_Category);
router.delete('/ledger_category', Controller.deleteLedger_Category);
// router.get('/ledger', Controller.deleteLedger);



module.exports = router;
