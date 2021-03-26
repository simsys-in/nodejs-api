const express = require("express");
const router = express.Router();

const Controller = require('../controllers/user.controller');

router.post('/login', Controller.login);


// router.get('/logout', Controller.logout);
// router.post('/register', Controller.register);
// router.get('/getAllUsers', Controller.getAllUsers);
// router.get('/deleteUser', Controller.deleteUser);
// router.get('/getUser', Controller.getUser);
// router.get('/saveUserToMysql', Controller.saveUserToMysql);

router.put('/menu_master', Controller.saveMenu_Master);
router.get('/menu_master', Controller.getMenu_Master);
router.delete('/menu_master', Controller.deleteMenu_Master);

router.put('/user_group', Controller.saveUser_Group);
router.get('/user_group', Controller.getUser_Group);
router.delete('/user_group', Controller.deleteUser_Group);
router.get('/getAllMenusForUserPermission', Controller.getAllMenusForUserPermission);

router.put('/user', Controller.saveUser);
router.get('/user', Controller.getUser);
router.delete('/user', Controller.deleteUser);

router.get('/getUserGroupSB', Controller.getAllUserGroupSB);



module.exports = router;
