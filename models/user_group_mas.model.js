const pool = require('../db_config');
const DBCON = require('../db_config');
const {
    issetNotEmpty
} = require('../helpers/common');

function User_GroupModel() {};

const TABLE_NAME = 'user_group';

User_GroupModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;
        console.log(sql);

        pool.query(sql, match, function (err, result) {
            if (err) {
                // throw err
                callback(err)
            }

            if (result.length) {
                callback(false, result);
            } else {
                callback(false, null);
            }
        });
    },
    getAll: function (callback) {
        pool.query(`select * from ${TABLE_NAME} order by ${TABLE_NAME}.id desc`, function (err, result) {
            if (err) {
                callback(err)
            } else {
                result.map(item => {
                    item.key = item.id;
                })
                callback(false, result)
            }
        })
    },
    checkAndSaveOrUpdate: function (body, callback) {
        if (issetNotEmpty(body.id)) {

            const USER_GROUP = {
                user_group: body.user_group,
                state_id: 0,
                id: body.id
            }
            DBCON.query(`update ${TABLE_NAME} set ? where id= ?`, [USER_GROUP, body.id], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    const USER_GROUP_ID = body.id;
                    DBCON.query(`delete from user_group_permission where user_group_id = ${body.id}`, (err, data) => {
                        if (err) {
                            console.log(err);
                            callback(err);
                        } else {
                            console.log(body.menuList.length)
                            body.menuList.map((menu, index) => {
                                const USER_GROUP_PERMISSION = {
                                    user_group_id: USER_GROUP_ID,
                                    menu_id: menu.menu_from === "menu_mas" ? menu.menu_id : null,
                                    route: menu.menu_from === "route" ? menu.menu_id : null,
                                    view_permission: menu.view_permission,
                                    add_permission: menu.add_permission,
                                    delete_permission: menu.delete_permission,
                                    edit_permission: menu.edit_permission
                                }
                                DBCON.query(`insert into user_group_permission set ?`, USER_GROUP_PERMISSION, (err, data) => {
                                    if (err) {
                                        console.log(err);
                                        callback(err);
                                    } else {
                                        if (index === body.menuList.length - 1) {
                                            callback(false, result, "User group updated Successfully!")
                                        }
                                    }
                                })
                            })
                        }
                    })
                }
            })

        } else {
            const USER_GROUP = {
                user_group: body.user_group,
                state_id: 0
            }
            DBCON.query(`insert into ${TABLE_NAME} set ?`, USER_GROUP, (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    const USER_GROUP_ID = result.insertId;
                    body.menuList.map((menu, index) => {
                        const USER_GROUP_PERMISSION = {
                            user_group_id: USER_GROUP_ID,
                            menu_id: menu.menu_id,
                            view_permission: menu.view_permission,
                            add_permission: menu.add_permission,
                            delete_permission: menu.delete_permission,
                            edit_permission: menu.edit_permission
                        }

                        DBCON.query(`insert into user_group_permission set ? `, USER_GROUP_PERMISSION, (err, data) => {
                            if (err) {
                                console.log(err);
                                callback(err);
                            } else {
                                if (index === body.menuList.length - 1) {
                                    // callback()
                                    callback(false, result, "User group Saved Successfully!")
                                }
                            }
                        })
                    })
                }
            })
        }
    },
    delete: function (id, callback) {
        pool.query(`delete from ${TABLE_NAME} where id = ?`, id, (err, result) => {
            if (err) {
                callback(err)
            } else {
                callback(false, result)
            }
        })
    }
}

module.exports = User_GroupModel;