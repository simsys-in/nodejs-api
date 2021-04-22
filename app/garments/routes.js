const { Router } = require("express");
const express = require("express");
const router = express.Router();

const MasterController = require('./controllers/masters.controller');
const TransactionsController = require('./controllers/transactions.controller');
const UserController = require('./controllers/user.controller');

router.post('/login', UserController.login);


// router.get('/logout', UserController.logout);
// router.post('/register', UserController.register);
// router.get('/getAllUsers', UserController.getAllUsers);
// router.get('/deleteUser', UserController.deleteUser);
// router.get('/getUser', UserController.getUser);
// router.get('/saveUserToMysql', UserController.saveUserToMysql);

router.put('/menu_master', UserController.saveMenu_Master);
router.get('/menu_master', UserController.getMenu_Master);
router.delete('/menu_master', UserController.deleteMenu_Master);

router.put('/user_group', UserController.saveUser_Group);
router.get('/user_group', UserController.getUser_Group);
router.delete('/user_group', UserController.deleteUser_Group);
router.get('/getAllMenusForUserPermission', UserController.getAllMenusForUserPermission);

router.put('/user', UserController.saveUser);
router.get('/user', UserController.getUser);
router.delete('/user', UserController.deleteUser);

router.get('/getUserGroupSB', UserController.getAllUserGroupSB);
router.post('/verifyLogin', UserController.verifyLogin);

// router.get('/getAllLedgerSB', MasterController.getAllLedgerSB);
router.put('/ledger', MasterController.saveLedger);
router.get('/ledger', MasterController.getLedger);
router.get('/getAllLedgerSB', MasterController.getAllLedgerSB);
router.delete('/ledger', MasterController.deleteLedger);
router.get('/getMobileForLedgerID', MasterController.getMobileForLedgerID)
//product_category
router.put('/product_category', MasterController.saveProduct_Category);
router.get('/product_category', MasterController.getProduct_Category);
router.delete('/product_category', MasterController.deleteProduct_Category);
//ledger_group
router.put('/ledger_group', MasterController.saveLedger_Group);
router.get('/ledger_group', MasterController.getLedger_Group);
router.delete('/ledger_group', MasterController.deleteLedger_Group);
//ledger_category
router.put('/ledger_category', MasterController.saveLedger_Category);
router.get('/ledger_category', MasterController.getLedger_Category);
router.delete('/ledger_category', MasterController.deleteLedger_Category);

router.put('/employee_category', MasterController.saveEmployee_Category);
router.get('/employee_category', MasterController.getEmployee_Category);
router.delete('/employee_category', MasterController.deleteEmployee_Category);

router.put('/employee', MasterController.saveEmployee);
router.get('/employee', MasterController.getEmployee);
router.delete('/employee', MasterController.deleteEmployee);
// router.get('/ledger', MasterController.deleteLedger);
router.get('/getProductCategorySB', MasterController.getAllProduct_CategorySB);
//product_group
router.put('/product_group', MasterController.saveProductGroup);
router.get('/product_group', MasterController.getProductGroup);
router.delete('/product_group', MasterController.deleteProductGroup);
//unit

router.put('/unit', MasterController.saveUnit);
router.get('/unit', MasterController.getUnit);
router.delete('/unit', MasterController.deleteUnit);
router.get('/getUnitSB', MasterController.getAllUnitSB);

//product

router.put('/product', MasterController.saveProduct);
router.get('/product', MasterController.getProduct);
router.delete('/product', MasterController.deleteProduct);
router.get('/getProductGroupSB', MasterController.getAllProductGroupSB);
router.get('/getAllProductAccessoriesSB', MasterController.getAllProductAccessoriesSB);

router.get('/getUnitForProductID', MasterController.getUnitForProductID)
//process
router.put('/process', MasterController.saveProcess);
router.get('/process', MasterController.getProcess);
router.delete('/process', MasterController.deleteProcess);
router.get('/getAllProcessSB', MasterController.getAllProcessSB);
//size
router.put('/size', MasterController.saveSize);
router.get('/size', MasterController.getSize);
router.delete('/size', MasterController.deleteSize);
//master
router.put('/master', MasterController.saveMaster);
router.get('/master', MasterController.getMaster);
router.delete('/master', MasterController.deleteMaster);
router.get('/getMasterGroupSB', MasterController.getAllMasterGroupSB);
router.get('/getProcessSBForOrderID', MasterController.getProcessSBForOrderID);
router.get('/getMobileForLedgerID', MasterController.getMobileForLedgerID);
router.get('/getLedgerCategorySB', MasterController.getAllLedgerCategorySB);
router.get('/getLedgerGroupSB', MasterController.getAllLedgerGroupSB);
router.get('/getEmployeeCategorySB', MasterController.getAllEmployeeCategorySB);
router.get('/getShiftSB', MasterController.getAllShiftSB);
router.get('/getDesignationSB', MasterController.getAllDesignationSB);
router.get('/getDepartmentSB', MasterController.getAllDepartmentSB);
router.get('/getBranchSB', MasterController.getAllBranchSB);
router.get('/getBankSB', MasterController.getAllBankSB);
//color
router.put('/color', MasterController.saveColor);
router.get('/color', MasterController.getColor);
router.delete('/color', MasterController.deleteColor);
router.get('/getAllColorSB', MasterController.getAllColorSB);
router.put('/master_group', MasterController.saveMasterGroup);
router.get('/master_group', MasterController.getMasterGroup);
router.delete('/master_group', MasterController.deleteMasterGroup);
router.get('/getAllCuttingMasterSB', MasterController.getAllCuttingMasterSB);
router.put('/branch', MasterController.saveBranch);
router.get('/branch', MasterController.getBranch);
router.delete('/branch', MasterController.deleteBranch);

