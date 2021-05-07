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
        DBCON.query(`select  receipt.id, ledger1.ledger as ledger, ledger2.ledger as account_ledger, date_format(receipt.vou_date, '%d-%m-%Y') as vou_date, receipt.narration, receipt.vouno, receipt.refno, receipt.inventory_amount_total  from receipt  left join ledger as ledger1 on ledger1.id = receipt.ledger_id left join ledger as ledger2 on ledger2.id = ledger2_id order by receipt.id desc `, function (err, result) {
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
                                        callback(false, result, "Receipt Saved Successfully!");
                                    }
                                })
                            }else{
                                callback(false, result, "Receipt Saved Successfully!");

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
                                callback(false, result, "Receipt Saved Successfully!");
                            }
                        })
                    }else{
                        callback(false, result, "Receipt Saved Successfully!");

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

    getReceiptReport: (id, callback) => {
        var receipt_details = {};
        const QUERY = `select receipt.id,  receipt.vou_date,receipt.narration, receipt.inventory_amount_total, receipt.amount, receipt.refno, ledger1.ledger as ledger, ledger2.ledger as account_ledger from receipt left join ledger as ledger1 on ledger1.id = receipt.ledger_id left join ledger as ledger2 on ledger2.id = receipt.ledger2_id   where receipt.id = ${id};`;

        DBCON.query(QUERY, (err, result) => {
            if (err) {
                // console.log(err);
                callback(err);
            } else {
                receipt_details = result[0];


                const GET_INVENTORY_QUERY = `select accounts.id, accounts.narration, accounts.amount, ledger.ledger as account_ledger from accounts  left join ledger on ledger.id = accounts.ledger_id   where vou_id = ${id};`;

                DBCON.query(GET_INVENTORY_QUERY, (err, inventory) => {
                    if (err) {
                        // console.log(err);
                        callback(err);
                    } else {
                        receipt_details.inventory = inventory;

                        //total
                        
                                //total


                                const GET_COMPANY_DETAILS = `select * from company limit 1`;
                                const GET_LEDGER_DETAILS = `select ledger.ledger, ledger.address, ledger.mobile, ledger.phone, ledger.gstno from receipt left join ledger on receipt.ledger_id = ledger.id where receipt.id = ${id}`;
                                DBCON.query(GET_COMPANY_DETAILS, (err, company_details) => {
                                    if (err) {
                                        // console.log(err);
                                        callback(err);

                                    } else {
                                        receipt_details.company_details = company_details[0];
                                        DBCON.query(GET_LEDGER_DETAILS, (err, ledger_details) => {
                                            if (err) {
                                                // console.log(err);
                                                callback(err);
                                            } else {
                                                receipt_details.ledger_details = ledger_details[0];
                                                callback(false, receipt_details);
                                            }
                                        });
                                    }
                                });
                            }
                    //     });

                    // }
                    //     })
                    // }
                })

            }
        })
    },

    
}

module.exports = ReceiptModel;