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

module.exports = router;