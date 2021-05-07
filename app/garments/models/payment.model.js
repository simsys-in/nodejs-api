
const DBCON = require('../../../db_config');
const {
    issetNotEmpty
} = require('../../../helpers/common');

const moment = require('moment');
const { getDBDate } = require('../../../helpers/timer')
const e = require('express');

function PaymentModel() {};

const TABLE_NAME = 'payment';

PaymentModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM payment WHERE id = ?`;
        // console.log(sql);

        let sql1 = `SELECT * FROM accounts WHERE accounts.vou_id = ?`;

        

        DBCON.query(sql, match, function (err, result) {

            if (err) {
                // throw err
                // console.log(err);
                callback(err)
            } else {
                var payment= {
                    slno: result[0].slno,
                    vou_date: getDBDate(result[0].vou_date),
                    narration: result[0].narration,
                    inventory_amount_total: result[0].inventory_amount_total,
                    vouno: result[0].vouno,
                    refno: result[0].refno,
                    ledger_id: result[0].ledger_id,
                    ledger2_id: result[0].ledger2_id,
                    amount: result[0].amount,
                    percentage : result[0].percentage,
                    route: result[0].route,
                    route_id: result[0].route_id,
                    accounts: [],
                
                }
                    
                DBCON.query(sql1, match, function (err, result1) {

                    if (err) {
                        // console.log(err);
                        callback(err)
                    } else {
                        result1.map((item, index) => {
            
                            if(index === result1.length - 1)
                            {
                                payment.accounts = result1;
                                callback(false, payment);
                            }
                        })
                            }
                        
                })


                    



            }

            // if (result.length) {
            //     callback(false,result);
            // } else {
            //     callback(false,null);
            // }
        });
    },
    getAll: function (callback) {
        DBCON.query(`select payment.id,payment.vouno,payment.inventory_amount_total, DATE_FORMAT(payment.vou_date, '%d-%m-%Y') as vou_date, ledger1.ledger as ledger, ledger2.ledger as account_ledger, payment.refno, payment.narration from payment left join ledger as ledger1 on ledger1.id = payment.ledger_id left join ledger as ledger2 on ledger2.id = payment.ledger2_id order by payment.id desc `, function (err, result) {

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
        body.updated_at = new Date();
        if (issetNotEmpty(body.id)) {

            var payment= {
                slno: body.slno,
                vou_date: getDBDate(body.vou_date),
                narration: body.narration,
                inventory_amount_total: body.inventory_amount_total,
                vouno: body.vouno,
                refno: body.refno,
                ledger_id: body.ledger_id,
                ledger2_id: body.ledger2_id,
                amount: body.amount,
                percentage : body.percentage,
                route: body.route,
                route_id: body.route_id,
            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [payment, body.id], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    // console.log(result);
                    DBCON.query(`delete from accounts where vou_id = ?`, body.id, (err, deletedData) => {
                        if (err) {
                            callback(err)
                        } else {
                            if(body.accounts.length >0){

                                body.accounts.map((item, index) => {
                                    
                                        var accounts = {
                                            vou_id: body.id,
                                            ledger_id : item.ledger_id,
                                            narration : item.narration,
                                            percentage : item.percentage,
                                            amount : item.amount,

                                        }
                                        DBCON.query(`insert into accounts set ?`, accounts);
                                        if (index === body.accounts.length - 1) {
                                            callback(false, result, "Payment  Updated Successfully!");
                                        }
                                    // } else {
                                    //     if (index === body.garments_delivery_note_inventory.length - 1) {
                                    //         callback(false, result, "Garments Delivery Note Updated Successfully!");
                                    //     }
                                    // }
                                })
                            }else{
                                callback(false, result, "Payment  Updated Successfully!");

                            }
                        }
                    })

                }
            })
        } else {

            var payment= {
                slno: body.slno,
                vou_date: getDBDate(body.vou_date),
                narration: body.narration,
                inventory_amount_total: body.inventory_amount_total,
                vouno: body.vouno,
                refno: body.refno,
                ledger_id: body.ledger_id,
                ledger2_id: body.ledger2_id,
                amount: body.amount,
                percentage : body.percentage,
                route: body.route,
                route_id: body.route_id,
            }
            DBCON.query(`insert into ${TABLE_NAME} set ?`, payment, (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    // console.log(result);
                    if(body.accounts.length > 0){

                        for(index=0; index < body.accounts.length; index++)
                        {
                            var item = body.accounts[index];
                        //  body.accounts.map((item, index) => {
                            
                                // console.log(item, index)
                                var accounts = {
                                    vou_id: result.insertId,
                                    ledger_id : item.ledger_id,
                                    narration : item.narration,
                                    percentage : item.percentage,
                                    amount : item.amount,

                                }
                                DBCON.query(`insert into accounts set ?`, accounts);
                                if (index === body.accounts.length - 1) {
                                    callback(false, result, "Payment Updated Successfully!");
                                }
                            // } else {
                            //     if (index === body.garments_delivery_note_inventory.length - 1) {
                            //         callback(false, result, "Garments Delivery Note Updated Successfully!");
                            //     }
                            // }
                        // })
                            }
                    }else{
                        callback(false, result, "Payment Updated Successfully!");

                    }

                }
                
            })
            //         }
            //     }
            // })
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
    // }

    getNextPaymentVouNo : (callback) => {
        var query = 'select max(ifnull(vouno, 0)) + 1 as max_vou_no from payment';

        DBCON.query(query, (err, result) => {
            if(err){
                // console.log(err);
                callback(err)
            }
            else{
                callback(false,result[0]);
            }
        })
    },

    getPaymentReport: (id, callback) => {
        var payment_details = {};
        const QUERY = `select payment.id,  payment.vou_date,payment.narration, payment.inventory_amount_total, payment.amount, payment.refno, ledger1.ledger as ledger, ledger2.ledger as account_ledger from payment left join ledger as ledger1 on ledger1.id = payment.ledger_id left join ledger as ledger2 on ledger2.id = payment.ledger2_id  where payment.id = ${id};`;

        DBCON.query(QUERY, (err, result) => {
            if (err) {
                // console.log(err);
                callback(err);
            } else {
                payment_details = result[0];


                const GET_INVENTORY_QUERY = `select accounts.id, accounts.narration, accounts.amount, ledger.ledger as account_ledger from accounts  left join ledger on ledger.id = accounts.ledger_id   where vou_id = ${id};`;

                DBCON.query(GET_INVENTORY_QUERY, (err, inventory) => {
                    if (err) {
                        // console.log(err);
                        callback(err);
                    } else {
                        payment_details.inventory = inventory;

                        //total
                        
                                //total


                                const GET_COMPANY_DETAILS = `select * from company limit 1`;
                                const GET_LEDGER_DETAILS = `select ledger.ledger, ledger.address, ledger.mobile, ledger.phone, ledger.gstno from payment left join ledger on payment.ledger_id = ledger.id where payment.id = ${id}`;
                                DBCON.query(GET_COMPANY_DETAILS, (err, company_details) => {
                                    if (err) {
                                        // console.log(err);
                                        callback(err);

                                    } else {
                                        payment_details.company_details = company_details[0];
                                        DBCON.query(GET_LEDGER_DETAILS, (err, ledger_details) => {
                                            if (err) {
                                                // console.log(err);
                                                callback(err);
                                            } else {
                                                payment_details.ledger_details = ledger_details[0];
                                                callback(false, payment_details);
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

module.exports = PaymentModel;