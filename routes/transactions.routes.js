const express = require("express");
const router = express.Router();

const Controller = require('../controllers/transactions.controller');



//order process

router.put('/orderProgram', Controller.saveOrderProgram);
router.get('/orderProgram', Controller.getOrderProgram);
router.delete('/orderProgram', Controller.deleteOrderProgram);
router.get('/getSizeSB', Controller.getSizeSB);
router.get('/getStyleSB', Controller.getStyleSB);
router.get('/getFabricSB', Controller.getFabricSB);


//fabric Inward
router.put('/fabricInward', Controller.saveFabricInward);
router.get('/fabricInward', Controller.getFabricInward);
router.delete('/fabricInward', Controller.deleteFabricInward);
router.get('/getOrderSB', Controller.getOrderSB);
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





module.exports = router;