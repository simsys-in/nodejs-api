
const DBCON = require('../../../db_config');
const {
    issetNotEmpty
} = require('../../../helpers/common');

const { getDBDate, getDBDateTime } = require('../../../helpers/timer');

function OrderProgramModel() {};

const TABLE_NAME = 'order_program';

OrderProgramModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM order_program WHERE id = ?`;
        // console.log(sql);

        let sql1 = `SELECT * FROM order_process WHERE order_process.order_id = ?`;

        let sql2 = `SELECT * FROM order_fabric WHERE order_fabric.order_id = ?`;

        DBCON.query(sql, match, function (err, result) {

            if (err) {
                // throw err
                callback(err)
            } else {
                var order_program = {
                    order_no: result[0].order_no,
                    due_date: getDBDateTime(result[0].due_date),
                    orderDate: getDBDateTime(result[0].vou_date),
                    size_id: result[0].size_id,
                    style_id: result[0].style_id,
                    status_id: result[0].status_id,
                    ledger_id: result[0].ledger_id,
                    // fabric_id : result[0].fabric_id,
                    // dia : result[0].dia,
                    gsm: result[0].gsm,
                    product_id: 0,
                    menu: 0,
                    order_process: [],
                    order_fabric: []

                }
                DBCON.query(sql1, match, function (err, result1) {
                    if (err) {
                        callback(err)
                    } else {
                        order_program.order_process = result1;
                        DBCON.query(sql2, match, function (err, result2) {
                            if (err) {
                                callback(err)
                            } else {
                                order_program.order_fabric = result2;
                                callback(false, order_program);
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
        DBCON.query(`select *,DATE_FORMAT(due_date, '%d-%m-%Y') as due_date, DATE_FORMAT(vou_date, '%d-%m-%Y') as vou_date from ${TABLE_NAME} order by ${TABLE_NAME}.id desc`, function (err, result) {

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
            var order_details = {
                order_no: body.order_no,
                due_date: getDBDate(body.due_date),
                vou_date: getDBDate(body.orderDate),
                size_id: body.size_id,
                style_id: body.style_id,
                status_id: body.status_id,
                ledger_id: body.ledger_id ? body.ledger_id : 0,
                product_id: 0,
                // dia : body.dia,
                gsm: 0,
                menu_id: 0,

            }

            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [order_details, body.id], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    // console.log(result);
                    DBCON.query(`delete from order_process where order_id = ?`, body.id, (err, deletedData) => {
                        if (err) {
                            callback(err)
                        } else {
                            DBCON.query(`delete from order_fabric where order_id = ?`, body.id, (err, deletedData) => {
                                if (err) {
                                    callback(err)
                                } else {
                                    if (body.order_process.length > 0) {

                                        body.order_process.map((item, index) => {
                                            var order_process = {
                                                order_id: body.id,
                                                process_id: item.process_id,
                                                ledger_id: item.ledger_id,
                                                rate: item.rate,
                                                waste: item.waste,
                                            }
    
                                            DBCON.query(`insert into order_process set ?`, order_process);
                                            if (index === body.order_process.length - 1) {
                                                if(body.order_fabric.length > 0){

                                                    body.order_fabric.map((fabric, key) => {
                                                        var order_fabric = {
                                                            order_id: body.id,
                                                            fabric_id: fabric.fabric_id,
                                                            dia: fabric.dia,
                                                            gsm: fabric.gsm
                                                        }
        
                                                        DBCON.query(`insert into order_fabric set ?`, order_fabric);
        
                                                        if (key === body.order_fabric.length - 1) {
                                                            callback(false, result, "Order Program  Saved Successfully!");
                                                        }
                                                    })
                                                }else{
                                                    callback(false, result, "Order Program  Saved Successfully!");

                                                }
                                            }
    
                                        })
                                    }else{
                                        callback(false, result, "Order Program  Saved Successfully!");

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
            var order_details = {
                order_no: body.order_no,
                due_date: getDBDate(body.due_date),
                vou_date: getDBDate(body.orderDate),
                size_id: body.size_id,
                style_id: body.style_id,
                status_id: body.status_id,
                ledger_id: body.ledger_id ? body.ledger_id : 0,
                product_id: 0,
                // dia : body.dia,
                gsm: 0,
                menu_id: 0,

            }

            DBCON.query(`insert into ${TABLE_NAME} set ?`, order_details, (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    // console.log(result);
                    if(body.order_process.length > 0){

                        body.order_process.map((item, index) => {
                            var order_process = {
                                order_id: result.insertId,
                                process_id: item.process_id,
                                ledger_id: item.ledger_id,
                                rate: item.rate,
                                waste: item.waste,
                            }
                            DBCON.query(`insert into order_process set ?`, order_process);
                            if (index === body.order_process.length - 1) {
                                if(body.order_fabric.length > 0){

                                    body.order_fabric.map((fabric, key) => {
                                        var order_fabric = {
                                            order_id: result.insertId,
                                            fabric_id: fabric.fabric_id,
                                            dia: fabric.dia,
                                            gsm: fabric.gsm
                                        }
        
                                        DBCON.query(`insert into order_fabric set ?`, order_fabric);
        
                                        if (key === body.order_fabric.length - 1) {
                                            callback(false, result, "Order Program  Saved Successfully!");
                                        }
                                    })
                                }else{
                                    callback(false, result, "Order Program  Saved Successfully!");

                                }
                            }
                        })
                    }else{
                        callback(false, result, "Order Program  Saved Successfully!");

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
                DBCON.query(`delete from order_process where order_id = ?`, id, (err, result1) => {
                    if (err) {
                        callback(err)
                    } else {
                        DBCON.query(`delete from order_fabric where order_id = ?`, id, (err, result2) => {
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
    getNextOrderNo: (callback) => {
        var query = `select max(ifnull(order_no, 0)) + 1 as max_order_no from ${TABLE_NAME}`;

        DBCON.query(query, (err, result) => {
            if (err) {
                // console.log(err);
                callback(err)
            } else {
                callback(false, result[0]);
            }
        })
    },
    getStyleForOrderId: (order_id, callback) => {
        DBCON.query(`select style_id from ${TABLE_NAME} where id = ${order_id}`, (err, result) => {
            if (err) {
                // console.log(err);
                callback(err);
            } else {
                var style_id = result && result[0] && result[0].style_id ? result[0].style_id : null;
                callback(err, style_id);
            }
        })
    },
   
    getOrderProgramReport: (id, callback) => {
        var order_program_details = {};
        const QUERY = `select order_program.id,order_program.vou_date,order_program.due_date, order_program.order_no,order_program.style_id, size.size from order_program left join size on size.id = order_program.size_id where order_program.id = ${id};`;

        DBCON.query(QUERY, (err, result) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                order_program_details = result[0];
                const ORDER_ID = order_program_details.order_id;
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
                //         jobwork_outward_details.color_size_details = sizes;

                        const GET_COLOR_DETAILS_QUERY = `select jobwork_inward.ledger_id,jobwork_inward.process_id,jobwork_inward.inventory_qty_total,jobwork_inward.inventory_qty_total as received_qty, jobwork_inward_inventory.color_id, jobwork_inward_inventory.size1, jobwork_inward_inventory.size2,jobwork_inward_inventory.size3,jobwork_inward_inventory.size4,jobwork_inward_inventory.size5,jobwork_inward_inventory.size6,jobwork_inward_inventory.size7,jobwork_inward_inventory.size8,jobwork_inward_inventory.size9,jobwork_outward.from_process_id,jobwork_outward.to_process_id,jobwork_outward.ledger_id,jobwork_outward.inventory_qty_total,jobwork_outward.inventory_qty_total as delivery_qty, jobwork_outward_inventory.color_id, jobwork_outward_inventory.size1, jobwork_outward_inventory.size2,jobwork_outward_inventory.size3,jobwork_outward_inventory.size4,jobwork_outward_inventory.size5,jobwork_outward_inventory.size6,jobwork_outward_inventory.size7,jobwork_outward_inventory.size8,jobwork_outward_inventory.size9 from jobwork_outward left join jobwork_outward_inventory on jobwork_outward_inventory.vou_id = jobwork_outward.id left join jobwork_inward on jobwork_inward.process_id = jobwork_outward.to_process_id and jobwork_inward.ledger_id = jobwork_outward.ledger_id left join jobwork_inward_inventory on jobwork_inward_inventory.vou_id = jobwork_inward.id where jobwork_outward.order_id = ${id};`;

                        DBCON.query(GET_COLOR_DETAILS_QUERY, (err, color_details) => {
                            if (err) {
                                // console.log(err);
                                callback(err);
                            } else {
                                order_program_details.color_details = color_details;

                                // const GET_ACCESSORIES_QUERY = `select product.product, jobwork_outward_product.qty, unit.unit  from jobwork_outward_product left join product on product.id = jobwork_outward_product.product_id left join unit on unit.id = product.unit_id where vou_id = ${id};`;

                                // DBCON.query(GET_ACCESSORIES_QUERY, (err, accessories) => {
                                //     if (err) {
                                //         console.log(err);
                                //         callback(err);
                                //     } else {
                                //         jobwork_outward_details.accessories = accessories;

                                        const GET_COMPANY_DETAILS = `select * from company limit 1`;
                                        const GET_LEDGER_DETAILS = `select ledger.ledger, ledger.address, ledger.mobile, ledger.phone, ledger.gstno from fabric_inward left join ledger on fabric_inward.ledger_id = ledger.id where fabric_inward.id = ${id}`;
                                        DBCON.query(GET_COMPANY_DETAILS, (err, company_details) => {
                                            if (err) {
                                                // console.log(err);
                                                callback(err);

                                            } else {
                                                order_program_details.company_details = company_details[0];
                                                DBCON.query(GET_LEDGER_DETAILS, (err, ledger_details) => {
                                                    if (err) {
                                                        // console.log(err);
                                                        callback(err);
                                                    } else {
                                                        order_program_details.ledger_details = ledger_details[0];
                                                        callback(false, order_program_details);
                                                    }
                                                });
                                            }
                                        });
                                    }
                            //     });

                            // }
                        })
                    }
            //     })

            // }
        })
    },


}

module.exports = OrderProgramModel;