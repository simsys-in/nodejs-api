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
Router.put('/product_category',product_categoryController.update);
Router.post('/product_category',product_categoryController.store);
Router.delete('/product_category',product_categoryController.destroy);

// menu_master
Router.get('/menu_master',menu_masterController.index);
Router.get('/menu_master/:id',menu_masterController.show);
Router.put('/menu_master',menu_masterController.update);
Router.post('/menu_master',menu_masterController.store);
Router.delete('/menu_master',menu_masterController.destroy);

// emailtemplates
Router.get('/emailtemplates',emailtemplatesController.index);
Router.get('/emailtemplates/:id',emailtemplatesController.show);
Router.put('/emailtemplates',emailtemplatesController.update);
Router.post('/emailtemplates',emailtemplatesController.store);
Router.delete('/emailtemplates',emailtemplatesController.destroy);

// ledger_group
Router.get('/ledger_group',ledger_groupController.index);
Router.get('/ledger_group/:id',ledger_groupController.show);
Router.put('/ledger_group',ledger_groupController.update);
Router.post('/ledger_group',ledger_groupController.store);
Router.delete('/ledger_group',ledger_groupController.destroy);

// master
Router.get('/master',masterController.index);
Router.get('/master/:id',masterController.show);
Router.put('/master',masterController.update);
Router.post('/master',masterController.store);
Router.delete('/master',masterController.destroy);

// master_group
Router.get('/master_group',master_groupController.index);
Router.get('/master_group/:id',master_groupController.show);
Router.put('/master_group',master_groupController.update);
Router.post('/master_group',master_groupController.store);
Router.delete('/master_group',master_groupController.destroy);

// shortcut
Router.get('/shortcut',shortcutController.index);
Router.get('/shortcut/:id',shortcutController.show);
Router.put('/shortcut',shortcutController.update);
Router.post('/shortcut',shortcutController.store);
Router.delete('/shortcut',shortcutController.destroy);

// size
Router.get('/size',sizeController.index);
Router.get('/size/:id',sizeController.show);
Router.put('/size',sizeController.update);
Router.post('/size',sizeController.store);
Router.delete('/size',sizeController.destroy);

// smstemplates
Router.get('/smstemplates',smstemplatesController.index);
Router.get('/smstemplates/:id',smstemplatesController.show);
Router.put('/smstemplates',smstemplatesController.update);
Router.post('/smstemplates',smstemplatesController.store);
Router.delete('/smstemplates',smstemplatesController.destroy);

// addon
Router.get('/addon',addonController.index);
Router.get('/addon/:id',addonController.show);
Router.put('/addon/:id',addonController.update);
Router.post('/addon',addonController.store);
Router.delete('/addon/:id',addonController.destroy);

Router.get('/vouchers',vouchersController.index);
Router.get('/vouchers/:id',vouchersController.show);
Router.put('/vouchers/:id',vouchersController.update);
Router.post('/vouchers',vouchersController.store);
Router.delete('/vouchers/:id',vouchersController.destroy);




module.exports = Router;