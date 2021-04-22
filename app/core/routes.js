const express = require("express");
const Router = express.Router();

const menu_masterController = require('./controllers/menu_master.controller');
const emailtemplatesController = require('./controllers/emailtemplates.controller');
const ledger_groupController = require('./controllers/ledger_group.controller');
const master_groupController = require('./controllers/master_group.controller');
const masterController = require('./controllers/master.controller');
const product_groupController = require('./controllers/product_group.controller');
const product_categoryController = require('./controllers/product_category.controller');
const shortcutController = require('./controllers/shortcut.controller');
const sizeController = require('./controllers/size.controller');
const smstemplatesController = require('./controllers/smstemplates.controller');
const addonController = require('./controllers/addon.controller');
const vouchersController = require('./controllers/vouchers.controller');
const UserController = require('./controllers/user.controller');
// const companyController = require('./controllers/company.controller');
// const unitController = require('./controllers/unit.controller');
// const ledger_categoryController = require('./controllers/ledger_category.controller');
// const user_groupController = require('./controllers/user_group.controller');


Router.post('/login', UserController.login);
Router.post('/user/login', UserController.login);

// Router.get('/logout', UserController.logout);
// Router.post('/register', UserController.register);
// Router.get('/getAllUsers', UserController.getAllUsers);
// Router.get('/deleteUser', UserController.deleteUser);
// Router.get('/getUser', UserController.getUser);
// Router.get('/saveUserToMysql', UserController.saveUserToMysql);

Router.put('/menu_master', UserController.saveMenu_Master);
Router.get('/menu_master', UserController.getMenu_Master);
Router.delete('/menu_master', UserController.deleteMenu_Master);
 
Router.put('/user_group', UserController.saveUser_Group);
Router.get('/user_group', UserController.getUser_Group);
Router.delete('/user_group', UserController.deleteUser_Group);
Router.get('/getAllMenusForUserPermission', UserController.getAllMenusForUserPermission);

Router.put('/user', UserController.saveUser);
Router.get('/user', UserController.getUser);
Router.delete('/user', UserController.deleteUser);

Router.get('/getUserGroupSB', UserController.getAllUserGroupSB);
Router.post('/verifyLogin', UserController.verifyLogin);

// product_group routes 
Router.get('/product_group',product_groupController.index);
Router.get('/product_group/:id',product_groupController.show);
Router.put('/product_group/:id',product_groupController.update);
Router.post('/product_group',product_groupController.store);
Router.delete('/product_group/:id',product_groupController.destroy);

// product_category routes 
Router.get('/product_category',product_categoryController.index);
Router.get('/product_category/:id',product_categoryController.show);
Router.put('/product_category/:id',product_categoryController.update);
Router.post('/product_category',product_categoryController.store);
Router.delete('/product_category/:id',product_categoryController.destroy);

// menu_master
Router.get('/menu_master',menu_masterController.index);
Router.get('/menu_master/:id',menu_masterController.show);
Router.put('/menu_master/:id',menu_masterController.update);
Router.post('/menu_master',menu_masterController.store);
Router.delete('/menu_master/:id',menu_masterController.destroy);

// emailtemplates
Router.get('/emailtemplates',emailtemplatesController.index);
Router.get('/emailtemplates/:id',emailtemplatesController.show);
Router.put('/emailtemplates/:id',emailtemplatesController.update);
Router.post('/emailtemplates',emailtemplatesController.store);
Router.delete('/emailtemplates/:id',emailtemplatesController.destroy);

// ledger_group
Router.get('/ledger_group',ledger_groupController.index);
Router.get('/ledger_group/:id',ledger_groupController.show);
Router.put('/ledger_group/:id',ledger_groupController.update);
Router.post('/ledger_group',ledger_groupController.store);
Router.delete('/ledger_group/:id',ledger_groupController.destroy);

// master
Router.get('/master',masterController.index);
Router.get('/master/:id',masterController.show);
Router.put('/master/:id',masterController.update);
Router.post('/master',masterController.store);
Router.delete('/master/:id',masterController.destroy);

// master_group routes 
Router.get('/master_group',master_groupController.index);
Router.get('/master_group/:id',master_groupController.show);
Router.put('/master_group/:id',master_groupController.update);
Router.post('/master_group',master_groupController.store);
Router.delete('/master_group/:id',master_groupController.destroy);

// shortcut
Router.get('/shortcut',shortcutController.index);
Router.get('/shortcut/:id',shortcutController.show);
Router.put('/shortcut/:id',shortcutController.update);
Router.post('/shortcut',shortcutController.store);
Router.delete('/shortcut/:id',shortcutController.destroy);

// size
Router.get('/size',sizeController.index);
Router.get('/size/:id',sizeController.show);
Router.put('/size/:id',sizeController.update);
Router.post('/size',sizeController.store);
Router.delete('/size/:id',sizeController.destroy);

// smstemplates
Router.get('/smstemplates',smstemplatesController.index);
Router.get('/smstemplates/:id',smstemplatesController.show);
Router.put('/smstemplates/:id',smstemplatesController.update);
Router.post('/smstemplates',smstemplatesController.store);
Router.delete('/smstemplates/:id',smstemplatesController.destroy);

// addon routes 
Router.get('/addon',addonController.index);
Router.get('/addon/:id',addonController.show);
Router.put('/addon/:id',addonController.update);
Router.post('/addon',addonController.store);
Router.delete('/addon/:id',addonController.destroy);

// voucher
Router.get('/vouchers',vouchersController.index);
Router.get('/vouchers/:id',vouchersController.show);
Router.put('/vouchers/:id',vouchersController.update);
Router.post('/vouchers',vouchersController.store);
Router.delete('/vouchers/:id',vouchersController.destroy);

// // company routes 
// Router.get('/company',companyController.index);
// Router.get('/company/:id',companyController.show);
// Router.put('/company/:id',companyController.update);
// Router.post('/company',companyController.store);
// Router.delete('/company/:id',companyController.destroy);

// unit
// Router.get('/unit',unitController.index);
// Router.get('/unit/:id',unitController.show);
// Router.put('/unit/:id',unitController.update);
// Router.post('/unit',unitController.store);
// Router.delete('/unit/:id',unitController.destroy);

// ledger_category routes 
// Router.get('/ledger_category',ledger_categoryController.index);
// Router.get('/ledger_category/:id',ledger_categoryController.show);
// Router.put('/ledger_category/:id',ledger_categoryController.update);
// Router.post('/ledger_category',ledger_categoryController.store);
// Router.delete('/ledger_category/:id',ledger_categoryController.destroy);

// user_group routes 
// Router.get('/user_group',user_groupController.index);
// Router.get('/user_group/:id',user_groupController.show);
// Router.put('/user_group/:id',user_groupController.update);
// Router.post('/user_group',user_groupController.store);
// Router.delete('/user_group/:id',user_groupController.destroy);

module.exports = Router;