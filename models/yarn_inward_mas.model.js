const pool = require('../db_config');
const DBCON = require('../db_config');
const {
    issetNotEmpty
} = require('../helpers/common');

function Yarn_InwardModel() {};

const TABLE_NAME = 'yarn_inward';

Yarn_InwardModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;
        console.log(sql);

        pool.query(sql, match, function (err, result) {
            if (err){ 
                // throw err
                callback(err)
            }

            if (result.length) {
                callback(false,result);
            } else {
                callback(false,null);
            }
        });
    },
    getAll : function(callback){
        pool.query(`select  ${TABLE_NAME}.id, ledger.ledger, ${TABLE_NAME}.vou_date, order_program.order_no, ${TABLE_NAME}.narration, process.process, ${TABLE_NAME}.refno from ${TABLE_NAME} left join ledger on ledger.id = yarn_inward.ledger_id  left join process on process.id = yarn_inward.process_id left join order_program on order_program.id = yarn_inward.order_id `, function(err, result){
            if(err)
            {
                callback(err)
            }
            else{
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
            DBCON.query(`select count(id) as c from ${TABLE_NAME} where id != ? and yarn_inward = ?`, [body.id, body.name], (err, count) => {
                if (err) {
                    callback(err)
                } else {
                    if (count[0].c > 0) {
                        callback("Yarn inward Already Found!")
                    } else {
                        // body.created_at = new Date();
                        DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [body, body.id], (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                callback(false, result, "Yarn inward Updated Successfully")
                            }
                        })
                    }
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
                            ledger_id : body.ledger_id,
                            vou_date : body.vou_date,
                            order_id : body.order_id,
                            narration : body.narration,
                            process_id : body.process_id,
                            refno : body.refno

                        }
                        DBCON.query(`insert into ${TABLE_NAME} set ?`, yarn_inward, (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                console.log(result)
                                body.yarn_inward_inventory.map((item, index) => {
                                    var yarn_inward_inventory = {
                                        vou_id : result.insertId,
                                        fabric_id : item.favric_id,
                                        gsm : item.gsm,
                                       qty_kg : item.qty_kg,
                                       counts : item.counts,
                                       qty_bag : item.qty_bag,
                                       qtybag_per : item.qtybag_per,
                                    }
                                    DBCON.query(`insert into yarn_inward_inventory set ?`, yarn_inward_inventory);
                                    if(index === body.yarn_inward_inventory.length - 1)
                                    {
                                        callback(false, result, "Product  Saved Successfully!");
                                    }
                            })
                            }
                        })  
                    }
                },
    //         })
    //     }
    // },
    delete : function(id, callback){
        pool.query(`delete from ${TABLE_NAME} where id = ?`, id, (err,result) => {
            if(err)
            {
                callback(err)
            }
            else{
                callback(false, result)
            }
        })
    }
}

module.exports = Yarn_InwardModel;