const express = require("express");
const router = express.Router();

const Controller = require('../controllers/transactions.controller');



//order process

router.put('/orderProgram', Controller.saveOrderProgram);
router.get('/orderProgram', Controller.getOrderProgram);
router.delete('/orderProgram', Controller.deleteOrderProgram);


router.get('/getStyleForOrderId', Controller.getStyleForOrderId);
router.get('/getSizeSB', Controller.getSizeSB);
router.get('/getStyleSB', Controller.getStyleSB);
router.get('/getFabricSB', Controller.getFabricSB);
router.get('/getNextOrderNo', Controller.getNextOrderNo);

//fabric Inward
router.put('/fabricInward', Controller.saveFabricInward);
router.get('/fabricInward', Controller.getFabricInward);
router.delete('/fabricInward', Controller.deleteFabricInward);
router.get('/getOrderSB', Controller.getOrderSB);
router.get('/getNextFabricInwardVouNo', Controller.getNextFabricInwardVouNo);
router.get('/getNextYarnInwardVouNo', Controller.getNextYarnInwardVouNo);
router.get('/getNextYarnOutwardVouNo', Controller.getNextYarnOutwardVouNo);
router.get('/getNextYarnReturnVouNo', Controller.getNextYarnReturnVouNo);
router.get('/getColorSB', Controller.getColorSB);
router.get('/getLedgerNameSB', Controller.getLedgerNameSB);
router.get('/getProcessSB', Controller.getProcessSB);

//fabric outward
router.put('/fabricOutward', Controller.saveFabricOutward);
router.get('/fabricOutward', Controller.getFabricOutward);
router.delete('/fabricOutward', Controller.deleteFabricOutward);

//fabric invoice
router.put('/fabricInvoice', Controller.saveFabricInvoice);
router.get('/fabricInvoice', Controller.getFabricInvoice);
router.delete('/fabricInvoice', Controller.deleteFabricInvoice);


//fabric return
router.put('/fabricReturn', Controller.saveFabricReturn);

router.get('/fabricReturn', Controller.getFabricReturn);
router.delete('/fabricReturn', Controller.deleteFabricReturn);

//yarninward
router.put('/yarn_inward', Controller.saveYarn_Inward);
router.get('/yarn_inward', Controller.getYarn_Inward);
router.delete('/yarn_inward', Controller.deleteYarn_Inward);
//yarn invoice

router.put('/yarn_invoice', Controller.saveYarn_Invoice);
router.get('/yarn_invoice', Controller.getYarn_Invoice);
router.delete('/yarn_invoice', Controller.deleteYarn_Invoice);

// yarn outward
router.put('/yarn_outward', Controller.saveYarn_Outward);
router.get('/yarn_outward', Controller.getYarn_Outward);
router.delete('/yarn_outward', Controller.deleteYarn_Outward);

//yarn return
router.put('/yarn_return', Controller.saveYarn_Return);
router.get('/yarn_return', Controller.getYarn_Return);
router.delete('/yarn_return', Controller.deleteYarn_Return);

router.get('/getColorSB', Controller.getAllColorSB);
router.get('/getLedgerNameSB', Controller.getAllLedgerNameSB);
router.get('/getProcessSB', Controller.getAllProcessSB);
router.get('/getFabricsSB', Controller.getAllFabricsSB);
router.get('/getOrderSB', Controller.getAllOrderSB);

///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////


//Cutting Program
router.put('/cutting_program', Controller.saveCuttingProgram);
router.get('/cutting_program', Controller.getCuttingProgram);
router.delete('/cutting_program', Controller.deleteCuttingProgram);
router.get('/getSizesForOrderID', Controller.getSizesForOrderID);
router.get('/getNextCuttingProgLotNo', Controller.getNextCuttingProgLotNo);
router.get('/getFabricsForOrderID', Controller.getFabricsForOrderID);
router.get('/getFabricDetailForOrder', Controller.getFabricDetailForOrder);


///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////

module.exports = router;