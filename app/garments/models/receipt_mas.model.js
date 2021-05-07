const DBCON = require('../../../db_config');
const {
    issetNotEmpty
} = require('../../../helpers/common');
const moment = require('moment');
const { getDBDate } = require('../../../helpers/timer')

function ReceiptModel() {};

const TABLE_NAME = 'receipt';

ReceiptModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM receipt WHERE id = ?`;
        // console.log(sql);

        let sql1 = `SELECT * FROM  accounts where accounts.vou_id = ?`;

        DBCON.query(sql, match, function (err, result) {
            if (err) {
                // throw err
                callback(err)
            } else {
                var receipt = {
                    vou_date: getDBDate(result[0].vou_date),
                    ledger_id: result[0].ledger_id,
                    ledger2_id: result[0].ledger2_id,
                    narration: result[0].narration,
                    inventory_amount_total: result[0].inventory_amount_total,
                    amount : result[0].amount,
                    refno: result[0].refno,
                    vouno: result[0].vouno,
                    slno : result[0].slno,
                    accounts: []
                }
                DBCON.query(sql1, match, function (err, result1) {
                    if (err) {
                        callback(err)
                    } else {
                        receipt.accounts = result1;
                        callback(false, receipt)
                    }
                })


            }


        });
    },
    getAll: function (callback) {
        DBCON.query(`select  ${TABLE_NAME}.id, ledger.ledger,ledger_group.ledger_group, date_format(${TABLE_NAME}.vou_date, '%d-%m-%Y') as vou_date, ${TABLE_NAME}.narration, ${TABLE_NAME}.vouno, ${TABLE_NAME}.refno, ${TABLE_NAME}.inventory_amount_total  from ${TABLE_NAME} left join ledger on ledger.id = receipt.ledger_id  left join ledger_group on ledger_group.id = receipt.ledger2_id order by ${TABLE_NAME}.id desc `, function (err, result) {
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
        // console.log(body.id, "Entered")
        // body.updated_at = new Date();

        if (issetNotEmpty(body.id)) {
            var receipt = {
                ledger_id: body.ledger_id,
                ledger2_id: body.ledger2_id,
                vou_date: getDBDate(body.vou_date),
                narration: body.narration,
                inventory_amount_total: body.inventory_amount_total,
                vouno: body.vouno,
                amount: body.amount,
                slno: body.slno,
                refno: body.refno
            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [receipt, body.id], (err, result) => {
                // if(key === body.receipt.length - 1)
                if (err) {
                    callback(err)
                } else {
                    // console.log(result)
                    DBCON.query('delete from accounts where vou_id = ? ', body.id, (err, deleteData) => {
                        if (err) {
                            callback(err)
                        } else {
                            if(body.accounts.length > 0){

                                body.accounts.map((item, index) => {
                                    var accounts = {
                                        // receipt_id : result.insertId,
                                        vou_id: body.id,
                                        ledger_id: item.ledger_id,
                                        amount: item.amount,
                                        narration: item.narration,
                                        percentage: item.percentage,
                                    }
                                    DBCON.query(`insert into accounts set ?`, accounts);
                                    if (index === body.accounts.length - 1) {
                                        callback(false, result, "Yarn outward Saved Successfully!");
                                    }
                                })
                            }else{
                                callback(false, result, "Yarn outward Saved Successfully!");

                            }
                        }
                    })

                }
            })
        } else {
         
            var receipt = {
                ledger_id: body.ledger_id,
                ledger2_id: body.ledger2_id,
                vou_date: getDBDate(body.vou_date),
                narration: body.narration,
                inventory_amount_total: body.inventory_amount_total,
                vouno: body.vouno,
                amount: body.amount,
                slno: body.slno,
                refno: body.refno
            }
            DBCON.query(`insert into ${TABLE_NAME} set ?`, receipt, (err, result) => {
                // if(key === body.receipt.length - 1)
                if (err) {
                    callback(err)
                } else {
                    // console.log(result)
                    if(body.accounts.length > 0){

                        body.accounts.map((item, index) => {
                            var accounts = {
                                // receipt_id : result.insertId,
                                vou_id: result.insertId,
                                ledger_id: item.ledger_id,
                                amount: item.amount,
                                narration: item.narration,
                                percentage: item.percentage,
                             
                            }
                            DBCON.query(`insert into accounts set ?`, accounts);
                            if (index === body.accounts.length - 1) {
                                callback(false, result, "Yarn outward Saved Successfully!");
                            }
                        })
                    }else{
                        callback(false, result, "Yarn outward Saved Successfully!");

                    }
                }
            })
        }
    },
   
    delete: function (id, callback) {
        DBCON.query(`delete from ${TABLE_NAME} where id = ?`, id, (err, result) => {
            if (err) {
                callback(err)
            } else {
                DBCON.query(`delete from accounts where vou_id = ?`, id, (err, result1) => {
                    if (err) {
                        callback(err)
                    } else {
                        callback(false, result1)
                    }
                })
            }
        })
    },

    getNextReceiptVouNo: (callback) => {
        var query = 'select max(ifnull(vouno, 0)) + 1 as max_vou_no from receipt';

        DBCON.query(query, (err, result) => {
            if (err) {
                // console.log(err);
                callback(err)
            } else {
                callback(false, result[0]);
            }
        })
    },

    
}

module.exports = ReceiptModel;