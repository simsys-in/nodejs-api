
const DBCON = require('../../../db_config');
const {
    issetNotEmpty
} = require('../../../helpers/common');
const moment = require('moment');
const { getDBDate } = require('../../../helpers/timer')

function Jobwork_InwardModel() {};

const TABLE_NAME = 'jobwork_inward';

Jobwork_InwardModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM jobwork_inward WHERE id = ?`;
        console.log(sql);

        let sql1 = `SELECT * ,1 as selected FROM  jobwork_inward_inventory where jobwork_inward_inventory.vou_id = ?`;

        DBCON.query(sql, match, function (err, result) {
            if (err) {
                // throw err
                callback(err)
            } else {
                var jobwork_inward = {
                    ledger_id: result[0].ledger_id,
                    vou_date: result[0].vou_date,
                    narration: result[0].narration,
                    inventory_qty_total: result[0].inventory_qty_total,
                    size1_total: result[0].size1_total,
                    size2_total: result[0].size2_total,
                    size3_total: result[0].size3_total,
                    size4_total: result[0].size4_total,
                    size5_total: result[0].size5_total,
                    size6_total: result[0].size6_total,
                    size7_total: result[0].size7_total,
                    order_id: result[0].order_id,
                    process_id: result[0].process_id,
                    adas: result[0].adas,
                    size8_total: result[0].size8_total,
                    size9_total: result[0].size9_total,
                    vouno: result[0].vouno,
                    jobwork_inward_inventory: []
                }
                DBCON.query(sql1, match, function (err, result1) {
                    if (err) {
                        callback(err)
                    } else {
                        jobwork_inward.jobwork_inward_inventory = result1;
                        callback(false, jobwork_inward)
                    }
                })

                // })

            }


            // if (result.length) {
            //     callback(false,result);
            // } else {
            //     callback(false,null);
            // }
        });
    },
    getAll: function (callback) {
        DBCON.query(`select  ${TABLE_NAME}.id, ${TABLE_NAME}.vouno, ${TABLE_NAME}.inventory_qty_total, ledger.ledger, date_format(${TABLE_NAME}.vou_date, '%d-%m-%Y') as vou_date, order_program.order_no from ${TABLE_NAME} left join ledger on ledger.id = jobwork_inward.ledger_id left join order_program on order_program.id = jobwork_inward.order_id order by ${TABLE_NAME}.id desc `, function (err, result) {
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
            var jobwork_inward = {
                ledger_id: body.ledger_id,
                vou_date: getDBDate(body.vou_date),
                narration: body.narration,
                inventory_qty_total: body.inventory_qty_total,
                size1_total: body.size1_total,
                size2_total: body.size2_total,
                size3_total: body.size3_total,
                size4_total: body.size4_total,
                size5_total: body.size5_total,
                size6_total: body.size6_total,
                size7_total: body.size7_total,
                order_id: body.order_id,
                process_id: body.process_id,
                adas: body.adas,
                size8_total: body.size8_total,
                size9_total: body.size9_total,
                vouno: body.vouno,
            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [jobwork_inward, body.id], (err, result) => {
                // if(key === body.jobwork_inward.length - 1)
                if (err) {
                    callback(err)
                } else {
                    console.log(result)
                    DBCON.query('delete from jobwork_inward_inventory where vou_id = ? ', body.id, (err, deleteData) => {
                        if (err) {
                            callback(err)
                        } else {
                            if(body.jobwork_inward_inventory.length > 0){

                                for (index = 0; index < body.jobwork_inward_inventory.length; index++) {
                                    var item = body.jobwork_inward_inventory[index];
                                    // body.jobwork_inward_inventory.map((item, index) => {
                                    console.log(item)
                                    if (item.selected) {
                                        // body.jobwork_inward_inventory.map((item, index) => {
                                        var jobwork_inward_inventory = {
                                            // jobwork_inward_id : result.insertId,
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
                                        }
                                        DBCON.query(`insert into jobwork_inward_inventory set ?`, jobwork_inward_inventory);
                                    }
                                    if (index === body.jobwork_inward_inventory.length - 1) {
                                        callback(false, result, "Jobwork inward Saved Successfully!");
                                    }
    
                                    //  }
                                }
                            }else{
                                callback(false, result, "Jobwork inward Saved Successfully!");

                            }
                        }
                    })

                }
            })
        } else {

            var jobwork_inward = {
                ledger_id: body.ledger_id,
                vou_date: getDBDate(body.vou_date),
                narration: body.narration,
                inventory_qty_total: body.inventory_qty_total,
                size1_total: body.size1_total,
                size2_total: body.size2_total,
                size3_total: body.size3_total,
                size4_total: body.size4_total,
                size5_total: body.size5_total,
                size6_total: body.size6_total,
                size7_total: body.size7_total,
                order_id: body.order_id,
                process_id: body.process_id,
                adas: body.adas,
                size8_total: body.size8_total,
                size9_total: body.size9_total,
                vouno: body.vouno,
            }
            DBCON.query(`insert into ${TABLE_NAME} set ?`, jobwork_inward, (err, result) => {
                // if(key === body.jobwork_inward.length - 1)
                if (err) {
                    callback(err)
                } else {
                    console.log(result)
                    if(body.jobwork_inward_inventory.length > 0){

                        body.jobwork_inward_inventory.map((item, index) => {
                            if (item.selected) {
                                var jobwork_inward_inventory = {
                                    // jobwork_inward_id : result.insertId,
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
    
                                }
                                DBCON.query(`insert into jobwork_inward_inventory set ?`, jobwork_inward_inventory);
                            }
                            if (index === body.jobwork_inward_inventory.length - 1) {
                                callback(false, result, "Jobwork inward Saved Successfully!");
                            }
                            // }
                        })
                    }else{
                        callback(false, result, "Jobwork inward Saved Successfully!");

                    }
                }
            })
        }
    },
    //         })
    //     }
    // },
    delete: function (id, callback) {
        DBCON.query(`delete from ${TABLE_NAME} where id = ?`, id, (err, result) => {
            if (err) {
                callback(err)
            } else {
                DBCON.query(`delete from jobwork_inward_inventory where vou_id = ?`, id, (err, result1) => {
                    if (err) {
                        callback(err)
                    } else {
                        callback(false, result1)
                    }
                })
            }
        })
    },

    getNextJobworkInwardVouNo: (callback) => {
        var query = 'select max(ifnull(vouno, 0)) + 1 as max_vou_no from jobwork_inward';

        DBCON.query(query, (err, result) => {
            if (err) {
                console.log(err);
                callback(err)
            } else {
                callback(false, result[0]);
            }
        })
    },
    getJobworkInwardReport: (id, callback) => {
        var jobwork_inward_details = {};
        const QUERY = `select jobwork_inward.id, 'Test' as dcno, jobwork_inward.vou_date, process.process, product.hsnsac, order_program.order_no, order_program.id as order_id, product.product, jobwork_inward.inventory_qty_total,jobwork_inward.size1_total, jobwork_inward.size2_total, jobwork_inward.size3_total, jobwork_inward.size4_total, jobwork_inward.size5_total, jobwork_inward.size6_total, jobwork_inward.size7_total, jobwork_inward.size8_total, jobwork_inward.size9_total  from jobwork_inward left join order_program on order_program.id = jobwork_inward.order_id left join product on product.id = order_program.style_id left join process on process.id = jobwork_inward.process_id where jobwork_inward.id = ${id};`;

        DBCON.query(QUERY, (err, result) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                jobwork_inward_details = result[0];
                const ORDER_ID = jobwork_inward_details.order_id;
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
                        jobwork_inward_details.color_size_details = sizes;

                        const GET_COLOR_DETAILS_QUERY = `select color.color, jobwork_inward_inventory.size1,jobwork_inward_inventory.size2,jobwork_inward_inventory.size3,jobwork_inward_inventory.size4,jobwork_inward_inventory.size5,jobwork_inward_inventory.size6,jobwork_inward_inventory.size7,jobwork_inward_inventory.size8, jobwork_inward_inventory.size9, jobwork_inward_inventory.qty from jobwork_inward_inventory left join color on color.id = jobwork_inward_inventory.color_id where vou_id = ${id};`;

                        DBCON.query(GET_COLOR_DETAILS_QUERY, (err, color_details) => {
                            if (err) {
                                console.log(err);
                                callback(err);
                            } else {
                                jobwork_inward_details.color_details = color_details;

                                // const GET_ACCESSORIES_QUERY = `select product.product, jobwork_inward_product.qty, unit.unit  from jobwork_inward_product left join product on product.id = jobwork_inward_product.product_id left join unit on unit.id = product.unit_id where vou_id = ${id};`;

                                // DBCON.query(GET_ACCESSORIES_QUERY, (err, accessories) => {
                                //     if (err) {
                                //         console.log(err);
                                //         callback(err);
                                //     } else {
                                //         jobwork_outward_details.accessories = accessories;

                                const GET_COMPANY_DETAILS = `select * from company limit 1`;
                                const GET_LEDGER_DETAILS = `select ledger.ledger, ledger.address, ledger.mobile, ledger.phone, ledger.gstno from jobwork_inward left join ledger on jobwork_inward.ledger_id = ledger.id where jobwork_inward.id = ${id}`;
                                DBCON.query(GET_COMPANY_DETAILS, (err, company_details) => {
                                    if (err) {
                                        console.log(err);
                                        callback(err);

                                    } else {
                                        jobwork_inward_details.company_details = company_details[0];
                                        DBCON.query(GET_LEDGER_DETAILS, (err, ledger_details) => {
                                            if (err) {
                                                console.log(err);
                                                callback(err);
                                            } else {
                                                jobwork_inward_details.ledger_details = ledger_details[0];
                                                callback(false, jobwork_inward_details);
                                            }
                                        });
                                    }
                                });
                                //     }
                                // });

                            }
                        })
                    }
                })

            }
        })
    },
}

module.exports = Jobwork_InwardModel;