router.put('/department', MasterController.saveDepartment);
router.get('/department', MasterController.getDepartment);
router.delete('/department', MasterController.deleteDepartment);
router.put('/bank', MasterController.saveBank);
router.get('/bank', MasterController.getBank);
router.delete('/bank', MasterController.deleteBank);
//desigantion
router.put('/designation', MasterController.saveDesignation);
router.get('/designation', MasterController.getDesignation);
router.delete('/designation', MasterController.deleteDesignation);
router.get('/getFabricsSB', MasterController.getAllFabricsSB);
router.get('/getLedgerForOrderID', MasterController.getLedgerForOrderID)
router.get('/getAccountsLedger', MasterController.getAccountsLedger);
router.get('/getAllSizeSB', MasterController.getAllSizeSB);
router.get('/getAllProductSB', MasterController.getAllProductSB);



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
router.get('/getFabricOutwardInventoryDetails', TransactionsController.getFabricOutwardInventoryDetails);
router.get('/getOrderSB', TransactionsController.getOrderSB);
router.get('/getNextFabricInwardVouNo', TransactionsController.getNextFabricInwardVouNo);
router.get('/getNextFabricOutwardVouNo', TransactionsController.getNextFabricOutwardVouNo);
router.get('/getNextFabricReturnVouNo', TransactionsController.getNextFabricReturnVouNo);
router.get('/getNextFabricInvoiceVouNo', TransactionsController.getNextFabricInvoiceVouNo);
router.get('/getNextYarnInwardVouNo', TransactionsController.getNextYarnInwardVouNo);
router.get('/getNextYarnOutwardVouNo', TransactionsController.getNextYarnOutwardVouNo);
router.get('/getNextYarnReturnVouNo', TransactionsController.getNextYarnReturnVouNo);


//fabric outward
router.put('/fabricOutward', TransactionsController.saveFabricOutward);
router.get('/fabricOutward', TransactionsController.getFabricOutward);
router.delete('/fabricOutward', TransactionsController.deleteFabricOutward);


//fabric invoice
router.put('/fabricInvoice', TransactionsController.saveFabricInvoice);
router.get('/fabricInvoice', TransactionsController.getFabricInvoice);
router.delete('/fabricInvoice', TransactionsController.deleteFabricInvoice);
router.get('/getFabricInwardInventoryDetails', TransactionsController.getFabricInwardInventoryDetails);


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
router.get('/getYarnOutwardInventoryDetails', TransactionsController.getYarnOutwardInventoryDetails);

//yarn invoice

router.put('/yarn_invoice', TransactionsController.saveYarn_Invoice);
router.get('/yarn_invoice', TransactionsController.getYarn_Invoice);
router.delete('/yarn_invoice', TransactionsController.deleteYarn_Invoice);
router.get('/getYarnInwardInventoryDetails', TransactionsController.getYarnInwardInventoryDetails);


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

router.get('/getOrderSB', TransactionsController.getAllOrderSB);


//Cutting Program
router.put('/cutting_program', TransactionsController.saveCuttingProgram);
router.get('/cutting_program', TransactionsController.getCuttingProgram);
router.delete('/cutting_program', TransactionsController.deleteCuttingProgram);
router.get('/getSizesForOrderID', TransactionsController.getSizesForOrderID);
router.get('/getNextCuttingProgLotNo', TransactionsController.getNextCuttingProgLotNo);
router.get('/getFabricsForOrderIDForCuttingProgram', TransactionsController.getFabricsForOrderIDForCuttingProgram);
router.get('/getFabricDetailForOrder', TransactionsController.getFabricDetailForOrder);
router.get('/getJobworkOutwardReport', TransactionsController.getJobworkOutwardReport);
router.get('/getOrdersForLedgerAndProcess', TransactionsController.getOrdersForLedgerAndProcess);

router.get('/getNextYarnInvoiceVouNo', TransactionsController.getNextYarnInvoiceVouNo);
router.get('/getNextJobworkInwardVouNo', TransactionsController.getNextJobworkInwardVouNo);
router.get('/getJobworkInvoiceReport', TransactionsController.getJobworkInvoiceReport);
router.get('/getYarnInvoiceReport', TransactionsController.getYarnInvoiceReport);
router.get('/getYarnOutwardReport', TransactionsController.getYarnOutwardReport);




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



