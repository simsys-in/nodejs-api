
const DBCON = require('../../../db_config');
const {
    issetNotEmpty
} = require('../../../helpers/common');

function MasterGroupModel() {};

const TABLE_NAME = 'master_group';

MasterGroupModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM ${TABLE_NAME} WHERE ${field} = ?`;
        // console.log(sql);

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
        DBCON.query(`select * from ${TABLE_NAME} order by ${TABLE_NAME}.id desc`, function(err, result){

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
    checkAndSaveOrUpdate: function (body, callback) {
        // console.log(body.id, "Entered")
        // body.updated_at = new Date();
        if (issetNotEmpty(body.id)) {
            DBCON.query(`select count(id) as c from ${TABLE_NAME} where id != ? and master_group = ?`, [body.id, body.master_group], (err, count) => {
                if (err) {
                    callback(err)
                } else {
                    if (count[0].c > 0) {
                        callback("Master Group Already Found!")
                    } else {
                        // body.created_at = new Date();
                        DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [body, body.id], (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                callback(false, result, "Master Group Updated Successfully")
                            }
                        })
                    }
                }
            })
        } else {
            // console.log(body.name, "Entered")
            // body.created_at = new Date();
            DBCON.query(`select count(id) as c from ${TABLE_NAME} where master_group = ?`, [body.master_group], (err, count) => {
                if (err) {
                    callback(err)
                } else {
                    // console.log("DB Query Success")
                    if (count[0].c > 0) {
                        callback("Master Group Name Already Found!")
                    } else {
                        DBCON.query(`insert into ${TABLE_NAME} set ?`, body, (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                callback(false, result, "Master Group Saved Successfully!")
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

module.exports = MasterGroupModel;