
const DBCON = require('../../db_config');
const {
    issetNotEmpty
} = require('../../helpers/common');
const bcrypt = require('bcryptjs');

function UserModel() {};

const TABLE_NAME = 'users';

UserModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;
        console.log(sql);

        DBCON.query(sql, match, function (err, result) {
            if (err){ 
                // throw err
                callback(err)
            }

            if (result.length) {
                callback(false,result);
            } else {
                callback(false,null);
            }
        });
    },
    getAll : function(callback){
        DBCON.query(`select ${TABLE_NAME}.id, ${TABLE_NAME}.name, ${TABLE_NAME}.email, ${TABLE_NAME}.password, user_group.user_group, ${TABLE_NAME}.mobile from ${TABLE_NAME} left join user_group on user_group.id = users.user_group_id order by ${TABLE_NAME}.id desc`, function(err, result){
            if(err)
            {
                callback(err)
            }
            else{
                result.map(item => {
                    item.key = item.id;
                })
                callback(false, result)
            }
        })
    },
    checkAndSaveOrUpdate: async function (body, callback) {
        body.password = await bcrypt.hash(body.password, 12);
        if (issetNotEmpty(body.id)) {
            DBCON.query(`select count(id) as c from ${TABLE_NAME} where id != ? and (email = ? or mobile = ?)`, [body.id, body.email,body.mobile], (err, count) => {
                if (err) {
                    callback(err)
                } else {
                    if (count[0].c > 0) {
                        callback("User Already Found!")
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
            console.log(body.name, "Entered")
            body.created_at = new Date();
            DBCON.query(`select count(id) as c from ${TABLE_NAME} where  (email = ? or mobile = ?)`, [body.email,body.mobile], (err, count) => {
                if (err) {
                    callback(err)
                } else {
                    // console.log("DB Query Success")
                    if (count[0].c > 0) {
                        callback("User Name Already Found!")
                    } else {
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
    delete : function(id, callback){
        DBCON.query(`delete from ${TABLE_NAME} where id = ?`, id, (err,result) => {
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

module.exports = UserModel;