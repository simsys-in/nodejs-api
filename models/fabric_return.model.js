const pool = require('../db_config');
const DBCON = require('../db_config');
const {
    issetNotEmpty
} = require('../helpers/common');

const moment = require('moment');

function FabricReturnModel() {};

const TABLE_NAME = 'fabric_return';

FabricReturnModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM fabric_return WHERE id = ?`;
        console.log(sql);
        
        let sql1 = `SELECT * FROM  fabric_return_inventory WHERE fabric_return_inventory.vou_id = ?`;
        
         
        pool.query(sql, match, function (err, result) {
            
            if (err){ 
                // throw err
                callback(err)
            }
            else{
                var fabric_return ={
                    ledger_id : result[0].ledger_id,
                    vou_date: result[0].vou_date,
                    vouno: result[0].vouno,
                    order_id : result[0].order_id,
                    narration : result[0].narration,
                    inventory_roll_total : result[0].inventory_roll_total,
                    inventory_weight_total : result[0].inventory_weight_total,
                    process_id : result[0].process_id,
                    menu_id : result[0].menu_id,
                    refno : result[0].refno,
                    fabric_return_inventory : []
                    
                }
                pool.query(sql1, match, function (err, result1) {
                    if(err){
                        callback(err)
                    }else{
                        fabric_return.fabric_return_inventory = result1;
                        callback(false,fabric_return);
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
    getAll : function(callback){
        pool.query(`select fabric_return.id,fabric_return.vouno, DATE_FORMAT(fabric_return.vou_date, '%d-%m-%Y') as vou_date,ledger.ledger from ${TABLE_NAME} left join ledger on ledger.id=fabric_return.ledger_id`, function(err, result){

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
        
        if (issetNotEmpty(body.id)) {
           
            var fabric_return ={
                ledger_id : body.ledger_id,
                vou_date: body.vou_date,
                vouno: body.vouno,
                order_id : body.order_id,
                narration : body.narration,
                inventory_roll_total : body.inventory_roll_total,
                inventory_weight_total : body.inventory_weight_total,
                process_id : body.process_id,
                menu_id : 0,
                refno : body.refno,
                
            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [fabric_return, body.id], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    console.log(result);
                    DBCON.query(`delete from fabric_return_inventory where vou_id = ?`, body.id, (err, deletedData) =>  {
                        if(err)
                        {
                            callback(err)
                        }
                        else{
                            body.fabric_return_inventory.map((item, index) => {
                                var fabric_return_inventory = {
                                    vou_id : body.id,
                                    fabric_id : item.fabric_id,
                                    roll : item.roll,
                                    weight : item.weight,
                                    color_id : item.color_id,
                                    dia : item.dia,
                                    gsm : item.gsm,
                                }
                                DBCON.query(`insert into fabric_return_inventory set ?`, fabric_return_inventory);
                                if(index === body.fabric_return_inventory.length - 1)
                                        {
                                            callback(false, result, "Fabric Return  Updated Successfully!");
                                        }
                            })
                        }
                    })

                }
            })
        } else {
           
                            var fabric_return ={
                                ledger_id : body.ledger_id,
                                vou_date: body.vou_date,
                                vouno: body.vouno,
                                order_id : body.order_id,
                                narration : body.narration,
                                inventory_roll_total : body.inventory_roll_total,
                                inventory_weight_total : body.inventory_weight_total,
                                process_id : body.process_id,
                                menu_id : 0,
                                refno : body.refno,
                            
                            
                            }
                        
                        DBCON.query(`insert into ${TABLE_NAME} set ?`, fabric_return, (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                console.log(result);
                                body.fabric_return_inventory.map((item, index) => {
                                    var fabric_return_inventory = {
                                        vou_id : result.insertId,
                                        fabric_id : item.fabric_id,
                                        roll : item.roll,
                                        weight : item.weight,
                                        color_id : item.color_id,
                                        dia : item.dia,
                                        gsm : item.gsm,
                                    }
                                    DBCON.query(`insert into fabric_return_inventory set ?`, fabric_return_inventory);
                                    if(index === body.fabric_return_inventory.length - 1)
                                            {
                                                callback(false, result, "Fabric Return  Saved Successfully!");
                                            }
                                })

                            }
                        })
            //         }
            //     }
            // })
        }
    },
    delete : function(id, callback){
        pool.query(`delete from ${TABLE_NAME} where id = ?`, id, (err,result) => {
            if(err)
            {
                callback(err)
            }
            else{
                pool.query(`delete from fabric_return_inventory where vou_id = ?`, id, (err,result1) => {
                    if(err)
                    {
                        callback(err)
                    }
                    else{
                        callback(false, result1)
                    }
                })
                
            }
        })
    },
    getNextFabricReturnVouNo : (callback) => {
        var query = 'select max(ifnull(vouno, 0)) + 1 as max_vou_no from fabric_return';

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
module.exports = FabricReturnModel;