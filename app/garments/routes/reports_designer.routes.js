const express = require("express");
const router = express.Router();

const Controller = require('../controllers/reports_designer.controller');


// router.get('/getAllStaffs', Controller.getAllStaffs);
router.get('/getReportString', Controller.getReportString);
module.exports = router;
