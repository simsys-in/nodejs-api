

const DBCON = require('../../../db_config');
const {
    issetNotEmpty
} = require('../../../helpers/common');
const moment = require('moment');
const { getDBDate } = require('../../../helpers/timer')

function Yarn_ReturnModel() {};

const TABLE_NAME = 'yarn_return';

Yarn_ReturnModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM yarn_return WHERE id = ?`;
        // console.log(sql);

        let sql1 = `SELECT * FROM  yarn_return_inventory where yarn_return_inventory.vou_id = ?`;

        DBCON.query(sql, match, function (err, result) {
            if (err) {
                // throw err
                callback(err)
            } else {
                var yarn_return = {
                    ledger_id: result[0].ledger_id,
                    narration: result[0].narration,
                    vou_date: getDBDate(result[0].vou_date),
                    inventory_qty_kg_total: result[0].inventory_qty_kg_total,
                    inventory_qty_bag_total: result[0].inventory_qty_bag_total,
                    process_id: result[0].process_id,
                    refno: result[0].refno,
                    //  vouno : result[0].vouno,
                    menu_id: 0,
                    order_id: result[0].order_id,
                    vouno: result[0].vouno,
                    yarn_return_inventory: []
                }
                DBCON.query(sql1, match, function (err, result1) {
                    if (err) {
                        callback(err)
                    } else {
                        yarn_return.yarn_return_inventory = result1;
                        callback(false, yarn_return)
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
        DBCON.query(`select  ${TABLE_NAME}.id,${TABLE_NAME}.vouno, ledger.ledger, date_format(${TABLE_NAME}.vou_date, '%d-%m-%Y') as vou_date, order_program.order_no, ${TABLE_NAME}.narration, process.process, ${TABLE_NAME}.refno from ${TABLE_NAME} left join ledger on ledger.id = yarn_return.ledger_id  left join process on process.id = yarn_return.process_id left join order_program on order_program.id = yarn_return.order_id  order by ${TABLE_NAME}.id desc`, function (err, result) {
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
            var yarn_return = {
                ledger_id: body.ledger_id,
                narration: body.narration,
                vou_date: getDBDate(body.vou_date),
                inventory_qty_kg_total: body.inventory_qty_kg_total,
                inventory_qty_bag_total: body.inventory_qty_bag_total,
                process_id: body.process_id,
                refno: body.refno,
                //  vouno : body.vouno,
                menu_id: 0,
                order_id: body.order_id,
                vouno: body.vouno,
            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [yarn_return, body.id], (err, result) => {
                // if(key === body.yarn_return.length - 1)
                if (err) {
                    callback(err)
                } else {
                    // console.log(result)
                    DBCON.query('delete from yarn_return_inventory where vou_id = ? ', body.id, (err, deleteData) => {
                        if (err) {
                            callback(err)
                        } else {
                            if(body.yarn_return_inventory.length > 0){

                                body.yarn_return_inventory.map((item, index) => {
                                    var yarn_return_inventory = {
                                        // yarn_return_id : result.insertId,
                                        vou_id: body.id,
                                        fabric_id: item.fabric_id,
                                        gsm: item.gsm,
                                        qty_kg: item.qty_kg,
                                        counts: item.counts,
                                        qty_bag: item.qty_bag,
                                        qtybag_per: item.qtybag_per,
                                    }
                                    DBCON.query(`insert into yarn_return_inventory set ?`, yarn_return_inventory);
                                    if (index === body.yarn_return_inventory.length - 1) {
                                        callback(false, result, "Yarn return Saved Successfully!");
                                    }
                                })
                            }else{
                                callback(false, result, "Yarn return Saved Successfully!");

                            }
                        }
                    })

                }
            })
        } else {
            // console.log(body.name, "Entered")
            // body.created_at = new Date();
            // DBCON.query(`select count(id) as c from ${TABLE_NAME} where yarn_return = ?`, [body.yarn_return], (err, count) => {
            //     if (err) {
            //         callback(err)
            //     } else {
            //         // console.log("DB Query Success")
            //         if (count[0].c > 0) {
            //             callback("Yarn return Name Already Found!")
            //         } else {
            var yarn_return = {
                ledger_id: body.ledger_id,
                narration: body.narration,
                vou_date: getDBDate(body.vou_date),
                inventory_qty_kg_total: body.inventory_qty_kg_total,
                inventory_qty_bag_total: body.inventory_qty_bag_total,
                process_id: body.process_id,
                refno: body.refno,
                //  vouno : body.vouno,
                menu_id: 0,
                order_id: body.order_id,
                vouno: body.vouno,
            }
            DBCON.query(`insert into ${TABLE_NAME} set ?`, yarn_return, (err, result) => {
                // if(key === body.yarn_return.length - 1)
                if (err) {
                    callback(err)
                } else {
                    // console.log(result)
                    if(body.yarn_return_inventory.length > 0){

                        body.yarn_return_inventory.map((item, index) => {
                            var yarn_return_inventory = {
                                // yarn_return_id : result.insertId,
                                vou_id: result.insertId,
                                fabric_id: item.fabric_id,
                                gsm: item.gsm,
                                qty_kg: item.qty_kg,
                                counts: item.counts,
                                qty_bag: item.qty_bag,
                                qtybag_per: item.qtybag_per,
                            }
                            DBCON.query(`insert into yarn_return_inventory set ?`, yarn_return_inventory);
                            if (index === body.yarn_return_inventory.length - 1) {
                                callback(false, result, "Yarn return Saved Successfully!");
                            }
                        })
                    }else{
                        callback(false, result, "Yarn return Saved Successfully!");

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
                DBCON.query(`delete from yarn_return_inventory where vou_id = ?`, id, (err, result1) => {
                    if (err) {
                        callback(err)
                    } else {
                        callback(false, result1)
                    }
                })
            }
        })
    },
    getNextYarnReturnVouNo: (callback) => {
        var query = 'select max(ifnull(vouno, 0)) + 1 as max_vou_no from yarn_return';

        DBCON.query(query, (err, result) => {
            if (err) {
                // console.log(err);
                callback(err)
            } else {
                callback(false, result[0]);
            }
        })
    },
    getYarnReturnReport: (id, callback) => {
        var yarn_return_details = {};
        const QUERY = `select yarn_return.id, yarn_return.vouno, yarn_return.vou_date,process.process, order_program.order_no from yarn_return left join process on process.id = yarn_return.process_id left join order_program on order_program.id = yarn_return.order_id where yarn_return.id = ${id};`;

        DBCON.query(QUERY, (err, result) => {
            if (err) {
                // console.log(err);
                callback(err);
            } else {
                yarn_return_details = result[0];


                const GET_INVENTORY_QUERY = `select yarn_return_inventory.id, product.product, yarn_return_inventory.gsm, yarn_return_inventory.counts, yarn_return_inventory.qtybag_per, yarn_return_inventory.qty_bag, yarn_return_inventory.qty_kg from yarn_return_inventory left join product on product.id = yarn_return_inventory.fabric_id where vou_id = ${id};`;

                DBCON.query(GET_INVENTORY_QUERY, (err, inventory) => {
                    if (err) {
                        // console.log(err);
                        callback(err);
                    } else {
                        yarn_return_details.inventory = inventory;

                        //total
                        const GET_INVENTORYTOTAL_QUERY = `select yarn_return.inventory_qty_kg_total, yarn_return.inventory_qty_bag_total  from yarn_return where yarn_return.id = ${id};`;

                        DBCON.query(GET_INVENTORYTOTAL_QUERY, (err, inventorytotal) => {
                            if (err) {
                                // console.log(err);
                                callback(err);
                            } else {
                                yarn_return_details.inventorytotal = inventorytotal;

                                //total


                                const GET_COMPANY_DETAILS = `select * from company limit 1`;
                                const GET_LEDGER_DETAILS = `select ledger.ledger, ledger.address, ledger.mobile, ledger.phone, ledger.gstno from yarn_return left join ledger on yarn_return.ledger_id = ledger.id where yarn_return.id = ${id}`;
                                DBCON.query(GET_COMPANY_DETAILS, (err, company_details) => {
                                    if (err) {
                                        // console.log(err);
                                        callback(err);

                                    } else {
                                        yarn_return_details.company_details = company_details[0];
                                        DBCON.query(GET_LEDGER_DETAILS, (err, ledger_details) => {
                                            if (err) {
                                                // console.log(err);
                                                callback(err);
                                            } else {
                                                yarn_return_details.ledger_details = ledger_details[0];
                                                callback(false, yarn_return_details);
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

module.exports = Yarn_ReturnModel;