router.get('/getJobworkOutwardColorDetails', TransactionsController.getJobworkOutwardColorDetails);

//jobwork invoice
router.put('/jobworkInvoice', TransactionsController.saveJobworkInvoice);
router.get('/jobworkInvoice', TransactionsController.getJobworkInvoice);
router.delete('/jobworkInvoice', TransactionsController.deleteJobworkInvoice);
router.get('/getNextJobworkInvoiceVouNo', TransactionsController.getNextJobworkInvoiceVouNo);
router.get('/getJobworkInwardColorDetails', TransactionsController.getJobworkInwardColorDetails);

router.get('/getProductAndSizeSBForOrderID', TransactionsController.getProductAndSizeSBForOrderID);




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
//dyeing porgram
router.put('/DyeingProgram', TransactionsController.saveDyeingProgram);
router.get('/DyeingProgram', TransactionsController.getDyeingProgram);
router.delete('/DyeingProgram', TransactionsController.deleteDyeingProgram);
//report
router.get('/getDyeingProgramReport', TransactionsController.getDyeingProgramReport);
//vouno dyeing Porgram
router.get('/getNextDyeingProgramVouNo', TransactionsController.getNextDyeingProgramVouNo);

router.get('/getFabricsForOrderID', MasterController.getFabricsForOrderID);

//company Details

router.put('/company', MasterController.saveCompany);
router.get('/company', MasterController.getCompany);
router.delete('/company', MasterController.deleteCompany);

//shortcut
router.put('/shortcut', MasterController.saveShortcut);
router.get('/shortcut', MasterController.getShortcut);
router.delete('/shortcut', MasterController.deleteShortcut);
//report fabric return
router.get('/getFabricReturnReport', TransactionsController.getFabricReturnReport);
//report yarn inward
router.get('/getYarnInwardReport', TransactionsController.getYarnInwardReport);
//report yarn return
router.get('/getYarnReturnReport', TransactionsController.getYarnReturnReport);
//report purchase order
router.get('/getYarnPurchaseOrderReport', TransactionsController.getYarnPurchaseOrderReport);














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

//product_details

router.get('/getSizeDetails', MasterController.getSizeDetails);
router.put('/productDetails', MasterController.saveProductDetails);
router.get('/productDetails', MasterController.getProductDetails);
router.delete('/productDetails', MasterController.deleteProductDetails);
router.get('/getPrefilledProductDetails', MasterController.getPrefilledProductDetails);
router.get('/getSizeForProductID', MasterController.getSizeForProductID)


//knitting_program

router.put('/knittingProgram', TransactionsController.saveKnittingProgram);
router.get('/knittingProgram', TransactionsController.getKnittingProgram);
router.delete('/knittingProgram', TransactionsController.deleteKnittingProgram);
router.get('/getNextKnittingProgramVouNo',TransactionsController.getNextKnittingProgramVouNo )
router.get('/getYarnSB', TransactionsController.getYarnSB);

//Voucher
router.get('/getLedgerForLedgerGroup', MasterController.getLedgerForLedgerGroup)
router.put('/voucher', MasterController.saveVoucher);
router.get('/voucher', MasterController.getVoucher);
router.delete('/voucher', MasterController.deleteVoucher);


//report

router.put('/report', MasterController.saveReport);
router.get('/report', MasterController.getReport);
router.delete('/report', MasterController.deleteReport);

router.get('/getGarmentsDeliveryNotePrint', TransactionsController.getGarmentsDeliveryNotePrint);
router.get('/getGarmentsReceiptNotePrint', TransactionsController.getGarmentsReceiptNotePrint);

router.get('/getJobworkInwardReport', TransactionsController.getJobworkInwardReport);
router.get('/getGarmentsDeliveryNoteInventoryDetails', TransactionsController.getGarmentsDeliveryNoteInventoryDetails);

//purchase order
router.put('/yarnPurchaseOrder', TransactionsController.saveYarnPurchaseOrder);
router.get('/yarnPurchaseOrder', TransactionsController.getYarnPurchaseOrder);
router.delete('/yarnPurchaseOrder', TransactionsController.deleteYarnPurchaseOrder);
router.get('/getNextYarnPurchaseOrderVouNo',TransactionsController.getNextYarnPurchaseOrderVouNo )
router.get('/getHsnAndRateForProductId',TransactionsController.getHsnAndRateForProductId )


//purchase order
router.put('/generalPurchaseOrder', TransactionsController.saveGeneralPurchaseOrder);
router.get('/generalPurchaseOrder', TransactionsController.getGeneralPurchaseOrder);
router.delete('/generalPurchaseOrder', TransactionsController.deleteGeneralPurchaseOrder);
router.get('/getNextGeneralPurchaseOrderVouNo',TransactionsController.getNextGeneralPurchaseOrderVouNo )


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


router.get('/getGarmentsInvoicePrint', TransactionsController.getGarmentsInvoicePrint);



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


module.exports = router;
