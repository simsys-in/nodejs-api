const express = require("express");
const router = express.Router();

const Controller = require('../controllers/masters.controller');


// router.get('/getAllLedgerSB', Controller.getAllLedgerSB);
router.put('/ledger', Controller.saveLedger);
router.get('/ledger', Controller.getLedger);
router.get('/getAllLedgerSB', Controller.getAllLedgerSB);
router.delete('/ledger', Controller.deleteLedger);












//product_category

router.put('/product_category', Controller.saveProduct_Category);
router.get('/product_category', Controller.getProduct_Category);
router.delete('/product_category', Controller.deleteProduct_Category);

//ledger_group
router.put('/ledger_group', Controller.saveLedger_Group);
router.get('/ledger_group', Controller.getLedger_Group);
router.delete('/ledger_group', Controller.deleteLedger_Group);



//ledger_category
router.put('/ledger_category', Controller.saveLedger_Category);
router.get('/ledger_category', Controller.getLedger_Category);
router.delete('/ledger_category', Controller.deleteLedger_Category);
// router.get('/ledger', Controller.deleteLedger);
router.get('/getProductCategorySB', Controller.getAllProduct_CategorySB);


//product_group

router.put('/product_group', Controller.saveProductGroup);
router.get('/product_group', Controller.getProductGroup);
router.delete('/product_group', Controller.deleteProductGroup);




//unit

router.put('/unit', Controller.saveUnit);
router.get('/unit', Controller.getUnit);
router.delete('/unit', Controller.deleteUnit);
router.get('/getUnitSB', Controller.getAllUnitSB);

//product

router.put('/product', Controller.saveProduct);
router.get('/product', Controller.getProduct);
router.delete('/product', Controller.deleteProduct);
router.get('/getProductGroupSB', Controller.getAllProductGroupSB);


//process
router.put('/process', Controller.saveProcess);
router.get('/process', Controller.getProcess);
router.delete('/process', Controller.deleteProcess);


//size
router.put('/size', Controller.saveSize);
router.get('/size', Controller.getSize);
router.delete('/size', Controller.deleteSize);

//master
router.put('/master', Controller.saveMaster);
router.get('/master', Controller.getMaster);
router.delete('/master', Controller.deleteMaster);
router.get('/getMasterGroupSB', Controller.getAllMasterGroupSB);



router.get('/getProcessSBForOrderID', Controller.getProcessSBForOrderID);

router.get('/getLedgerCategorySB', Controller.getAllLedgerCategorySB);
router.get('/getLedgerGroupSB', Controller.getAllLedgerGroupSB);













//color

router.put('/color', Controller.saveColor);
router.get('/color', Controller.getColor);
router.delete('/color', Controller.deleteColor);
router.get('/getAllColorSB', Controller.getAllColorSB);

//color

router.put('/masterGroup', Controller.saveMasterGroup);
router.get('/masterGroup', Controller.getMasterGroup);
router.delete('/masterGroup', Controller.deleteMasterGroup);


router.get('/getAllCuttingMasterSB', Controller.getAllCuttingMasterSB);




module.exports = router;
