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

module.exports = router;
