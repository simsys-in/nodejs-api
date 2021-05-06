const DBCON = require('../../../db_config');
const {
    issetNotEmpty
} = require('../../../helpers/common');

const moment = require('moment');
const { getDBDate } = require('../../../helpers/timer')
const e = require('express');
const {
    result
} = require('lodash');
const LedgerModel = require('./ledger_mas.model');
const Ledger = new LedgerModel();
// const {
//     getDBDate
// } = require('../../../helpers/timer');

function GarmentsInvoiceModel() {};

const TABLE_NAME = 'garments_invoice';

GarmentsInvoiceModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM garments_invoice WHERE id = ?`;
        // console.log(sql);

        let sql1 = `SELECT *, 1 as selected FROM garments_invoice_inventory WHERE garments_invoice_inventory.vou_id = ?`;



        DBCON.query(sql, match, function (err, result) {

            if (err) {
                // throw err
                // console.log(err);
                callback(err)
            } else {
                var garments_invoice = {
                    ledger_id: result[0].ledger_id,
                    vou_date: getDBDate(result[0].vou_date),
                    narration: result[0].narration,
                    vehicle_no: result[0].vehicle_no,
                    inventory_qty_total: result[0].inventory_qty_total,
                    size1_qty_total: result[0].size1_qty_total,
                    size2_qty_total: result[0].size2_qty_total,
                    size3_qty_total: result[0].size3_qty_total,
                    size4_qty_total: result[0].size4_qty_total,
                    size5_qty_total: result[0].size5_qty_total,
                    size6_qty_total: result[0].size6_qty_total,
                    size7_qty_total: result[0].size7_qty_total,
                    size8_qty_total: result[0].size8_qty_total,
                    size9_qty_total: result[0].size9_qty_total,
                    inventory_amount_total: result[0].inventory_amount_total,
                    amount: result[0].amount,
                    order_id: result[0].order_id,
                    ledger2_id: result[0].ledger2_id,
                    marketing_user_id: result[0].marketing_user_id,
                    ledger: result[0].ledger,
                    disc_total: result[0].disc_total,
                    delivery_address: result[0].delivery_address,
                    route_id: result[0].route_id,
                    vouno: result[0].vouno,
                    garments_invoice_inventory: [],

                }

                DBCON.query(sql1, match, function (err, result1) {

                    if (err) {
                        // console.log(err);
                        callback(err)
                    } else {
                        result1.map((item, index) => {
                            item.size_details = [];
                            if(index === result1.length - 1)
                            {
                                garments_invoice.garments_invoice_inventory = result1;
                                callback(false, garments_invoice);
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
        DBCON.query(`select garments_invoice.id,garments_invoice.inventory_qty_total,garments_invoice.vouno, DATE_FORMAT(garments_invoice.vou_date, '%d-%m-%Y') as vou_date, ledger.ledger from ${TABLE_NAME} left join ledger on ledger.id=garments_invoice.ledger_id  order by garments_invoice.id desc`, function (err, result) {

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

            var garments_invoice = {
                ledger_id: body.ledger_id,
                vou_date: getDBDate(body.vou_date),
                narration: body.narration,
                vehicle_no: body.vehicle_no,
                inventory_qty_total: body.inventory_qty_total,
                size1_qty_total: body.size1_qty_total,
                size2_qty_total: body.size2_qty_total,
                size3_qty_total: body.size3_qty_total,
                size4_qty_total: body.size4_qty_total,
                size5_qty_total: body.size5_qty_total,
                size6_qty_total: body.size6_qty_total,
                size7_qty_total: body.size7_qty_total,
                size8_qty_total: body.size8_qty_total,
                size9_qty_total: body.size9_qty_total,
                inventory_amount_total: body.inventory_amount_total,
                amount: body.amount,
                order_id: body.order_id,
                ledger2_id: body.ledger2_id,
                marketing_user_id: body.marketing_user_id,
                ledger: body.ledger,
                disc_total: body.disc_total,
                delivery_address: body.delivery_address,
                route_id: body.route_id,
                vouno: body.vouno,


            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [garments_invoice, body.id], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    // console.log(result);
                    DBCON.query(`delete from garments_invoice_inventory where vou_id = ?`, body.id, (err, deletedData) => {
                        if (err) {
                            callback(err)
                        } else {
                            if(body.garments_invoice_inventory.length > 0){

                                body.garments_invoice_inventory.map((item, index) => {
                                    if (item.selected) {
                                        var garments_invoice_inventory = {
                                            vou_id: body.id,
                                            color_id: item.color_id,
                                            size1_qty: item.size1_qty,
                                            size2_qty: item.size2_qty,
                                            size3_qty: item.size3_qty,
                                            size4_qty: item.size4_qty,
                                            size5_qty: item.size5_qty,
                                            size6_qty: item.size6_qty,
                                            size7_qty: item.size7_qty,
                                            size8_qty: item.size8_qty,
                                            size9_qty: item.size9_qty,
                                            rate: item.rate,
                                            amount: item.amount,
                                            product_id: item.product_id,
                                            outward_id: item.outward_id,
                                            qty: item.qty,
                                            size1_rate: item.size1_rate,
                                            size2_rate: item.size2_rate,
                                            size3_rate: item.size3_rate,
                                            size4_rate: item.size4_rate,
                                            size5_rate: item.size5_rate,
                                            size6_rate: item.size6_rate,
                                            size7_rate: item.size7_rate,
                                            size8_rate: item.size8_rate,
                                            size9_rate: item.size9_rate,
                                            narration: item.narration,
                                            refno: item.refno,
                                            disc_percentage: item.disc_percentage,
                                            disc_value: item.disc_value,
                                            description: item.description
                                        }
                                        DBCON.query(`insert into garments_invoice_inventory set ?`, garments_invoice_inventory);
                                        if (index === body.garments_invoice_inventory.length - 1) {
                                            callback(false, result, "Garments Invoice  Saved Successfully!");
                                        }
                                    } else {
                                        if (index === body.garments_invoice_inventory.length - 1) {
                                            callback(false, result, "Garments Invoice Updated Successfully!");
                                        }
                                    }
                                })
                            }else{
                                callback(false, result, "Garments Invoice Updated Successfully!");

                            }
                        }
                    })

                }
            })
        } else {

            var garments_invoice = {
                ledger_id: body.ledger_id,
                vou_date: getDBDate(body.vou_date),
                narration: body.narration,
                vehicle_no: body.vehicle_no,
                inventory_qty_total: body.inventory_qty_total,
                size1_qty_total: body.size1_qty_total,
                size2_qty_total: body.size2_qty_total,
                size3_qty_total: body.size3_qty_total,
                size4_qty_total: body.size4_qty_total,
                size5_qty_total: body.size5_qty_total,
                size6_qty_total: body.size6_qty_total,
                size7_qty_total: body.size7_qty_total,
                size8_qty_total: body.size8_qty_total,
                size9_qty_total: body.size9_qty_total,
                inventory_amount_total: body.inventory_amount_total,
                amount: body.amount,
                order_id: body.order_id,
                ledger2_id: body.ledger2_id,
                marketing_user_id: body.marketing_user_id,
                ledger: body.ledger,
                disc_total: body.disc_total,
                delivery_address: body.delivery_address,
                route_id: body.route_id,
                vouno: body.vouno,


            }
            DBCON.query(`insert into ${TABLE_NAME} set ?`, garments_invoice, (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    // console.log(result);
                    if(body.garments_invoice_inventory.length > 0){

                        for (index = 0; index < body.garments_invoice_inventory.length; index++) {
                            var item = body.garments_invoice_inventory[index];
                            // body.jobwork_invoice_inventory.map((item, index) => {
                            if (item.selected) {
                                // console.log(item, index)
                                var garments_invoice_inventory = {
                                    vou_id: result.insertId,
                                    color_id: item.color_id,
                                    size1_qty: item.size1_qty,
                                    size2_qty: item.size2_qty,
                                    size3_qty: item.size3_qty,
                                    size4_qty: item.size4_qty,
                                    size5_qty: item.size5_qty,
                                    size6_qty: item.size6_qty,
                                    size7_qty: item.size7_qty,
                                    size8_qty: item.size8_qty,
                                    size9_qty: item.size9_qty,
                                    rate: item.rate,
                                    amount: item.amount,
                                    product_id: item.product_id,
                                    outward_id: item.outward_id,
                                    qty: item.qty,
                                    size1_rate: item.size1_rate,
                                    size2_rate: item.size2_rate,
                                    size3_rate: item.size3_rate,
                                    size4_rate: item.size4_rate,
                                    size5_rate: item.size5_rate,
                                    size6_rate: item.size6_rate,
                                    size7_rate: item.size7_rate,
                                    size8_rate: item.size8_rate,
                                    size9_rate: item.size9_rate,
                                    narration: item.narration,
                                    refno: item.refno,
                                    disc_percentage: item.disc_percentage,
                                    disc_value: item.disc_value,
                                    description: item.description
                                }
                                DBCON.query(`insert into garments_invoice_inventory set ?`, garments_invoice_inventory);
                                if (index === body.garments_invoice_inventory.length - 1) {
                                    callback(false, result, "Garments Invoice Updated Successfully!");
                                }
                            } else {
                                if (index === body.garments_invoice_inventory.length - 1) {
                                    callback(false, result, "Garments Invoice Updated Successfully!");
                                }
                            }
                        }
                    }else{
                        callback(false, result, "Garments Invoice Updated Successfully!");

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
                DBCON.query(`delete from garments_invoice_inventory where vou_id = ?`, id, (err, result1) => {
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

    getNextGarmentsInvoiceVouNo: (callback) => {
        var query = 'select max(ifnull(vouno, 0)) + 1 as max_vou_no from garments_invoice';

        DBCON.query(query, (err, result) => {
            if (err) {
                // console.log(err);
                callback(err)
            } else {
                callback(false, result[0]);
            }
        })
    },
    getGarmentsInvoicePrint: (id, callback) => {
        if (issetNotEmpty(id)) {
            DBCON.query(`select * from garments_invoice where garments_invoice.id = ${id}`, (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    if (result.length > 0) {
                        // console.log('Got Invoice Data');
                        var invoice_details = result[0];
                        invoice_details.vou_date = getDBDate(invoice_details.vou_date)
                        DBCON.query(`select * from ledger where id = ${invoice_details.ledger_id}`, (err, ledger) => {
                            if (err) {
                                // console.log(err);
                                callback(err)
                            } else {
                                // console.log('Got Ledger Data');
                                invoice_details.ledger_details = ledger.length ? ledger[0] : {};
                                DBCON.query(`select * from company limit 1`, (err, company_data) => {
                                    if (err) {
                                        // console.log(err);
                                        callback(err)
                                    } else {
                                        // console.log('Got Company Data');
                                        invoice_details.company_details = company_data[0];
                                        DBCON.query(`select garments_invoice_inventory.*, product.product, product.hsnsac, product.gst, unit.unit,garments_invoice.inventory_amount_total,garments_invoice.inventory_amount_total as amount from garments_invoice_inventory left join product on product.id = garments_invoice_inventory.product_id left join garments_invoice on garments_invoice.id = garments_invoice_inventory.vou_id left join unit on unit.id = product.unit_id where vou_id = ${id}`, (err, inventories) => {
                                            if (err) {
                                                // console.log(err);
                                                callback(err);
                                            } else {
                                                if (inventories.length > 0) {
                                                    console.log('Got Inventory Data : ', inventories.length);
                                                    // for (i = 0; i < inventories.length; i++) {
                                                    for (const [i] in inventories) {
                                                        var item = Object.assign({}, inventories[i]);
                                                        // console.log(item);
                                                        item.size_data = [];
                                                        DBCON.query(`select concat(ifnull(size.size1, ""), ",", ifnull(size.size2, ""), ",",ifnull(size.size3, ""), ",",ifnull(size.size4, ""), ",",ifnull(size.size5, ""), ",",ifnull(size.size6, ""), ",",ifnull(size.size7, ""), ",",ifnull(size.size8, ""), ",",ifnull(size.size9, "")) as sizes from product_details left join size on size.id = product_details.size_id where product_details.product_id = ${inventories[i].product_id}`, (err, size_details) => {
                                                            if (err) {
                                                                // console.log(err);
                                                                callback(err);
                                                            } else {
                                                                var sizes = size_details.length > 0 ? size_details[0].sizes !== null ? size_details[0].sizes : `'','','','','','','','',''` : `'','','','','','','','',''`;
                                                                sizes = sizes.split(",");
                                                                // console.log(sizes);
                                                                inventories[i].size_data = sizes;
                                                                // console.log(Number(i), inventories.length);
                                                                if (Number(i) === inventories.length - 1) {
                                                                    invoice_details.inventories = inventories;
                                                                    // console.log("Finished")
                                                                    callback(false, invoice_details);
                                                                }
                                                            }
                                                        })
                                                    }
                                                } else {
                                                    // console.log('Got Inventory Data : ', 0);
                                                    invoice_details.inventories = [];
                                                    callback(false, invoice_details);
                                                }
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    } else {
                        callback("Invoice not found!")
                    }
                }
            })
        } else {
            callback("Invoice not found!")
        }
    }
}

module.exports = GarmentsInvoiceModel;