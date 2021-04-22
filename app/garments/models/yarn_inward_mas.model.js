const DBCON = require('../../db_config');
const {
    issetNotEmpty
} = require('../../helpers/common');
const moment = require('moment');
const {
    getDBDate
} = require('../../helpers/timer')

function Yarn_InwardModel() {};

const TABLE_NAME = 'yarn_inward';
Yarn_InwardModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM yarn_inward WHERE id = ?`;
        console.log(sql);

        let sql1 = `SELECT *,1 as selected FROM  yarn_inward_inventory where yarn_inward_inventory.vou_id = ? order by id `;

        DBCON.query(sql, match, function (err, result) {
            if (err) {
                // throw err
                callback(err)
            } else {
                var yarn_inward = {
                    ledger_id: result[0].ledger_id,
                    vou_date: result[0].vou_date,
                    order_id: result[0].order_id,
                    narration: result[0].narration,
                    inventory_qty_kg_total: result[0].inventory_qty_kg_total,
                    process_id: result[0].process_id,
                    vouno: result[0].vouno,
                    refno: result[0].refno,
                    menu_id: result[0].menu_id,
                    yarn_inward_inventory: []
                }
                DBCON.query(sql1, match, function (err, result1) {
                    if (err) {
                        callback(err)
                    } else {
                        yarn_inward.yarn_inward_inventory = result1;
                        callback(false, yarn_inward)
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
        DBCON.query(`select  ${TABLE_NAME}.id, ledger.ledger, date_format(${TABLE_NAME}.vou_date, '%d-%m-%Y') as vou_date, order_program.order_no, ${TABLE_NAME}.narration, process.process,${TABLE_NAME}.vouno, ${TABLE_NAME}.refno from ${TABLE_NAME} left join ledger on ledger.id = yarn_inward.ledger_id  left join process on process.id = yarn_inward.process_id left join order_program on order_program.id = yarn_inward.order_id order by ${TABLE_NAME}.id desc `, function (err, result) {
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
            var yarn_inward = {
                ledger_id: body.ledger_id,
                vou_date: getDBDate(body.vou_date),
                order_id: body.order_id,
                narration: body.narration,
                inventory_qty_kg_total: body.inventory_qty_kg_total,
                process_id: body.process_id,
                vouno: body.vouno,
                refno: body.refno,
                menu_id: 0
            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [yarn_inward, body.id], (err, result) => {
                // if(key === body.yarn_inward.length - 1)
                if (err) {
                    callback(err)
                } else {
                    console.log(result)
                    DBCON.query('delete from yarn_inward_inventory where vou_id = ? ', body.id, (err, deleteData) => {
                        if (err) {
                            callback(err)
                        } else {
                            if(body.yarn_inward_inventory.length > 0){

                                body.yarn_inward_inventory.map((item, index) => {
                                    if (item.selected && issetNotEmpty(item.fabric_id) && item.fabric_id !== 0) {
    
                                        var yarn_inward_inventory = {
                                            // yarn_inward_id : result.insertId,
                                            vou_id: body.id,
                                            fabric_id: item.fabric_id,
                                            gsm: item.gsm,
                                            qty_kg: item.qty_kg,
                                            counts: item.counts,
                                            qty_bag: item.qty_bag,
                                            qtybag_per: item.qtybag_per,
                                        }
                                        DBCON.query(`insert into yarn_inward_inventory set ?`, yarn_inward_inventory);
                                    }
                                    if (index === body.yarn_inward_inventory.length - 1) {
                                        callback(false, result, "Yarn inward Saved Successfully!");
                                    }
                                    // }
    
                                })
                            }else{
                                callback(false, result, "Yarn inward Saved Successfully!");

                            }
                        }
                    })

                }
            })
        } else {
            // console.log(body.name, "Entered")
            // body.created_at = new Date();
            // DBCON.query(`select count(id) as c from ${TABLE_NAME} where yarn_inward = ?`, [body.yarn_inward], (err, count) => {
            //     if (err) {
            //         callback(err)
            //     } else {
            //         // console.log("DB Query Success")
            //         if (count[0].c > 0) {
            //             callback("Yarn inward Name Already Found!")
            //         } else {
            var yarn_inward = {
                ledger_id: body.ledger_id,
                vou_date: getDBDate(body.vou_date),
                order_id: body.order_id,
                narration: body.narration,
                inventory_qty_kg_total: body.inventory_qty_kg_total,
                process_id: body.process_id,
                vouno: body.vouno,
                refno: body.refno,
                menu_id: 0
            }
            DBCON.query(`insert into ${TABLE_NAME} set ?`, yarn_inward, (err, result) => {
                // if(key === body.yarn_inward.length - 1)
                if (err) {
                    callback(err)
                } else {
                    console.log(result)
                    if(body.yarn_inward_inventory.length > 0){

                        body.yarn_inward_inventory.map((item, index) => {
                            if (item.selected && issetNotEmpty(item.fabric_id) && item.fabric_id !== 0) {
    
                                var yarn_inward_inventory = {
                                    // yarn_inward_id : result.insertId,
                                    vou_id: result.insertId,
                                    fabric_id: item.fabric_id,
                                    gsm: item.gsm,
                                    qty_kg: item.qty_kg,
                                    counts: item.counts,
                                    qty_bag: item.qty_bag,
                                    qtybag_per: item.qtybag_per,
                                }
                                DBCON.query(`insert into yarn_inward_inventory set ?`, yarn_inward_inventory);
                            }
                            if (index === body.yarn_inward_inventory.length - 1) {
                                callback(false, result, "Yarn inward Saved Successfully!");
                            }
                            // }
    
                        })
                    }else{
                        callback(false, result, "Yarn inward Saved Successfully!");

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
                DBCON.query(`delete from yarn_inward_inventory where vou_id = ?`, id, (err, result1) => {
                    if (err) {
                        callback(err)
                    } else {
                        callback(false, result1)
                    }
                })
            }
        })
    },
    getNextYarnInwardVouNo: (callback) => {
        var query = 'select max(ifnull(vouno, 0)) + 1 as max_vou_no from yarn_inward';

        DBCON.query(query, (err, result) => {
            if (err) {
                console.log(err);
                callback(err)
            } else {
                callback(false, result[0]);
            }
        })
    },
    getYarnInwardReport: (id, callback) => {
        var yarn_inward_details = {};
        const QUERY = `select yarn_inward.id, yarn_inward.vouno, yarn_inward.vou_date,process.process, order_program.order_no from yarn_inward left join process on process.id = yarn_inward.process_id left join order_program on order_program.id = yarn_inward.order_id where yarn_inward.id = ${id};`;

        DBCON.query(QUERY, (err, result) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                yarn_inward_details = result[0];


                const GET_INVENTORY_QUERY = `select yarn_inward_inventory.id, product.product, yarn_inward_inventory.gsm, yarn_inward_inventory.counts, yarn_inward_inventory.qtybag_per, yarn_inward_inventory.qty_bag, yarn_inward_inventory.qty_kg from yarn_inward_inventory left join product on product.id = yarn_inward_inventory.fabric_id where vou_id = ${id};`;

                DBCON.query(GET_INVENTORY_QUERY, (err, inventory) => {
                    if (err) {
                        console.log(err);
                        callback(err);
                    } else {
                        yarn_inward_details.inventory = inventory;

                        //total
                        const GET_INVENTORYTOTAL_QUERY = `select yarn_inward.inventory_qty_kg_total from yarn_inward where yarn_inward.id = ${id};`;

                        DBCON.query(GET_INVENTORYTOTAL_QUERY, (err, inventorytotal) => {
                            if (err) {
                                console.log(err);
                                callback(err);
                            } else {
                                yarn_inward_details.inventorytotal = inventorytotal;

                                //total


                                const GET_COMPANY_DETAILS = `select * from company limit 1`;
                                const GET_LEDGER_DETAILS = `select ledger.ledger, ledger.address, ledger.mobile, ledger.phone, ledger.gstno from yarn_inward left join ledger on yarn_inward.ledger_id = ledger.id where yarn_inward.id = ${id}`;
                                DBCON.query(GET_COMPANY_DETAILS, (err, company_details) => {
                                    if (err) {
                                        console.log(err);
                                        callback(err);

                                    } else {
                                        yarn_inward_details.company_details = company_details[0];
                                        DBCON.query(GET_LEDGER_DETAILS, (err, ledger_details) => {
                                            if (err) {
                                                console.log(err);
                                                callback(err);
                                            } else {
                                                yarn_inward_details.ledger_details = ledger_details[0];
                                                callback(false, yarn_inward_details);
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

module.exports = Yarn_InwardModel;