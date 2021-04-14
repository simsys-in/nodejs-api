const express = require("express");
const router = express.Router();

const TransactionsController = require('../controllers/transactions.controller');



//order process

router.put('/order_program', TransactionsController.saveOrderProgram);
router.get('/order_program', TransactionsController.getOrderProgram);
router.delete('/order_program', TransactionsController.deleteOrderProgram);


router.get('/getStyleForOrderId', TransactionsController.getStyleForOrderId);
router.get('/getSizeSB', TransactionsController.getSizeSB);
router.get('/getStyleSB', TransactionsController.getStyleSB);
// router.get('/getFabricSB', TransactionsController.getFabricSB);
router.get('/getNextOrderNo', TransactionsController.getNextOrderNo);

//fabric Inward
router.put('/fabricInward', TransactionsController.saveFabricInward);
router.get('/fabricInward', TransactionsController.getFabricInward);
router.delete('/fabricInward', TransactionsController.deleteFabricInward);
router.get('/getOrderSB', TransactionsController.getOrderSB);
router.get('/getNextFabricInwardVouNo', TransactionsController.getNextFabricInwardVouNo);
router.get('/getNextFabricOutwardVouNo', TransactionsController.getNextFabricOutwardVouNo);
router.get('/getNextFabricReturnVouNo', TransactionsController.getNextFabricReturnVouNo);
router.get('/getNextFabricInvoiceVouNo', TransactionsController.getNextFabricInvoiceVouNo);
router.get('/getNextYarnInwardVouNo', TransactionsController.getNextYarnInwardVouNo);
router.get('/getNextYarnOutwardVouNo', TransactionsController.getNextYarnOutwardVouNo);
router.get('/getNextYarnReturnVouNo', TransactionsController.getNextYarnReturnVouNo);
// router.get('/getColorSB', TransactionsController.getColorSB);
// router.get('/getLedgerNameSB', TransactionsController.getLedgerNameSB);
// router.get('/getProcessSB', TransactionsController.getProcessSB);


//fabric outward
router.put('/fabricOutward', TransactionsController.saveFabricOutward);
router.get('/fabricOutward', TransactionsController.getFabricOutward);
router.delete('/fabricOutward', TransactionsController.deleteFabricOutward);

//fabric invoice
router.put('/fabricInvoice', TransactionsController.saveFabricInvoice);
router.get('/fabricInvoice', TransactionsController.getFabricInvoice);
router.delete('/fabricInvoice', TransactionsController.deleteFabricInvoice);


//fabric return
router.put('/fabricReturn', TransactionsController.saveFabricReturn);

router.get('/fabricReturn', TransactionsController.getFabricReturn);
router.delete('/fabricReturn', TransactionsController.deleteFabricReturn);

//jobwork outward
router.put('/jobworkOutward', TransactionsController.saveJobworkOutward);
router.get('/jobworkOutward', TransactionsController.getJobworkOutward);
router.delete('/jobworkOutward', TransactionsController.deleteJobworkOutward);
router.get('/getProductSB', TransactionsController.getProductSB);
router.get('/getNextJobworkOutwardVouNo', TransactionsController.getNextJobworkOutwardVouNo);


//yarninward
router.put('/yarn_inward', TransactionsController.saveYarn_Inward);
router.get('/yarn_inward', TransactionsController.getYarn_Inward);
router.delete('/yarn_inward', TransactionsController.deleteYarn_Inward);
//yarn invoice

router.put('/yarn_invoice', TransactionsController.saveYarn_Invoice);
router.get('/yarn_invoice', TransactionsController.getYarn_Invoice);
router.delete('/yarn_invoice', TransactionsController.deleteYarn_Invoice);

// yarn outward
router.put('/yarn_outward', TransactionsController.saveYarn_Outward);
router.get('/yarn_outward', TransactionsController.getYarn_Outward);
router.delete('/yarn_outward', TransactionsController.deleteYarn_Outward);

//yarn return
router.put('/yarn_return', TransactionsController.saveYarn_Return);
router.get('/yarn_return', TransactionsController.getYarn_Return);
router.delete('/yarn_return', TransactionsController.deleteYarn_Return);

router.put('/jobwork_inward', TransactionsController.saveJobwork_Inward);
router.get('/jobwork_inward', TransactionsController.getJobwork_Inward);
router.delete('/jobwork_inward', TransactionsController.deleteJobwork_Inward);
router.get('/getLedgerForOrderAndProcessID', TransactionsController.getLedgerForOrderAndProcessID);

