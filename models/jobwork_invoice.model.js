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
                    // jobwork_invoice_product: []

                }
                pool.query(sql1, match, function (err, result1) {
                    if (err) {
                        callback(err)
                    } else {
                        jobwork_invoice.jobwork_invoice_inventory = result1;

                        callback(false, jobwork_invoice);



                    }
                })



            }


        });
    },
    getAll: function (callback) {
        pool.query(`select jobwork_invoice.id,jobwork_invoice.inventory_qty_total, DATE_FORMAT(jobwork_invoice.vou_date, '%d-%m-%Y') as vou_date,jobwork_invoice.vouno, ledger.ledger from ${TABLE_NAME} left join ledger on ledger.id=jobwork_invoice.ledger_id  order by ${TABLE_NAME}.id desc`, function (err, result) {

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
                            // for (index = 0; index < body.jobwork_invoice_inventory.length; index++) {
                            //     var item = body.jobwork_invoice_inventory[index];
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
                            // }
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
                    // for (index = 0; index < body.jobwork_invoice_inventory.length; index++) {
                    //     var item = body.jobwork_invoice_inventory[index];
                        body.jobwork_invoice_inventory.map((item, index) => {
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
                    // }
                })

                }
            })

        }
    },

    delete: function (id, callback) {
        pool.query(`delete from jobwork_invoice_inventory where vou_id = ?`, id, (err, result) => {
            if (err) {
                callback(err)
            } else {
                if (err) {
                    callback(err)
                } else {
                    pool.query(`delete from jobwork_invoice where id = ?`, id, (err, result1) => {

                        callback(false, result1)

                    })
                }
            }
        })
    },

    getNextJobworkInvoiceVouNo: (callback) => {
        var query = 'select max(ifnull(vouno, 0)) + 1 as max_vou_no from jobwork_invoice';

        DBCON.query(query, (err, result) => {
            if (err) {
                console.log(err);
                callback(err)
            } else {
                callback(false, result[0]);
            }
        })
    },
    getJobworkInvoiceReport: (id, callback) => {
        var jobwork_invoice_details = {};
        const QUERY = `select jobwork_invoice.id, jobwork_invoice.vouno, jobwork_invoice.vou_date, 'Vehicle No' as vehicle_no from jobwork_invoice where jobwork_invoice.id = ${id};`;

        DBCON.query(QUERY, (err, result) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                jobwork_invoice_details = result[0];

                // const ORDER_ID = jobwork_invoice_details.order_id;
                // const GET_COLOR_SIZE_DETAILS_QUERY = `select concat(size.size1, ",", size.size2, ",",size.size3, ",",size.size4, ",",size.size5, ",",size.size6, ",",size.size7, ",",size.size8, ",",size.size9) as sizes from order_program left join size on size.id = order_program.size_id where order_program.id = ${ORDER_ID};`;

                // DBCON.query(GET_COLOR_SIZE_DETAILS_QUERY, (err, color_size_details) => {
                //     if (err) {
                //         console.log(err);
                //         callback(err)
                //     } else {
                //         var sizes = color_size_details.length > 0 ? color_size_details[0].sizes !== null ? color_size_details[0].sizes : "" : "";
                //         console.log(sizes);
                //         sizes = sizes.split(",");
                //         // res.sendInfo("", sizes);
                //         jobwork_invoice_details.color_size_details = sizes;

                // const GET_COLOR_DETAILS_QUERY = `select color.color, jobwork_invoice_inventory.size1,jobwork_invoice_inventory.size2,jobwork_invoice_inventory.size3,jobwork_invoice_inventory.size4,jobwork_invoice_inventory.size5,jobwork_invoice_inventory.size6,jobwork_invoice_inventory.size7,jobwork_invoice_inventory.size8, jobwork_invoice_inventory.size9, jobwork_invoice_inventory.qty from jobwork_invoice_inventory left join color on color.id = jobwork_invoice_inventory.color_id where vou_id = ${id};`;

                // DBCON.query(GET_COLOR_DETAILS_QUERY, (err, color_details) => {
                //     if (err) {
                //         console.log(err);
                //         callback(err);
                //     } else {
                //         jobwork_invoice_details.color_details = color_details;

                const GET_INVENTORY_QUERY = `select size.size,jobwork_invoice_inventory.amount,jobwork_invoice_inventory.rate, jobwork_invoice_inventory.qty,product.product from 
                                jobwork_invoice_inventory left join size on size.id = jobwork_invoice_inventory.size_id left join product on product.id = jobwork_invoice_inventory.product_id where vou_id = ${id};`;

                DBCON.query(GET_INVENTORY_QUERY, (err, inventory) => {
                    if (err) {
                        console.log(err);
                        callback(err);
                    } else {
                        jobwork_invoice_details.inventory = inventory;

                        //total
                        const GET_INVENTORYTOTAL_QUERY = `select jobwork_invoice.inventory_amount_total, jobwork_invoice.inventory_qty_total from jobwork_invoice where jobwork_invoice.id = ${id};`;

                        DBCON.query(GET_INVENTORYTOTAL_QUERY, (err, inventorytotal) => {
                            if (err) {
                                console.log(err);
                                callback(err);
                            } else {
                                jobwork_invoice_details.inventorytotal = inventorytotal;

                                //total


                                const GET_COMPANY_DETAILS = `select * from company limit 1`;
                                const GET_LEDGER_DETAILS = `select ledger.ledger, ledger.delivery_address, ledger.mobile, ledger.phone, ledger.gstno from jobwork_invoice left join ledger on jobwork_invoice.ledger_id = ledger.id where jobwork_invoice.id = ${id}`;
                                DBCON.query(GET_COMPANY_DETAILS, (err, company_details) => {
                                    if (err) {
                                        console.log(err);
                                        callback(err);

                                    } else {
                                        jobwork_invoice_details.company_details = company_details[0];
                                        DBCON.query(GET_LEDGER_DETAILS, (err, ledger_details) => {
                                            if (err) {
                                                console.log(err);
                                                callback(err);
                                            } else {
                                                jobwork_invoice_details.ledger_details = ledger_details[0];
                                                callback(false, jobwork_invoice_details);
                                            }
                                        });
                                    }
                                });
                            }
                        });

                    }
                    //     })
                    // }
                })

            }
        })
    },


}

module.exports = JobworkInvoiceModel;