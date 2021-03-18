const pool = require('../db_config');
const DBCON = require('../db_config');
const {
    issetNotEmpty
} = require('../helpers/common');

function Ledger_GroupModel() {};

const TABLE_NAME = 'ledger_group';

Ledger_GroupModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;
        console.log(sql);

        pool.query(sql, match, function (err, result) {
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
        pool.query(`select * from ${TABLE_NAME}`, function(err, result){
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
            DBCON.query(`select count(id) as c from ${TABLE_NAME} where id != ? and ledger_group = ?`, [body.id, body.name], (err, count) => {
                if (err) {
                    callback(err)
                } else {
                    if (count[0].c > 0) {
                        callback("Ledger Group Already Found!")
                    } else {
                        // body.created_at = new Date();
                        DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [body, body.id], (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                callback(false, result, "Ledger Group Updated Successfully")
                            }
                        })
                    }
                }
            })
        } else {
            // console.log(body.name, "Entered")
            // body.created_at = new Date();
            DBCON.query(`select count(id) as c from ${TABLE_NAME} where ledger_group = ?`, [body.name], (err, count) => {
                if (err) {
                    callback(err)
                } else {
                    // console.log("DB Query Success")
                    if (count[0].c > 0) {
                        callback("Ledger Group Name Already Found!")
                    } else {
                        DBCON.query(`insert into ${TABLE_NAME} set ?`, body, (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                callback(false, result, "Ledger Group Saved Successfully!")
                            }
                        })
                    }
                }
            })
        }
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

module.exports = Ledger_GroupModel;