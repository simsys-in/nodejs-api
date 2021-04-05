const pool = require('../db_config');
const DBCON = require('../db_config');
const {
    issetNotEmpty
} = require('../helpers/common');

const moment = require('moment');

function JobworkInvoiceModel() {};

const TABLE_NAME = 'jobwork_invoice';

JobworkInvoiceModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM jobwork_invoice WHERE id = ?`;
        console.log(sql);

        let sql1 = `SELECT *, 1 as selected FROM jobwork_invoice_inventory WHERE jobwork_invoice_inventory.vou_id = ?`;

        // let sql2 = `SELECT * FROM jobwork_outward_product WHERE jobwork_outward_product.vou_id = ?`;

        pool.query(sql, match, function (err, result) {

            if (err) {
                // throw err
                callback(err)
            } else {
                var jobwork_invoice = {
                    ledger_id: result[0].ledger_id,
                    process_id: result[0].process_id,
                    vou_date: result[0].vou_date,
                    narration: result[0].narration,
                    inventory_qty_total: result[0].inventory_qty_total,
                    inventory_amount_total: result[0].inventory_amount_total,
                    refno: result[0].refno,
                    vouno: result[0].vouno,
                    ledger2_id: result[0].ledger2_id,
                    amount: result[0].amount,
                    menu_id: result[0].menu_id,

                    jobwork_invoice_inventory: [],
                    // jobwork_outward_product: []

                }
                pool.query(sql1, match, function (err, result1) {
                    if (err) {
                        callback(err)
                    } else {
                        jobwork_invoice.jobwork_invoice_inventory = result1;
                        // pool.query(sql2, match, function (err, result2) {
                        //     if (err) {
                        //         callback(err)
                        //     } else {
                        //         jobwork_outward.jobwork_outward_product = result2;
                        callback(false, jobwork_invoice);
                        //     }
                        // })


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
        pool.query(`select jobwork_invoice.id,jobwork_invoice.inventory_qty_total, DATE_FORMAT(jobwork_invoice.vou_date, '%d-%m-%Y') as vou_date,jobwork_invoice.vouno, ledger.ledger from ${TABLE_NAME} left join ledger on ledger.id=jobwork_invoice.ledger_id  order by jobwork_invoice.id desc`, function (err, result) {

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

            var jobwork_invoice = {
                ledger_id: body.ledger_id,
                process_id: body.process_id,
                vou_date: body.vou_date,
                narration: body.narration,
                inventory_qty_total: body.inventory_qty_total,
                inventory_amount_total: body.inventory_amount_total,
                refno: body.refno,
                vouno: body.vouno,
                ledger2_id: body.ledger2_id,
                amount: body.amount,
                menu_id: body.menu_id,

            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [jobwork_invoice, body.id], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    console.log(result);
                    DBCON.query(`delete from jobwork_invoice_inventory where vou_id = ?`, body.id, (err, deletedData) => {
                        if (err) {
                            callback(err)
                        } else {
                            body.jobwork_invoice_inventory.map((item, index) => {
                                if (item.selected && issetNotEmpty(item.order_id) && item.order_id !== 0 && issetNotEmpty(item.size_id) && item.size_id !== 0 && issetNotEmpty(item.product_id) && item.product_id !== 0) {
                                    var jobwork_invoice_inventory = {
                                        vou_id: body.id,
                                        order_id: item.order_id,
                                        product_id: item.product_id,
                                        size_id: item.size_id,
                                        qty: item.qty,
                                        inward_id: item.inward_id,
                                        rate: item.rate,
                                        amount: item.amount,
                                    }
                                    DBCON.query(`insert into jobwork_invoice_inventory set ?`, jobwork_invoice_inventory);
                                    if (index === body.jobwork_invoice_inventory.length - 1) {
                                        callback(false, result, "Jobwork Invoice  Saved Successfully!");
                                    }
                                } else {
                                    if (index === body.jobwork_invoice_inventory.length - 1) {
                                        callback(false, result, "Jobwork Invoice Updated Successfully!");
                                    }
                                }
                            })
                        }
                    })

                }
            })
        } else {

            var jobwork_invoice = {
                ledger_id: body.ledger_id,
                process_id: body.process_id,
                vou_date: body.vou_date,
                narration: body.narration,
                inventory_qty_total: body.inventory_qty_total,
                inventory_amount_total: body.inventory_amount_total,
                refno: body.refno,
                vouno: body.vouno,
                ledger2_id: body.ledger2_id,
                amount: body.amount,
                menu_id: body.menu_id,

            }

            DBCON.query(`insert into ${TABLE_NAME} set ?`, jobwork_invoice, (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    // console.log(result);
                    for(index=0; index < body.jobwork_invoice_inventory.length; index++)
                    {
                        var item = body.jobwork_invoice_inventory[index];
                    // body.jobwork_invoice_inventory.map((item, index) => {
                        if (item.selected && issetNotEmpty(item.order_id) && item.order_id !== 0 && issetNotEmpty(item.size_id) && item.size_id !== 0 && issetNotEmpty(item.product_id) && item.product_id !== 0) {
                            console.log(item, index)
                            var jobwork_invoice_inventory = {
                                vou_id: result.insertId,
                                order_id: item.order_id,
                                product_id: item.product_id,
                                size_id: item.size_id,
                                qty: item.qty,
                                inward_id: item.inward_id,
                                rate: item.rate,
                                amount: item.amount,


                            }
                            DBCON.query(`insert into jobwork_invoice_inventory set ?`, jobwork_invoice_inventory);
                            if (index === body.jobwork_invoice_inventory.length - 1) {
                                callback(false, result, "Jobwork Invoice Updated Successfully!");
                            }
                        } else {
                            if (index === body.jobwork_invoice_inventory.length - 1) {
                                callback(false, result, "Jobwork Invoice Updated Successfully!");
                            }
                        }
                    }

                }
            })
            //         }
            //     }
            // })
        }
    },
    // checkAndSaveOrUpdate: function (body, callback) {
    //     // console.log(body.id, "Entered")
    //     // body.updated_at = new Date();
    //     if (issetNotEmpty(body.id)) {
    //         var jobwork_invoice = {
    //             ledger_id: body.ledger_id,
    //             process_id : body.process_id,
    //             vou_date: body.vou_date,
    //             narration: body.narration,
    //             inventory_qty_total: body.inventory_qty_total,
    //             inventory_amount_total: body.inventory_amount_total,
    //             refno: body.refno,
    //             vouno: body.vouno,
    //             ledger2_id: body.ledger2_id,
    //             amount: body.amount,
    //             menu_id: body.menu_id,


    //         }

    //         DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [jobwork_invoice, body.id], (err, result) => {
    //             if (err) {
    //                 callback(err)
    //             } else {
    //                 console.log(result);
    //                 DBCON.query(`delete from jobwork_invoice_inventory where vou_id = ?`, body.id, (err, deletedData) => {
    //                     if (err) {
    //                         callback(err)
    //                     } else {
    //                         DBCON.query(`delete from jobwork_outward_product where vou_id = ?`, body.id, (err, deletedData) => {
    //                             if (err) {
    //                                 callback(err)
    //                             } else {

    //                                 for (index = 0; index < body.jobwork_outward_inventory.length; index++) {
    //                                     var item = body.jobwork_outward_inventory[index];

    //                                     console.log(item)
    //                                     if (item.selected) {
    //                                         var jobwork_outward_inventory = {
    //                                             vou_id: body.id,
    //                                             color_id: item.color_id,
    //                                             size1: item.size1,
    //                                             size2: item.size2,
    //                                             size3: item.size3,
    //                                             size4: item.size4,
    //                                             size5: item.size5,
    //                                             size6: item.size6,
    //                                             size7: item.size7,
    //                                             size8: item.size8,
    //                                             size9: item.size9,
    //                                             qty: item.qty,
    //                                             inward_inv_id: item.inward_inv_id
    //                                         }

    //                                         DBCON.query(`insert into jobwork_outward_inventory set ?`, jobwork_outward_inventory);
    //                                         if (index === body.jobwork_outward_inventory.length - 1) {
    //                                             body.jobwork_outward_product.map((jobworkproduct, key) => {
    //                                                 var jobwork_outward_product = {
    //                                                     product_id: jobworkproduct.product_id,
    //                                                     qty: jobworkproduct.qty,
    //                                                     vou_id: body.id
    //                                                 }

    //                                                 DBCON.query(`insert into jobwork_outward_product set ?`, jobwork_outward_product);

    //                                                 if (key === body.jobwork_outward_product.length - 1) {
    //                                                     callback(false, result, "Jobwork Outward  Updated Successfully!");
    //                                                 }
    //                                             })
    //                                         }
    //                                     } else {
    //                                         console.log(index,body.jobwork_outward_inventory.length - 1)
    //                                         if (index === body.jobwork_outward_inventory.length - 1) {
    //                                             callback(false, result, "Jobwork Outward  Updated Successfully!");
    //                                         }
    //                                     }
    //                                 }
    //                             }
    //                         })
    //                     }
    //                 })

    //             }
    //         })
    //     } else {
    //         // DBCON.query(`select count(id) as c from ${TABLE_NAME} where order_program = ?`, [body.order_no], (err, count) => {
    //         //     if (err) {
    //         //         callback(err)
    //         //     } else {
    //         //         // console.log("DB Query Success")
    //         //         if (count[0].c > 0) {
    //         //             callback("Order Program Name Already Found!")
    //         //         } else {
    //         var jobwork_outward = {
    //             ledger_id: body.ledger_id,
    //             vou_date: body.vou_date,
    //             narration: body.narration,
    //             inventory_qty_total: body.inventory_qty_total,
    //             size1_total: body.size1_total,
    //             size2_total: body.size2_total,
    //             size3_total: body.size3_total,
    //             size4_total: body.size4_total,
    //             size5_total: body.size5_total,
    //             size6_total: body.size6_total,
    //             size7_total: body.size7_total,
    //             size8_total: body.size8_total,
    //             size9_total: body.size9_total,
    //             order_id: body.order_id,
    //             from_process_id: body.from_process_id,
    //             to_process_id: body.to_process_id,
    //             product_id: body.product_id
    //         }


    //         DBCON.query(`insert into ${TABLE_NAME} set ?`, jobwork_outward, (err, result) => {
    //             if (err) {
    //                 callback(err)
    //             } else {
    //                 console.log(result);
    //                 body.jobwork_outward_inventory.map((item, index) => {
    //                     if (item.selected) {
    //                         var jobwork_outward_inventory = {
    //                             vou_id: result.insertId,
    //                             color_id: item.color_id,
    //                             size1: item.size1,
    //                             size2: item.size2,
    //                             size3: item.size3,
    //                             size4: item.size4,
    //                             size5: item.size5,
    //                             size6: item.size6,
    //                             size7: item.size7,
    //                             size8: item.size8,
    //                             size9: item.size9,
    //                             qty: item.qty,
    //                             inward_inv_id: item.inward_inv_id
    //                         }
    //                         DBCON.query(`insert into jobwork_outward_inventory set ?`, jobwork_outward_inventory);
    //                         if (index === body.jobwork_outward_product.length - 1) {
    //                             body.jobwork_outward_product.map((jobworkproduct, key) => {
    //                                 var jobwork_outward_product = {
    //                                     vou_id: result.insertId,
    //                                     product_id: jobworkproduct.product_id,
    //                                     qty: jobworkproduct.qty
    //                                 }

    //                                 DBCON.query(`insert into jobwork_outward_product set ?`, jobwork_outward_product);

    //                                 if (key === body.jobwork_outward_product.length - 1) {
    //                                     callback(false, result, "Jobwork Outward  Saved Successfully!");
    //                                 }
    //                             })
    //                         }
    //                     }
    //                 })

    //             }
    //         })
    //         //         }
    //         //     }
    //         // })
    //     }
    // },
    delete: function (id, callback) {
        pool.query(`delete from jobwork_invoice_inventory where vou_id = ?`, id, (err, result) => {
            if (err) {
                callback(err)
            } else {
                if (err) {
                    callback(err)
                } else {
                        pool.query(`delete from jobwork_invoice where id = ?`, id, (err, result1) => {
                        // pool.query(`delete from jobwork_outward_product where vou_id = ?`, id, (err, result2) => {
                        //     if (err) {
                        //         callback(err)
                        //     } else {
                        callback(false, result1)
                        //     }
                        // })
                    // }
                })
            }
        }
    })
    },

    getNextJobworkInwardVouNo : (callback) => {
        var query = 'select max(ifnull(vouno, 0)) + 1 as max_vou_no from jobwork_invoice';

        DBCON.query(query, (err, result) => {
            if(err){
                console.log(err);
                callback(err)
            }
            else{
                callback(false,result[0]);
            }
        })
    }


}

module.exports = JobworkInvoiceModel;