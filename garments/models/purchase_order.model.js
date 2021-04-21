
const DBCON = require('../../db_config');
const {
    issetNotEmpty
} = require('../../helpers/common');

const moment = require('moment');
const { getDBDate } = require('../../helpers/timer')

function PurchaseOrderModel() {};

const TABLE_NAME = 'purchase_order';

PurchaseOrderModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM purchase_order WHERE id = ?`;
        console.log(sql);

        let sql1 = `SELECT * FROM purchase_order_inventory WHERE purchase_order_inventory.vou_id = ?`;


        DBCON.query(sql, match, function (err, result) {

            if (err) {
                // throw err
                callback(err)
            } else {
                var purchase_order = {
                    ledger_id: result[0].ledger_id,
                    delivery_address: result[0].delivery_address,
                    vou_date: result[0].vou_date,
                    narration: result[0].narration,
                    inventory_qty_total: result[0].inventory_qty_total,
                    inventory_amount_total: result[0].inventory_amount_total,
                
                    vouno: result[0].vouno,
                    

                    purchase_order_inventory: [],
                    // purchase_order_product: []

                }
                DBCON.query(sql1, match, function (err, result1) {
                    if (err) {
                        callback(err)
                    } else {
                        purchase_order.purchase_order_inventory = result1;

                        callback(false, purchase_order);



                    }
                })



            }


        });
    },
    getAll: function (callback) {
        DBCON.query(`select purchase_order.id,purchase_order.inventory_qty_total, DATE_FORMAT(purchase_order.vou_date, '%d-%m-%Y') as vou_date,purchase_order.vouno, ledger.ledger from ${TABLE_NAME} left join ledger on ledger.id=purchase_order.ledger_id  order by ${TABLE_NAME}.id desc`, function (err, result) {

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

            var purchase_order = {
                ledger_id: body.ledger_id,
                delivery_address: body.delivery_address,
                vou_date: getDBDate(body.vou_date),
                narration: body.narration,
                inventory_qty_total: body.inventory_qty_total,
                inventory_amount_total: body.inventory_amount_total,
               
                vouno: body.vouno,
               
            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [purchase_order, body.id], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    console.log(result);
                    DBCON.query(`delete from purchase_order_inventory where vou_id = ?`, body.id, (err, deletedData) => {
                        if (err) {
                            callback(err)
                        } else {
                            body.purchase_order_inventory.map((item, index) => {
                            // for (index = 0; index < body.purchase_order_inventory.length; index++) {
                            //     var item = body.purchase_order_inventory[index];
                                
                                    var purchase_order_inventory = {
                                        vou_id: body.id,
                            
                                        yarn_id: item.yarn_id,
                                        hsnsac: item.hsnsac,
                                        qty: item.qty,
                                    
                                        rate: item.rate,
                                        amount: item.amount,
                                    }
                                    DBCON.query(`insert into purchase_order_inventory set ?`, purchase_order_inventory);
                                    if (index === body.purchase_order_inventory.length - 1) {
                                        callback(false, result, "Purchase Order  Saved Successfully!");
                                    }

                                 else {
                                    if (index === body.purchase_order_inventory.length - 1) {
                                        callback(false, result, "Purchase Order Updated Successfully!");
                                    }
                                }
                            // }
                            })
                        }
                    })

                }
            })
        } else {

            var purchase_order = {
                ledger_id: body.ledger_id,
                delivery_address: body.delivery_address,
                vou_date: getDBDate(body.vou_date),
                narration: body.narration,
                inventory_qty_total: body.inventory_qty_total,
                inventory_amount_total: body.inventory_amount_total,

                vouno: body.vouno,
                
            }

            DBCON.query(`insert into ${TABLE_NAME} set ?`, purchase_order, (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    // console.log(result);
                    // for (index = 0; index < body.purchase_order_inventory.length; index++) {
                    //     var item = body.purchase_order_inventory[index];
                        body.purchase_order_inventory.map((item, index) => {
                        
                            console.log(item, index)
                            var purchase_order_inventory = {
                                vou_id: result.insertId,
                        
                                yarn_id: item.yarn_id,
                                hsnsac: item.hsnsac,
                                qty: item.qty,
                                rate: item.rate,
                                amount: item.amount,


                            }
                            DBCON.query(`insert into purchase_order_inventory set ?`, purchase_order_inventory);
                            if (index === body.purchase_order_inventory.length - 1) {
                                callback(false, result, "Purchase Order Updated Successfully!");
                            }
                         else {
                            if (index === body.purchase_order_inventory.length - 1) {
                                callback(false, result, "Purchase Order Updated Successfully!");
                            }
                        }
                    // }
                })

                }
            })

        }
    },

    delete: function (id, callback) {
        DBCON.query(`delete from purchase_order_inventory where vou_id = ?`, id, (err, result) => {
            if (err) {
                callback(err)
            } else {
                if (err) {
                    callback(err)
                } else {
                    DBCON.query(`delete from purchase_order where id = ?`, id, (err, result1) => {

                        callback(false, result1)

                    })
                }
            }
        })
    },

    getNextPurchaseOrderVouNo: (callback) => {
        var query = 'select ifnull(max(ifnull(vouno, 0)),0) + 1 as max_vou_no from purchase_order';

        DBCON.query(query, (err, result) => {
            if (err) {
                console.log(err);
                callback(err)
            } else {
                callback(false, result[0]);
            }
        })
    },
   
}

module.exports = PurchaseOrderModel;