//Cutting Program
router.put('/cuttingProgram', TransactionsController.saveCuttingProgram);
router.get('/cuttingProgram', TransactionsController.getCuttingProgram);
router.delete('/cuttingProgram', TransactionsController.deleteCuttingProgram);
router.get('/getSizesForOrderID', TransactionsController.getSizesForOrderID);
router.get('/getNextCuttingProgLotNo', TransactionsController.getNextCuttingProgLotNo);
router.get('/getCuttingProgramColorDetails', TransactionsController.getCuttingProgramColorDetails);

// router.get('/getColorSB', TransactionsController.getAllColorSB);
// router.get('/getLedgerNameSB', TransactionsController.getAllLedgerNameSB);
// router.get('/getProcessSB', TransactionsController.getAllProcessSB);
// router.get('/getFabricsSB', TransactionsController.getAllFabricsSB);
router.get('/getOrderSB', TransactionsController.getAllOrderSB);

///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////


//Cutting Program
router.put('/cutting_program', TransactionsController.saveCuttingProgram);
router.get('/cutting_program', TransactionsController.getCuttingProgram);
router.delete('/cutting_program', TransactionsController.deleteCuttingProgram);
router.get('/getSizesForOrderID', TransactionsController.getSizesForOrderID);
router.get('/getNextCuttingProgLotNo', TransactionsController.getNextCuttingProgLotNo);
router.get('/getFabricsForOrderID', TransactionsController.getFabricsForOrderID);
router.get('/getFabricDetailForOrder', TransactionsController.getFabricDetailForOrder);
router.get('/getJobworkOutwardReport', TransactionsController.getJobworkOutwardReport);
router.get('/getOrdersForLedgerAndProcess', TransactionsController.getOrdersForLedgerAndProcess);


///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////
///////////// Haripraks]ash Workspace /////////////////




////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
router.get('/getNextYarnInvoiceVouNo', TransactionsController.getNextYarnInvoiceVouNo);
router.get('/getNextJobworkInwardVouNo', TransactionsController.getNextJobworkInwardVouNo);
router.get('/getJobworkInvoiceReport', TransactionsController.getJobworkInvoiceReport);
router.get('/getYarnInvoiceReport', TransactionsController.getYarnInvoiceReport);
router.get('/getYarnOutwardReport', TransactionsController.getYarnOutwardReport);









////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////


////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////

//garments invoice
router.put('/garmentsInvoice', TransactionsController.saveGarmentsInvoice);
router.get('/garmentsInvoice', TransactionsController.getGarmentsInvoice);
router.delete('/garmentsInvoice', TransactionsController.deleteGarmentsInvoice);
router.get('/getNextGarmentsInvoiceVouNo', TransactionsController.getNextGarmentsInvoiceVouNo);
router.get('/getMarketingUserSB', TransactionsController.getMarketingUserSB);


//garments delivery note
router.put('/garmentsDeliveryNote', TransactionsController.saveGarmentsDeliveryNote);
router.get('/garmentsDeliveryNote', TransactionsController.getGarmentsDeliveryNote);
router.delete('/garmentsDeliveryNote', TransactionsController.deleteGarmentsDeliveryNote);
router.get('/getNextGarmentsDeliveryNoteVouNo', TransactionsController.getNextGarmentsDeliveryNoteVouNo);

//garments receipt note
router.put('/garmentsReceiptNote', TransactionsController.saveGarmentsReceiptNote);
router.get('/garmentsReceiptNote', TransactionsController.getGarmentsReceiptNote);
router.delete('/garmentsReceiptNote', TransactionsController.deleteGarmentsReceiptNote);
router.get('/getNextGarmentsReceiptNoteVouNo', TransactionsController.getNextGarmentsReceiptNoteVouNo);


//fabric outward report

router.get('/getFabricOutwardReport', TransactionsController.getFabricOutwardReport);

//fabric inward report

router.get('/getFabricInwardReport', TransactionsController.getFabricInwardReport);

//fabric invoice report
router.get('/getFabricInvoiceReport', TransactionsController.getFabricInvoiceReport);





////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////


////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////










////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////

router.get('/getJobworkOutwardColorDetails', TransactionsController.getJobworkOutwardColorDetails);

//jobwork invoice
router.put('/jobworkInvoice', TransactionsController.saveJobworkInvoice);
router.get('/jobworkInvoice', TransactionsController.getJobworkInvoice);
router.delete('/jobworkInvoice', TransactionsController.deleteJobworkInvoice);
router.get('/getNextJobworkInvoiceVouNo', TransactionsController.getNextJobworkInvoiceVouNo);
router.get('/getJobworkOutwardColorDetails', TransactionsController.getJobworkOutwardColorDetails);

router.get('/getProductAndSizeSBForOrderID', TransactionsController.getProductAndSizeSBForOrderID);


module.exports = router;