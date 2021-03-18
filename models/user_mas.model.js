const pool = require('../db_config')
const bcrypt = require('bcrypt');
const {
    issetNotEmpty
} = require('../helpers/common');
const DBCON = require('../db_config')

function User() {};



const TABLE_NAME = 'user_mas';

User.prototype = {
    // Find the user data by id or username.
    find: function (user = null, callback) {
        // if the user variable is defind
        if (user) {
            // if user = number return field = id, if user = string return field = email.
            var field = Number.isInteger(user) ? 'id' : 'email';
        }
        // prepare the sql query
        let sql = `SELECT * FROM ${TABLE_NAME} WHERE ${field} = ?`;


        pool.query(sql, user, function (err, result) {
            if (err) {
                callback(err)
            } else {
                if (result.length) {
                    callback(false, result);
                } else {
                    callback(false, []);
                }
            }
        });
    },
    findTenantUsers: function (tenant_id, callback) {
        // prepare the sql query
        let sql = `SELECT * FROM ${TABLE_NAME} WHERE tenant = ?`;


        pool.query(sql, tenant_id, function (err, result) {
            if (err) {
                //   throw err
                callback(err)
            } else {
                callback(false, result);
            }
        });
    },
    getAll: function (callback) {
        let sql = `select * from ${TABLE_NAME}`;
        pool.query(sql, function (err, result) {
            if (err) throw err;
            callback(result)
        })
    },

    checkAndSaveOrUpdate: function (body, callback) {
        // console.log(body.id, "Entered")
        body.updated_at = new Date();
        delete body.confirm_password;
        if (issetNotEmpty(body.id)) {
            DBCON.query(`select count(id) as c from ${TABLE_NAME} where id != ? and email = ? and tenant= ?`, [body.id, body.email, body.tenant], (err, count) => {
                if (err) {
                    callback(err)
                } else {
                    if (count[0].c > 0) {
                        callback("User Email Already Exist with the same Tenant!")
                    } else {
                        body.created_at = new Date();
                        DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [body, body.id], (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                callback(false, result, "User Updated Successfully")
                            }
                        })
                    }
                }
            })
        } else {
            // console.log(body.name, "Entered")
            DBCON.query(`select count(id) as c from ${TABLE_NAME} where email = ? and tenant = ?`, [body.email, body.tenant], (err, count) => {
                if (err) {
                    callback(err)
                } else {
                    if (count[0].c > 0) {
                        callback("User Email Already Exist with the same Tenant!")
                    } else {
                        body.created_at = new Date();
                        DBCON.query(`insert into ${TABLE_NAME} set ?`, body, (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                callback(false, result, "User Saved Successfully!")
                            }
                        })
                    }
                }
            })
        }
    },
    // This function will insert data into the database. (create a new user)
    // body is an object 
    create: function (body, callback) {

        var pwd = body.password;
        // Hash the password before insert it into the database.
        body.password = bcrypt.hashSync(pwd, 10);

        // this array will contain the values of the fields.
        var bind = [];
        // loop in the attributes of the object and push the values into the bind array.
        for (prop in body) {
            bind.push(body[prop]);
        }
        // prepare the sql query
        let sql = `INSERT INTO ${TABLE_NAME} SET ?`;
        // call the query give it the sql string and the values (bind array)
        pool.query(sql, body, function (err, result) {
            if (err) throw err;
            // return the last inserted id. if there is no error
            callback(result.insertId);
        });
    },

    login: function (username, password, callback) {
        // find the user data by his username.
        this.find(username, function (user) {
            // if there is a user by this username.
            if (user) {
                // now we check his password.
                if (bcrypt.compareSync(password, user.password) || password === user.password) {
                    // return his data.
                    callback(false, user);
                    return;
                } else {
                    callback("Password is wrong!");
                    return;
                }

            } else {
                // if the username/password is wrong then return null.
                callback("User Not Found");
            }
        });

    },
    query: function (query, callback) {
        pool.query(query, function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result)
            }
        })
    },
    delete : function(id, callback){
        pool.query(`delete from ${TABLE_NAME} where id = ?`, id, (err,result) => {
            if(err)
            {
                callback(err)
            }
            else{
                callback(false, result)
            }
        })
    }

}

module.exports = User;