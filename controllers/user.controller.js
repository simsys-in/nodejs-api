const jwt = require("jsonwebtoken");
const DBCON = require('../db_config');
const UserMasModel = require('../models/users.model');
const md5 = require('md5');
const bcrypt = require('bcryptjs');
const {
    issetNotEmpty
} = require('../helpers/common');

const Users = new UserMasModel();

const Menu_MasterModel = require('../models/menu_master_mas.model');
const Menu_Master = new Menu_MasterModel();


const User_GroupModel = require('../models/user_group_mas.model');
const User_Group = new User_GroupModel();


const UserModel = require('../models/users_mas.model');
const User = new UserModel();


exports.login = function (req, res) {
    console.log(req.body)
    var email = req.body.username;
    var password = req.body.password;
    var cpin = req.body.cpin;

    process.env['DB_NAME'] = "erp" + cpin;
    console.log(process.env.DB_NAME)
    DBCON.changeUser({
        database: process.env.DB_NAME,
    }, (err) => {
        if (err) throw err;
        console.log(process.env.DB_NAME + " DB Connected")


        Users.login(email, password, function (err, result) {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                console.log(result)
                if (result.length > 0) {
                    var user = Object.assign({}, result[0])
                    console.log(user.password, md5(password), password)
                    if(bcrypt.compareSync(password, user.password))
                    {
                    // if (password === user.password || md5(password) === user.password) {
                        var payload = user;
                        console.log("pay", user, payload)
                        let token = jwt.sign(payload, process.env.SIGN_TOKEN, {
                            expiresIn: "4h",
                        });
                        let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                            expiresIn: "1d"
                        });
                        user.token = token;
                        user.userMenuList = [];
                        res.header("Access-Control-Allow-Credentials", "true");
                        // res.header("Access-Control-Allow-Origin", "*");
                        // res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
                        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
                        res.cookie("refreshToken", refreshToken)
                        res.cookie("token", token, {
                            httpOnly: true
                        }).sendSuccess("Login Success", user);


                    } else {
                        res.sendWarning("Password is not matching")
                    }
                } else {
                    res.sendError("User Not Found")
                }
            }
        })
    });
}
exports.saveMenu_Master = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Menu_Master.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}

exports.getMenu_Master = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Menu_Master.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Menu_Master.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.getAllMenu_MasterSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, menu from menu_master ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteMenu_Master = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Menu_Master.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Menu master Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Menu master Not Found! ")
    }

}


exports.saveUser_Group = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    User_Group.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}

exports.getUser_Group = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        User_Group.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        User_Group.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.getAllUser_GroupSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, menu from user_group ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteUser_Group = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        User_Group.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("User Group Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("User Group Not Found! ")
    }

}

exports.saveUser = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    User.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}

exports.getUser = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        User.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        User.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.getAllUserSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, name from users ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteUser = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        User.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("User Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("User Not Found! ")
    }

}

exports.getAllUserGroupSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, user_group as name from user_group ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}