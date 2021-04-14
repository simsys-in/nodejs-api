
const DBCON = require('../../db_config');
const {
    issetNotEmpty
} = require('../../helpers/common');

const moment = require('moment');
const e = require('express');

function JobworkOutwardModel() {};

const TABLE_NAME = 'jobwork_outward';

JobworkOutwardModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM jobwork_outward WHERE id = ?`;
        console.log(sql);

        let sql1 = `SELECT *, 1 as selected FROM jobwork_outward_inventory WHERE jobwork_outward_inventory.vou_id = ?`;

        let sql2 = `SELECT * FROM jobwork_outward_product WHERE jobwork_outward_product.vou_id = ?`;

        DBCON.query(sql, match, function (err, result) {

            if (err) {
                // throw err
                console.log(err);
                callback(err)
            } else {
                var jobwork_outward = {
                    ledger_id: result[0].ledger_id,
                    vou_date: result[0].vou_date,
                    vouno:result[0].vouno,
                    narration: result[0].narration,
                    inventory_qty_total: result[0].inventory_qty_total,
                    size1_total: result[0].size1_total,
                    size2_total: result[0].size2_total,
                    size3_total: result[0].size3_total,
                    size4_total: result[0].size4_total,
                    size5_total: result[0].size5_total,
                    size6_total: result[0].size6_total,
                    size7_total: result[0].size7_total,
                    size8_total: result[0].size8_total,
                    size9_total: result[0].size9_total,
                    vehicle_no : result[0].vehicle_no,
                    order_id: result[0].order_id,
                    from_process_id: result[0].from_process_id,
                    to_process_id: result[0].to_process_id,
                    product_id: 0,
                    jobwork_outward_inventory: [],
                    jobwork_outward_product: []

                }
                DBCON.query(sql1, match, function (err, result1) {
                    if (err) {
                        console.log(err);
                        callback(err)
                    } else {
                        jobwork_outward.jobwork_outward_inventory = result1;
                        DBCON.query(sql2, match, function (err, result2) {
                            if (err) {
                                console.log(err);
                                callback(err)
                            } else {
                                jobwork_outward.jobwork_outward_product = result2;
                                callback(false, jobwork_outward);
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
        DBCON.query(`select jobwork_outward.id,jobwork_outward.vouno,jobwork_outward.inventory_qty_total, DATE_FORMAT(jobwork_outward.vou_date, '%d-%m-%Y') as vou_date, order_program.order_no, ledger.ledger from ${TABLE_NAME} left join ledger on ledger.id=jobwork_outward.ledger_id left join order_program on order_program.id = jobwork_outward.order_id order by jobwork_outward.id desc`, function (err, result) {

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
            var jobwork_outward = {
                ledger_id: body.ledger_id,
                vou_date: body.vou_date,
                vouno : body.vouno,
                narration: body.narration,
                inventory_qty_total: body.inventory_qty_total,
                size1_total: body.size1_total,
                size2_total: body.size2_total,
                size3_total: body.size3_total,
                size4_total: body.size4_total,
                size5_total: body.size5_total,
                size6_total: body.size6_total,
                size7_total: body.size7_total,
                size8_total: body.size8_total,
                size9_total: body.size9_total,
                vehicle_no : body.vehicle_no,
                order_id: body.order_id,
                from_process_id: body.from_process_id,
                to_process_id: body.to_process_id,
                product_id: body.product_id,

            }

            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [jobwork_outward, body.id], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    console.log(result);
                    DBCON.query(`delete from jobwork_outward_inventory where vou_id = ?`, body.id, (err, deletedData) => {
                        if (err) {
                            callback(err)
                        } else {
                            DBCON.query(`delete from jobwork_outward_product where vou_id = ?`, body.id, (err, deletedData) => {
                                if (err) {
                                    callback(err)
                                } else {
                                    // for (const [index, item] in body.jobwork_outward_inventory) {
                                    for (index = 0; index < body.jobwork_outward_inventory.length; index++) {
                                        var item = body.jobwork_outward_inventory[index];
                                        // body.jobwork_outward_inventory.map((item, index) => {
                                        console.log(item)
                                        if (item.selected) {
                                            var jobwork_outward_inventory = {
                                                vou_id: body.id,
                                                color_id: item.color_id,
                                                size1: item.size1,
                                                size2: item.size2,
                                                size3: item.size3,
                                                size4: item.size4,
                                                size5: item.size5,
                                                size6: item.size6,
                                                size7: item.size7,
                                                size8: item.size8,
                                                size9: item.size9,
                                                qty: item.qty,
                                                inward_inv_id: item.inward_inv_id
                                            }

                                            DBCON.query(`insert into jobwork_outward_inventory set ?`, jobwork_outward_inventory);
                                            if (index === body.jobwork_outward_inventory.length - 1) {
                                                body.jobwork_outward_product.map((jobworkproduct, key) => {
                                                    var jobwork_outward_product = {
                                                        product_id: jobworkproduct.product_id,
                                                        qty: jobworkproduct.qty,
                                                        vou_id: body.id
                                                    }

                                                    DBCON.query(`insert into jobwork_outward_product set ?`, jobwork_outward_product);

                                                    if (key === body.jobwork_outward_product.length - 1) {
                                                        callback(false, result, "Jobwork Outward  Updated Successfully!");
                                                    }
                                                })
                                            }
                                        } else {
                                            console.log(index, body.jobwork_outward_inventory.length - 1)
                                            if (index === body.jobwork_outward_inventory.length - 1) {
                                                callback(false, result, "Jobwork Outward  Updated Successfully!");
                                            }
                                        }
                                    }
                                }
                            })
                        }
                    })

                }
            })
        } else {
            // DBCON.query(`select count(id) as c from ${TABLE_NAME} where order_program = ?`, [body.order_no], (err, count) => {
            //     if (err) {
            //         callback(err)
            //     } else {
            //         // console.log("DB Query Success")
            //         if (count[0].c > 0) {
            //             callback("Order Program Name Already Found!")
            //         } else {
            var jobwork_outward = {
                ledger_id: body.ledger_id,
                vou_date: body.vou_date,
                vouno :body.vouno,
                narration: body.narration,
                inventory_qty_total: body.inventory_qty_total,
                size1_total: body.size1_total,
                size2_total: body.size2_total,
                size3_total: body.size3_total,
                size4_total: body.size4_total,
                size5_total: body.size5_total,
                size6_total: body.size6_total,
                size7_total: body.size7_total,
                size8_total: body.size8_total,
                size9_total: body.size9_total,
                vehicle_no : body.vehicle_no,

                order_id: body.order_id,
                from_process_id: body.from_process_id,
                to_process_id: body.to_process_id,
                product_id: body.product_id
            }


            DBCON.query(`insert into ${TABLE_NAME} set ?`, jobwork_outward, (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    console.log(result);
                    body.jobwork_outward_inventory.map((item, index) => {
                        if (item.selected && issetNotEmpty(item.color_id) ) {
                            var jobwork_outward_inventory = {
                                vou_id: result.insertId,
                                color_id: item.color_id,
                                size1: item.size1,
                                size2: item.size2,
                                size3: item.size3,
                                size4: item.size4,
                                size5: item.size5,
                                size6: item.size6,
                                size7: item.size7,
                                size8: item.size8,
                                size9: item.size9,
                                qty: item.qty,
                                inward_inv_id: item.inward_inv_id
                            }
                            DBCON.query(`insert into jobwork_outward_inventory set ?`, jobwork_outward_inventory);
                            if (index === body.jobwork_outward_product.length - 1) {
                                body.jobwork_outward_product.map((jobworkproduct, key) => {
                                    var jobwork_outward_product = {
                                        vou_id: result.insertId,
                                        product_id: jobworkproduct.product_id,
                                        qty: jobworkproduct.qty
                                    }

                                    DBCON.query(`insert into jobwork_outward_product set ?`, jobwork_outward_product);

                                    if (key === body.jobwork_outward_product.length - 1) {
                                        callback(false, result, "Jobwork Outward  Saved Successfully!");
                                    }
                                })
                            }
                        }
                    })

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
                DBCON.query(`delete from jobwork_outward_inventory where vou_id = ?`, id, (err, result1) => {
                    if (err) {
                        callback(err)
                    } else {
                        DBCON.query(`delete from jobwork_outward_product where vou_id = ?`, id, (err, result2) => {
                            if (err) {
                                callback(err)
                            } else {
                                callback(false, result2)
                            }
                        })
                    }
                })
            }
        })
    },
    getJobworkOutwardReport: (id, callback) => {
        var jobwork_outward_details = {};
        const QUERY = `select jobwork_outward.id, 'Test' as dcno, jobwork_outward.vou_date, process.process, product.hsnsac, order_program.order_no, order_program.id as order_id, jobwork_outward.vehicle_no, product.product from jobwork_outward left join order_program on order_program.id = jobwork_outward.order_id left join product on product.id = order_program.style_id left join process on process.id = jobwork_outward.to_process_id where jobwork_outward.id = ${id};`;

        DBCON.query(QUERY, (err, result) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                jobwork_outward_details = result[0];
                const ORDER_ID = jobwork_outward_details.order_id;
                const GET_COLOR_SIZE_DETAILS_QUERY = `select concat(size.size1, ",", size.size2, ",",size.size3, ",",size.size4, ",",size.size5, ",",size.size6, ",",size.size7, ",",size.size8, ",",size.size9) as sizes from order_program left join size on size.id = order_program.size_id where order_program.id = ${ORDER_ID};`;

                DBCON.query(GET_COLOR_SIZE_DETAILS_QUERY, (err, color_size_details) => {
                    if (err) {
                        console.log(err);
                        callback(err)
                    } else {
                        var sizes = color_size_details.length > 0 ? color_size_details[0].sizes !== null ? color_size_details[0].sizes : "" : "";
                        console.log(sizes);
                        sizes = sizes.split(",");
                        // res.sendInfo("", sizes);
                        jobwork_outward_details.color_size_details = sizes;

                        const GET_COLOR_DETAILS_QUERY = `select color.color, jobwork_outward_inventory.size1,jobwork_outward_inventory.size2,jobwork_outward_inventory.size3,jobwork_outward_inventory.size4,jobwork_outward_inventory.size5,jobwork_outward_inventory.size6,jobwork_outward_inventory.size7,jobwork_outward_inventory.size8, jobwork_outward_inventory.size9, jobwork_outward_inventory.qty from jobwork_outward_inventory left join color on color.id = jobwork_outward_inventory.color_id where vou_id = ${id};`;

                        DBCON.query(GET_COLOR_DETAILS_QUERY, (err, color_details) => {
                            if (err) {
                                console.log(err);
                                callback(err);
                            } else {
                                jobwork_outward_details.color_details = color_details;

                                const GET_ACCESSORIES_QUERY = `select product.product, jobwork_outward_product.qty, unit.unit  from jobwork_outward_product left join product on product.id = jobwork_outward_product.product_id left join unit on unit.id = product.unit_id where vou_id = ${id};`;

                                DBCON.query(GET_ACCESSORIES_QUERY, (err, accessories) => {
                                    if (err) {
                                        console.log(err);
                                        callback(err);
                                    } else {
                                        jobwork_outward_details.accessories = accessories;

                                        const GET_COMPANY_DETAILS = `select * from company limit 1`;
                                        const GET_LEDGER_DETAILS = `select ledger.ledger, ledger.delivery_address, ledger.mobile, ledger.phone, ledger.gstno from jobwork_outward left join ledger on jobwork_outward.ledger_id = ledger.id where jobwork_outward.id = ${id}`;
                                        DBCON.query(GET_COMPANY_DETAILS, (err, company_details) => {
                                            if (err) {
                                                console.log(err);
                                                callback(err);

                                            } else {
                                                jobwork_outward_details.company_details = company_details[0];
                                                DBCON.query(GET_LEDGER_DETAILS, (err, ledger_details) => {
                                                    if (err) {
                                                        console.log(err);
                                                        callback(err);
                                                    } else {
                                                        jobwork_outward_details.ledger_details = ledger_details[0];
                                                        callback(false, jobwork_outward_details);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });

                            }
                        })
                    }
                })

            }
        })
    },
    // })
    // }

    getNextJobworkOutwardVouNo : (callback) => {
        var query = 'select max(ifnull(vouno, 0)) + 1 as max_vou_no from jobwork_outward';

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

module.exports = JobworkOutwardModel;