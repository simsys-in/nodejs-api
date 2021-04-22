const DBCON = require('../../db_config');
const {
    issetNotEmpty
} = require('../../helpers/common');
const moment = require('moment');
const {
    getDBDate
} = require('../../helpers/timer')

function Yarn_OutwardModel() {};

const TABLE_NAME = 'yarn_outward';

Yarn_OutwardModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM yarn_outward WHERE id = ?`;
        console.log(sql);

        let sql1 = `SELECT * FROM  yarn_outward_inventory where yarn_outward_inventory.vou_id = ?`;

        DBCON.query(sql, match, function (err, result) {
            if (err) {
                // throw err
                callback(err)
            } else {
                var yarn_outward = {
                    ledger_id: result[0].ledger_id,
                    vou_date: result[0].vou_date,
                    order_id: result[0].order_id,
                    narration: result[0].narration,
                    inventory_qty_kg_total: result[0].inventory_qty_kg_total,
                    from_process_id: result[0].from_process_id,
                    to_process_id: result[0].to_process_id,
                    vouno: result[0].vouno,
                    menu_id: result[0].menu_id,
                    vehicle_no: result[0].vehicle_no,
                    refno: result[0].refno,
                    yarn_outward_inventory: []
                }
                DBCON.query(sql1, match, function (err, result1) {
                    if (err) {
                        callback(err)
                    } else {
                        yarn_outward.yarn_outward_inventory = result1;
                        callback(false, yarn_outward)
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
        DBCON.query(`select  ${TABLE_NAME}.id, ledger.ledger, date_format(${TABLE_NAME}.vou_date, '%d-%m-%Y') as vou_date, order_program.order_no, ${TABLE_NAME}.narration, to_process.process as to_process, from_process.process as from_process,${TABLE_NAME}.vouno, ${TABLE_NAME}.refno from ${TABLE_NAME} left join ledger on ledger.id = yarn_outward.ledger_id  left join process from_process on from_process.id = yarn_outward.from_process_id left join process to_process on to_process.id = yarn_outward.to_process_id left join order_program on order_program.id = yarn_outward.order_id order by ${TABLE_NAME}.id desc `, function (err, result) {
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
            var yarn_outward = {
                ledger_id: body.ledger_id,
                vou_date: getDBDate(body.vou_date),
                order_id: body.order_id,
                narration: body.narration,
                inventory_qty_kg_total: body.inventory_qty_kg_total,
                from_process_id: body.from_process_id,
                to_process_id: body.to_process_id,
                vehicle_no: body.vehicle_no,
                vouno: body.vouno,
                menu_id: 0,
                refno: body.refno
            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [yarn_outward, body.id], (err, result) => {
                // if(key === body.yarn_outward.length - 1)
                if (err) {
                    callback(err)
                } else {
                    console.log(result)
                    DBCON.query('delete from yarn_outward_inventory where vou_id = ? ', body.id, (err, deleteData) => {
                        if (err) {
                            callback(err)
                        } else {
                            if(body.yarn_outward_inventory.length > 0){

                                body.yarn_outward_inventory.map((item, index) => {
                                    var yarn_outward_inventory = {
                                        // yarn_outward_id : result.insertId,
                                        vou_id: body.id,
                                        fabric_id: item.fabric_id,
                                        gsm: item.gsm,
                                        qty_kg: item.qty_kg,
                                        counts: item.counts,
                                        qty_bag: item.qty_bag,
                                        qtybag_per: item.qtybag_per,
                                    }
                                    DBCON.query(`insert into yarn_outward_inventory set ?`, yarn_outward_inventory);
                                    if (index === body.yarn_outward_inventory.length - 1) {
                                        callback(false, result, "Yarn outward Saved Successfully!");
                                    }
                                })
                            }else{
                                callback(false, result, "Yarn outward Saved Successfully!");

                            }
                        }
                    })

                }
            })
        } else {
            // console.log(body.name, "Entered")
            // body.created_at = new Date();
            // DBCON.query(`select count(id) as c from ${TABLE_NAME} where yarn_outward = ?`, [body.yarn_outward], (err, count) => {
            //     if (err) {
            //         callback(err)
            //     } else {
            //         // console.log("DB Query Success")
            //         if (count[0].c > 0) {
            //             callback("Yarn outward Name Already Found!")
            //         } else {
            var yarn_outward = {
                ledger_id: body.ledger_id,
                vou_date: getDBDate(body.vou_date),
                order_id: body.order_id,
                narration: body.narration,
                inventory_qty_kg_total: body.inventory_qty_kg_total,
                from_process_id: body.from_process_id,
                to_process_id: body.to_process_id,
                vehicle_no: body.vehicle_no,
                vouno: body.vouno,
                menu_id: 0,
                refno: body.refno
            }
            DBCON.query(`insert into ${TABLE_NAME} set ?`, yarn_outward, (err, result) => {
                // if(key === body.yarn_outward.length - 1)
                if (err) {
                    callback(err)
                } else {
                    console.log(result)
                    if(body.yarn_outward_inventory.length > 0){

                        body.yarn_outward_inventory.map((item, index) => {
                            var yarn_outward_inventory = {
                                // yarn_outward_id : result.insertId,
                                vou_id: result.insertId,
                                fabric_id: item.fabric_id,
                                gsm: item.gsm,
                                qty_kg: item.qty_kg,
                                counts: item.counts,
                                qty_bag: item.qty_bag,
                                qtybag_per: item.qtybag_per,
                            }
                            DBCON.query(`insert into yarn_outward_inventory set ?`, yarn_outward_inventory);
                            if (index === body.yarn_outward_inventory.length - 1) {
                                callback(false, result, "Yarn outward Saved Successfully!");
                            }
                        })
                    }else{
                        callback(false, result, "Yarn outward Saved Successfully!");

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
                DBCON.query(`delete from yarn_outward_inventory where vou_id = ?`, id, (err, result1) => {
                    if (err) {
                        callback(err)
                    } else {
                        callback(false, result1)
                    }
                })
            }
        })
    },
    getNextYarnOutwardVouNo: (callback) => {
        var query = 'select max(ifnull(vouno, 0)) + 1 as max_vou_no from yarn_outward';

        DBCON.query(query, (err, result) => {
            if (err) {
                console.log(err);
                callback(err)
            } else {
                callback(false, result[0]);
            }
        })
    },
    getYarnOutwardReport: (id, callback) => {
        var yarn_outward_details = {};
        const QUERY = `select yarn_outward.id, yarn_outward.vehicle_no, yarn_outward.vouno, yarn_outward.vou_date,process.process, order_program.order_no from yarn_outward left join process on process.id = yarn_outward.to_process_id left join order_program on order_program.id = yarn_outward.order_id where yarn_outward.id = ${id};`;

        DBCON.query(QUERY, (err, result) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                yarn_outward_details = result[0];


                const GET_INVENTORY_QUERY = `select yarn_outward_inventory.id, product.product, yarn_outward_inventory.gsm, yarn_outward_inventory.counts, yarn_outward_inventory.qtybag_per, yarn_outward_inventory.qty_bag, yarn_outward_inventory.qty_kg from yarn_outward_inventory left join product on product.id = yarn_outward_inventory.fabric_id where vou_id = ${id};`;

                DBCON.query(GET_INVENTORY_QUERY, (err, inventory) => {
                    if (err) {
                        console.log(err);
                        callback(err);
                    } else {
                        yarn_outward_details.inventory = inventory;

                        //total
                        const GET_INVENTORYTOTAL_QUERY = `select yarn_outward.inventory_qty_kg_total from yarn_outward where yarn_outward.id = ${id};`;

                        DBCON.query(GET_INVENTORYTOTAL_QUERY, (err, inventorytotal) => {
                            if (err) {
                                console.log(err);
                                callback(err);
                            } else {
                                yarn_outward_details.inventorytotal = inventorytotal;

                                //total


                                const GET_COMPANY_DETAILS = `select * from company limit 1`;
                                const GET_LEDGER_DETAILS = `select ledger.ledger, ledger.address, ledger.mobile, ledger.phone, ledger.gstno from yarn_outward left join ledger on yarn_outward.ledger_id = ledger.id where yarn_outward.id = ${id}`;
                                DBCON.query(GET_COMPANY_DETAILS, (err, company_details) => {
                                    if (err) {
                                        console.log(err);
                                        callback(err);

                                    } else {
                                        yarn_outward_details.company_details = company_details[0];
                                        DBCON.query(GET_LEDGER_DETAILS, (err, ledger_details) => {
                                            if (err) {
                                                console.log(err);
                                                callback(err);
                                            } else {
                                                yarn_outward_details.ledger_details = ledger_details[0];
                                                callback(false, yarn_outward_details);
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

module.exports = Yarn_OutwardModel;