
const DBCON = require('../../../db_config');
const {
    issetNotEmpty
} = require('../../../helpers/common');

const moment = require('moment');
const { getDBDate } = require('../../../helpers/timer')

function KnittingProgramModel() {};

const TABLE_NAME = 'knitting_program';

KnittingProgramModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM knitting_program WHERE id = ?`;
        // console.log(sql);

        let sql1 = `SELECT *, 1 as selected FROM knitting_program_inventory WHERE knitting_program_inventory.vou_id = ?`;


        DBCON.query(sql, match, function (err, result) {

            if (err) {
                // throw err
                callback(err)
            } else {
                var knitting_program = {
                    ledger_id: result[0].ledger_id,
                    vou_date: getDBDate(result[0].vou_date),
                    narration: result[0].narration,
                    order_id: result[0].order_id,
                    inventory_bag_total: result[0].inventory_bag_total,
                    inventory_yarn_weight_total: result[0].inventory_yarn_weight_total,
                    vouno: result[0].vouno,
                    inventory_program_weight_total: result[0].inventory_program_weight_total,
                    knitting_program_inventory: [],
                    // jobwork_invoice_product: []

                }
                DBCON.query(sql1, match, function (err, result1) {
                    if (err) {
                        callback(err)
                    } else {
                        knitting_program.knitting_program_inventory = result1;

                        callback(false, knitting_program);



                    }
                })



            }


        });
    },
    getAll: function (callback) {
        DBCON.query(`select knitting_program.id, DATE_FORMAT(knitting_program.vou_date, '%d-%m-%Y') as vou_date,knitting_program.vouno, ledger.ledger from ${TABLE_NAME} left join ledger on ledger.id=knitting_program.ledger_id  order by ${TABLE_NAME}.id desc`, function (err, result) {

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

            var knitting_program = {
                ledger_id: body.ledger_id,
                vou_date: getDBDate(body.vou_date),
                narration: body.narration,
                order_id: body.order_id,
                inventory_bag_total: body.inventory_bag_total,
                inventory_yarn_weight_total: body.inventory_yarn_weight_total,
                vouno: body.vouno,
                inventory_program_weight_total: body.inventory_program_weight_total,
            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [knitting_program, body.id], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    // console.log(result);
                    DBCON.query(`delete from knitting_program_inventory where vou_id = ?`, body.id, (err, deletedData) => {
                        if (err) {
                            callback(err)
                        } else {
                            if(body.knitting_program_inventory.length > 0){

                                body.knitting_program_inventory.map((item, index) => {
                                    // for (index = 0; index < body.jobwork_invoice_inventory.length; index++) {
                                    //     var item = body.jobwork_invoice_inventory[index];
                                    if (item.selected && issetNotEmpty(item.yarn_id)) {
                                        var knitting_program_inventory = {
                                            vou_id: body.id,
                                            yarn_id: item.yarn_id,
                                            fabric_id: item.fabric_id,
                                            counts: item.counts,
                                            bag_per: item.bag_per,
                                            bag: item.bag,
                                            narration : issetNotEmpty(item.narration) ? item.narration : "",
                                            gsm: item.gsm,
                                            dia: item.dia,
                                            program_weight: item.program_weight,
                                            gg: item.gg,
                                            ll: item.ll,
                                            yarn_weight: item.yarn_weight,
                                        }
                                        DBCON.query(`insert into knitting_program_inventory set ?`, knitting_program_inventory);
                                        if (index === body.knitting_program_inventory.length - 1) {
                                            callback(false, result, "Knitting Program  Saved Successfully!");
                                        }
    
                                    } else {
                                        if (index === body.knitting_program_inventory.length - 1) {
                                            callback(false, result, "Knitting Program Updated Successfully!");
                                        }
                                    }
                                    // }
                                })
                            }else{
                                callback(false, result, "Knitting Program Updated Successfully!");

                            }
                        }
                    })

                }
            })
        } else {

            var knitting_program = {
                ledger_id: body.ledger_id,
                vou_date: getDBDate(body.vou_date),
                narration: body.narration,
                order_id: body.order_id,
                inventory_bag_total: body.inventory_bag_total,
                inventory_yarn_weight_total: body.inventory_yarn_weight_total,
                vouno: body.vouno,
                inventory_program_weight_total: body.inventory_program_weight_total,

            }

            DBCON.query(`insert into ${TABLE_NAME} set ?`, knitting_program, (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    // console.log(result);
                    // for (index = 0; index < body.knitting_program_inventory.length; index++) {
                    //     var item = body.knitting_program_inventory[index];
                    if(body.knitting_program_inventory.length > 0){

                        body.knitting_program_inventory.map((item, index) => {
                            if (item.selected && issetNotEmpty(item.yarn_id)) {
                                // console.log(item, index)
                                var knitting_program_inventory = {
                                    vou_id: result.insertId,
                                    yarn_id: item.yarn_id,
                                    fabric_id: item.fabric_id,
                                    counts: item.counts,
                                    bag_per: item.bag_per,
                                    bag: item.bag,
                                    narration : issetNotEmpty(item.narration) ? item.narration : "",
                                    gsm: item.gsm,
                                    dia: item.dia,
                                    program_weight: item.program_weight,
                                    gg: item.gg,
                                    ll: item.ll,
                                    yarn_weight: item.yarn_weight,
    
    
                                }
                                DBCON.query(`insert into knitting_program_inventory set ?`, knitting_program_inventory);
                                if (index === body.knitting_program_inventory.length - 1) {
                                    callback(false, result, "Knitting Program Updated Successfully!");
                                }
                            } else {
                                if (index === body.knitting_program_inventory.length - 1) {
                                    callback(false, result, "Knitting Program Updated Successfully!");
                                }
                            }
                            // }
                        })
                    }else{
                        callback(false, result, "Knitting Program Updated Successfully!");

                    }

                }
            })

        }
    },

    delete: function (id, callback) {
        DBCON.query(`delete from knitting_program_inventory where vou_id = ?`, id, (err, result) => {
            if (err) {
                callback(err)
            } else {
                if (err) {
                    callback(err)
                } else {
                    DBCON.query(`delete from knitting_program where id = ?`, id, (err, result1) => {

                        callback(false, result1)

                    })
                }
            }
        })
    },

    getNextKnittingProgramVouNo: (callback) => {
        var query = 'select max(ifnull(vouno, 0)) + 1 as max_vou_no from knitting_program';

        DBCON.query(query, (err, result) => {
            if (err) {
                // console.log(err);
                callback(err)
            } else {
                callback(false, result[0]);
            }
        })
    },

}

module.exports = KnittingProgramModel;