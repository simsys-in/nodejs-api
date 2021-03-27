const jwt = require("jsonwebtoken");
const DBCON = require('../db_config');
const UserMasModel = require('../models/users.model');
const md5 = require('md5');
const bcrypt = require('bcryptjs');
const {
    issetNotEmpty
} = require('../helpers/common');
// const UserMasModel = require('../models/users.model');
// const md5 = require('md5');
// const bcrypt = require('bcryptjs');

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
                    if(bcrypt.compareSync(password, user.password) || password === user.password)
                    {
                        DBCON.query(`select menu_master.menu as name, menu_master.menu_route as url, menu_master.icon, menu_master.sort_order, user_group.user_group, user_group_permission.view_permission, user_group_permission.delete_permission, user_group_permission.add_permission, user_group_permission.edit_permission from  user_group left join user_group_permission on user_group_permission.user_group_id = user_group.id left join menu_master on menu_master.id = user_group_permission.menu_id where user_group.id = ${user.user_group_id} and user_group_permission.add_permission = 1 order by menu_master.sort_order`, (err, menuData) => {
                            if(err)
                            {
                                console.log(err);
                                res.sendError(err);
                            }
                            else{
                                var menuList = menuData; 
                                var payload = user;
                                console.log("pay", user, payload)
                                let token = jwt.sign(payload, process.env.SIGN_TOKEN, {
                                    expiresIn: "4h",
                                });
                                let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                                    expiresIn: "1d"
                                });
                                user.token = token;
                                user.menuList = menuList;
                                user.userMenuList = [];
                                res.header("Access-Control-Allow-Credentials", "true");
                                // res.header("Access-Control-Allow-Origin", "*");
                                // res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
                                // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
                                res.cookie("refreshToken", refreshToken)
                                res.cookie("token", token, {
                                    httpOnly: true
                                }).sendSuccess("Login Success", user);
        
                            }
                        })
                    // if (password === user.password || md5(password) === user.password) {
                       

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

exports.getAllMenusForUserPermission = function (req, res) {
    const user_group_id = req.query.user_group_id ? req.query.user_group_id : null;
    var query = `select menu_master.menu, menu_master.id as menu_id, ifnull(user_group_permission.view_permission,0) as view_permission, ifnull(user_group_permission.add_permission,0) as add_permission, ifnull(user_group_permission.edit_permission,0) as edit_permission, ifnull(user_group_permission.delete_permission,0) as delete_permission, menu_master.icon, user_group_permission.type from (select * from menu_master)menu_master left join user_group_permission on user_group_permission.menu_id = menu_master.id `;

    // if(issetNotEmpty(user_group_id))
    // {
        query += `  and user_group_permission.user_group_id = '${user_group_id}'`;
    // }
    query += ` group by menu_master.id`;

    var query1 = `select route.voutype as menu, route.id as menu_id, ifnull(user_group_permission.view_permission,0) as view_permission, ifnull(user_group_permission.add_permission,0) as add_permission, ifnull(user_group_permission.edit_permission,0) as edit_permission, ifnull(user_group_permission.delete_permission,0) as delete_permission, route.icon, user_group_permission.type from (select * from route)route left join user_group_permission on user_group_permission.menu_id = route.id `;
    
    query1 += `  and user_group_permission.user_group_id = '${user_group_id}'`;
    // }
    query1 += ` group by route.id`;


    console.log(query, query1);
    DBCON.query(query, (err, result) => {
        if(err)
        {
            console.log(err);
            res.sendError(err)
        }
        else{
            DBCON.query(query1, (err, routeMenu) => {
                if(err)
                {
                    console.log(err);
                    req.sendError(err);
                }
                else{
                    var menuList = [...result, ...routeMenu];
                    res.sendInfo("", menuList); 
                }
            })
        }
    })
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