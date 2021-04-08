const pool = require('../db_config');
const DBCON = require('../db_config');
const {
    issetNotEmpty
} = require('../helpers/common');

const moment = require('moment');
const e = require('express');

function GarmentsReceiptNoteModel() {};

const TABLE_NAME = 'garments_receipt_note';

GarmentsReceiptNoteModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM garments_receipt_note WHERE id = ?`;
        console.log(sql);

        let sql1 = `SELECT * FROM garments_receipt_note_inventory WHERE garments_receipt_note_inventory.vou_id = ?`;

        

        pool.query(sql, match, function (err, result) {

            if (err) {
                // throw err
                console.log(err);
                callback(err)
            } else {
                var garments_receipt_note= {
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
                    size8_total: result[0].size8_total,
                    size9_total: result[0].size9_total,
                    order_id: result[0].order_id,
                    marketing_user_id: result[0].marketing_user_id,
                    
                    vouno: result[0].vouno,
                    garments_receipt_note_inventory: [],
                
                }
                    
                pool.query(sql1, match, function (err, result1) {

                    if (err) {
                        console.log(err);
                        callback(err)
                    } else {
                        garments_receipt_note.garments_receipt_note_inventory = result1;
                                callback(false, garments_receipt_note);
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
        pool.query(`select garments_receipt_note.id,garments_receipt_note.vouno,garments_receipt_note.inventory_qty_total, DATE_FORMAT(garments_receipt_note.vou_date, '%d-%m-%Y') as vou_date, ledger.ledger from ${TABLE_NAME} left join ledger on ledger.id=garments_receipt_note.ledger_id  order by garments_receipt_note.id desc`, function (err, result) {

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

            var garments_receipt_note= {
                ledger_id: body.ledger_id,
                    vou_date: body.vou_date,
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
                    order_id: body.order_id,
                    marketing_user_id: body.marketing_user_id,
                    
                    vouno: body.vouno, 
            
            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [garments_receipt_note, body.id], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    console.log(result);
                    DBCON.query(`delete from garments_receipt_note_inventory where vou_id = ?`, body.id, (err, deletedData) => {
                        if (err) {
                            callback(err)
                        } else {
                            body.garments_receipt_note_inventory.map((item, index) => {
                                
                                    var garments_receipt_note_inventory = {
                                        vou_id: body.id,
                                        color_id: item.color_id,
                                        color: item.color,
                                        size1: item.size1,
                                        size2: item.size2,
                                        size3: item.size3,
                                        size4: item.size4,
                                        size5: item.size5,
                                        size6: item.size6,
                                        size7: item.size7,
                                        size8: item.size8,
                                        size9: item.size9,
                                        product_id: item.product_id,
                                        qty: item.qty,
                                        unit: item.unit,
                                        description: item.description
                                    }
                                    DBCON.query(`insert into garments_receipt_note_inventory set ?`, garments_receipt_note_inventory);
                                    if (index === body.garments_receipt_note_inventory.length - 1) {
                                        callback(false, result, "Garments Receipt Note  Updated Successfully!");
                                    }
                                // } else {
                                //     if (index === body.garments_delivery_note_inventory.length - 1) {
                                //         callback(false, result, "Garments Delivery Note Updated Successfully!");
                                //     }
                                // }
                            })
                        }
                    })

                }
            })
        } else {

            var garments_receipt_note= {
                ledger_id: body.ledger_id,
                    vou_date: body.vou_date,
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
                    order_id: body.order_id,
                    marketing_user_id: body.marketing_user_id,
                    
                    vouno: body.vouno,
            }
            DBCON.query(`insert into ${TABLE_NAME} set ?`, garments_receipt_note, (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    // console.log(result);
                    for(index=0; index < body.garments_receipt_note_inventory.length; index++)
                    {
                        var item = body.garments_receipt_note_inventory[index];
                    //  body.garments_delivery_note_inventory.map((item, index) => {
                        
                            console.log(item, index)
                            var garments_receipt_note_inventory = {
                                vou_id: result.insertId,
                                color_id: item.color_id,
                                        color: item.color,
                                        size1: item.size1,
                                        size2: item.size2,
                                        size3: item.size3,
                                        size4: item.size4,
                                        size5: item.size5,
                                        size6: item.size6,
                                        size7: item.size7,
                                        size8: item.size8,
                                        size9: item.size9,
                                        product_id: item.product_id,
                                        qty: item.qty,
                                        unit:item.unit,
                                        description: item.description
                            }
                            DBCON.query(`insert into garments_receipt_note_inventory set ?`, garments_receipt_note_inventory);
                            if (index === body.garments_receipt_note_inventory.length - 1) {
                                callback(false, result, "Garments Receipt Note Updated Successfully!");
                            }
                        // } else {
                        //     if (index === body.garments_delivery_note_inventory.length - 1) {
                        //         callback(false, result, "Garments Delivery Note Updated Successfully!");
                        //     }
                        // }
                    // })
                        }
                }
                
            })
            //         }
            //     }
            // })
        }
    },

    

   
    delete: function (id, callback) {
        pool.query(`delete from ${TABLE_NAME} where id = ?`, id, (err, result) => {
            if (err) {
                callback(err)
            } else {
                pool.query(`delete from garments_receipt_note_inventory where vou_id = ?`, id, (err, result1) => {
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

    getNextGarmentsReceiptNoteVouNo : (callback) => {
        var query = 'select max(ifnull(vouno, 0)) + 1 as max_vou_no from garments_receipt_note';

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

module.exports = GarmentsReceiptNoteModel;