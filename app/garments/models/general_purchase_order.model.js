
const DBCON = require('../../../db_config');
const {
    issetNotEmpty
} = require('../../../helpers/common');

const moment = require('moment');
const { getDBDate } = require('../../../helpers/timer')

function GeneralPurchaseOrderModel() {};

const TABLE_NAME = 'general_purchase_order';

GeneralPurchaseOrderModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM general_purchase_order WHERE id = ?`;
        // console.log(sql);

        let sql1 = `SELECT * FROM general_purchase_order_inventory WHERE general_purchase_order_inventory.vou_id = ?`;


        DBCON.query(sql, match, function (err, result) {

            if (err) {
                // throw err
                callback(err)
            } else {
                var general_purchase_order = {
                    ledger_id: result[0].ledger_id,
                    delivery_address: result[0].delivery_address,
                    vou_date: getDBDate(result[0].vou_date),
                    narration: result[0].narration,
                    payment_mode : result[0].payment_mode,
                    payment_terms_conditions : result[0].payment_terms_conditions,
                    inventory_qty_total: result[0].inventory_qty_total,
                    inventory_amount_total: result[0].inventory_amount_total,
                
                    vouno: result[0].vouno,
                    

                    general_purchase_order_inventory: [],
                    // purchase_order_product: []

                }
                DBCON.query(sql1, match, function (err, result1) {
                    if (err) {
                        callback(err)
                    } else {
                        general_purchase_order.general_purchase_order_inventory = result1;

                        callback(false, general_purchase_order);



                    }
                })



            }


        });
    },
    getAll: function (callback) {
        DBCON.query(`select general_purchase_order.id,general_purchase_order.inventory_qty_total, DATE_FORMAT(general_purchase_order.vou_date, '%d-%m-%Y') as vou_date,general_purchase_order.vouno, ledger.ledger from ${TABLE_NAME} left join ledger on ledger.id=general_purchase_order.ledger_id  order by ${TABLE_NAME}.id desc`, function (err, result) {

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

            var general_purchase_order = {
                ledger_id: body.ledger_id,
                delivery_address: body.delivery_address,
                vou_date: getDBDate(body.vou_date),
                narration: body.narration,
                payment_mode : body.payment_mode,
                payment_terms_conditions : body.payment_terms_conditions,
                inventory_qty_total: body.inventory_qty_total,
                inventory_amount_total: body.inventory_amount_total,
               
                vouno: body.vouno,
               
            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [general_purchase_order, body.id], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    // console.log(result);
                    DBCON.query(`delete from general_purchase_order_inventory where vou_id = ?`, body.id, (err, deletedData) => {
                        if (err) {
                            callback(err)
                        } else {
                            if(body.general_purchase_order_inventory.length > 0){

                                body.general_purchase_order_inventory.map((item, index) => {
                                // for (index = 0; index < body.purchase_order_inventory.length; index++) {
                                //     var item = body.purchase_order_inventory[index];
                                    
                                        var general_purchase_order_inventory = {
                                            vou_id: body.id,
                                            unit_id: issetNotEmpty(item.unit_id) ? item.unit_id : 0,
                                            product_id: item.product_id,
                                            hsnsac: item.hsnsac,
                                            qty: item.qty,
                                            rate: item.rate,
                                            amount: item.amount,
                                        }
                                        DBCON.query(`insert into general_purchase_order_inventory set ?`, general_purchase_order_inventory);
                                        if (index === body.general_purchase_order_inventory.length - 1) {
                                            callback(false, result, "Purchase Order  Saved Successfully!");
                                        }
    
                                     else {
                                        if (index === body.general_purchase_order_inventory.length - 1) {
                                            callback(false, result, "Purchase Order Updated Successfully!");
                                        }
                                    }
                                // }
                                })
                            }else{
                                callback(false, result, "Purchase Order Updated Successfully!");

                            }
                        }
                    })

                }
            })
        } else {

            var general_purchase_order = {
                ledger_id: body.ledger_id,
                delivery_address: body.delivery_address,
                vou_date: getDBDate(body.vou_date),
                narration: body.narration,
                payment_mode : body.payment_mode,
                payment_terms_conditions : body.payment_terms_conditions,
                inventory_qty_total: body.inventory_qty_total,
                inventory_amount_total: body.inventory_amount_total,

                vouno: body.vouno,
                
            }

            DBCON.query(`insert into ${TABLE_NAME} set ?`, general_purchase_order, (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    // console.log(result);
                    // for (index = 0; index < body.purchase_order_inventory.length; index++) {
                    //     var item = body.purchase_order_inventory[index];
                    if(body.general_purchase_order_inventory.length > 0){

                        body.general_purchase_order_inventory.map((item, index) => {
                        
                            // console.log(item, index)
                            var general_purchase_order_inventory = {
                                vou_id: result.insertId,
                                unit_id: issetNotEmpty(item.unit_id) ? item.unit_id : 0,

                                product_id: item.product_id,
                                hsnsac: item.hsnsac,
                                qty: item.qty,
                                rate: item.rate,
                                amount: item.amount,


                            }
                            DBCON.query(`insert into general_purchase_order_inventory set ?`, general_purchase_order_inventory);
                            if (index === body.general_purchase_order_inventory.length - 1) {
                                callback(false, result, "Purchase Order Updated Successfully!");
                            }
                         else {
                            if (index === body.general_purchase_order_inventory.length - 1) {
                                callback(false, result, "Purchase Order Updated Successfully!");
                            }
                        }
                    // }
                 })
                    }else{
                        callback(false, result, "Purchase Order Updated Successfully!");

                    }

                }
            })

        }
    },

    delete: function (id, callback) {
        DBCON.query(`delete from general_purchase_order_inventory where vou_id = ?`, id, (err, result) => {
            if (err) {
                callback(err)
            } else {
                if (err) {
                    callback(err)
                } else {
                    DBCON.query(`delete from general_purchase_order where id = ?`, id, (err, result1) => {

                        callback(false, result1)

                    })
                }
            }
        })
    },

    getNextGeneralPurchaseOrderVouNo: (callback) => {
        var query = 'select ifnull(max(ifnull(vouno, 0)),0) + 1 as max_vou_no from general_purchase_order';

        DBCON.query(query, (err, result) => {
            if (err) {
                // console.log(err);
                callback(err)
            } else {
                callback(false, result[0]);
            }
        })
    },
    getGeneralPurchaseOrderReport: (id, callback) => {
        var general_purchase_order_details = {};
        const QUERY = `select * from general_purchase_order where general_purchase_order.id = ${id};`;
        // const QUERY = `select general_purchase_order.id, general_purchase_order.vouno, general_purchase_order.vou_date, general_purchase_order.delivery_address, general_purchase_order.ledger_id, general_purchase_order.inventory_qty_total, general_purchase_order.inventory_amount_total from general_purchase_order where general_purchase_order.id = ${id};`;

        DBCON.query(QUERY, (err, result) => {
            if (err) {
                // console.log(err);
                callback(err);
            } else {
                general_purchase_order_details = result[0];


                const GET_INVENTORY_QUERY = `select general_purchase_order_inventory.id, general_purchase_order_inventory.hsnsac, product.product, unit.unit, general_purchase_order_inventory.qty, general_purchase_order_inventory.rate, general_purchase_order_inventory.amount from general_purchase_order_inventory left join product on product.id = general_purchase_order_inventory.product_id left join unit on unit.id = general_purchase_order_inventory.unit_id where vou_id = ${id};`;

                DBCON.query(GET_INVENTORY_QUERY, (err, inventory) => {
                    if (err) {
                        // console.log(err);
                        callback(err);
                    } else {
                        general_purchase_order_details.inventory = inventory;

                        //total
                        // const GET_INVENTORYTOTAL_QUERY = `select general_purchase_order.inventory_qty_kg_total, general_purchase_order.inventory_amount_total from general_purchase_order where general_purchase_order.id = ${id};`;

                        // DBCON.query(GET_INVENTORYTOTAL_QUERY, (err, inventorytotal) => {
                        //     if (err) {
                        //         console.log(err);
                        //         callback(err);
                        //     } else {
                        //         general_purchase_order_details.inventorytotal = inventorytotal;

                        //total


                        const GET_COMPANY_DETAILS = `select * from company limit 1`;
                        const GET_LEDGER_DETAILS = `select ledger.ledger, ledger.address, ledger.mobile, ledger.phone, ledger.gstno from general_purchase_order left join ledger on general_purchase_order.ledger_id = ledger.id where general_purchase_order.id = ${id}`;
                        DBCON.query(GET_COMPANY_DETAILS, (err, company_details) => {
                            if (err) {
                                // console.log(err);
                                callback(err);

                            } else {
                                general_purchase_order_details.company_details = company_details[0];
                                DBCON.query(GET_LEDGER_DETAILS, (err, ledger_details) => {
                                    if (err) {
                                        // console.log(err);
                                        callback(err);
                                    } else {
                                        general_purchase_order_details.ledger_details = ledger_details[0];
                                        callback(false, general_purchase_order_details);
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

    // getGeneralPurchaseOrderReport: (id, callback) => {
    //     var purchase_order_details = {};
    //     const QUERY = `select purchase_order.id, purchase_order.vouno, purchase_order.vou_date, purchase_order.delivery_address, purchase_order.ledger_id, purchase_order.inventory_qty_total, purchase_order.inventory_amount_total from purchase_order where purchase_order.id = ${id};`;

    //     DBCON.query(QUERY, (err, result) => {
    //         if (err) {
    //             console.log(err);
    //             callback(err);
    //         } else {
    //             purchase_order_details = result[0];


    //                             const GET_INVENTORY_QUERY = `select purchase_order_inventory.id, purchase_order_inventory.hsnsac, product.product, unit.unit, purchase_order_inventory.qty, purchase_order_inventory.rate, purchase_order_inventory.amount from purchase_order_inventory left join product on product.id = purchase_order_inventory.general_id left join unit on unit.id = purchase_order_inventory.unit_id where vou_id = ${id};`;

    //                             DBCON.query(GET_INVENTORY_QUERY, (err, inventory) => {
    //                                 if (err) {
    //                                     console.log(err);
    //                                     callback(err);
    //                                 } else {
    //                                     purchase_order_details.inventory = inventory;

    //                                     //total
    //                             // const GET_INVENTORYTOTAL_QUERY = `select purchase_order.inventory_qty_kg_total, purchase_order.inventory_amount_total from purchase_order where purchase_order.id = ${id};`;

    //                             // DBCON.query(GET_INVENTORYTOTAL_QUERY, (err, inventorytotal) => {
    //                             //     if (err) {
    //                             //         console.log(err);
    //                             //         callback(err);
    //                             //     } else {
    //                             //         purchase_order_details.inventorytotal = inventorytotal;

    //                                     //total


    //                                     const GET_COMPANY_DETAILS = `select * from company limit 1`;
    //                                     const GET_LEDGER_DETAILS = `select ledger.ledger, ledger.address, ledger.mobile, ledger.phone, ledger.gstno from purchase_order left join ledger on purchase_order.ledger_id = ledger.id where purchase_order.id = ${id}`;
    //                                     DBCON.query(GET_COMPANY_DETAILS, (err, company_details) => {
    //                                         if (err) {
    //                                             console.log(err);
    //                                             callback(err);

    //                                         } else {
    //                                             purchase_order_details.company_details = company_details[0];
    //                                             DBCON.query(GET_LEDGER_DETAILS, (err, ledger_details) => {
    //                                                 if (err) {
    //                                                     console.log(err);
    //                                                     callback(err);
    //                                                 } else {
    //                                                     purchase_order_details.ledger_details = ledger_details[0];
    //                                                     callback(false, purchase_order_details);
    //                                                 }
    //                                             });
    //                                         }
    //                                     });
    //                                 }
    //                         //     });

    //                         // }
    //                 //     })
    //                 // }
    //             })

    //         }
    //     })
    // },

   
}

module.exports = GeneralPurchaseOrderModel;