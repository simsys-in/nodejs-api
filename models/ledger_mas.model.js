const pool = require('../db_config');
const DBCON = require('../db_config');
const {
    issetNotEmpty
} = require('../helpers/common');

function LedgerModel() {};

const TABLE_NAME = 'ledger';

LedgerModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM ${TABLE_NAME} WHERE ${field} = ?`;
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
        pool.query(`select @acount:=@acount+1 as sno, ledger.id, ledger.ledger, ledger.address, ledger.gstno, ledger.mobile, ledger_group.ledger_group, ledger_category.ledger_category from (SELECT @acount:= 0) AS acount, ledger left join ledger_group on ledger_group.id = ledger.ledger_group_id left join ledger_category on ledger_category.id = ledger.ledger_category_id order by ledger.id desc`, function(err, result){
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
        body.updated_at = new Date();
        if (issetNotEmpty(body.id)) {
            DBCON.query(`select count(id) as c from ${TABLE_NAME} where id != ? and ledger = ?`, [body.id, body.name], (err, count) => {
                if (err) {
                    callback(err)
                } else {
                    if (count[0].c > 0) {
                        callback("Ledger Already Found!")
                    } else {
                        // body.created_at = new Date();
                        DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [body, body.id], (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                callback(false, result, "Ledger Updated Successfully")
                            }
                        })
                    }
                }
            })
        } else {
            // console.log(body.name, "Entered")
            body.created_at = new Date();
            DBCON.query(`select count(id) as c from ${TABLE_NAME} where ledger = ?`, [body.name], (err, count) => {
                if (err) {
                    callback(err)
                } else {
                    // console.log("DB Query Success")
                    if (count[0].c > 0) {
                        callback("Ledger Name Already Found!")
                    } else {
                        DBCON.query(`insert into ${TABLE_NAME} set ?`, body, (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                callback(false, result, "Ledger Saved Successfully!")
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

module.exports = LedgerModel;