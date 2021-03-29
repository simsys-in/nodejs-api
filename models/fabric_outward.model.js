const pool = require('../db_config');
const DBCON = require('../db_config');
const {
    issetNotEmpty
} = require('../helpers/common');

const moment = require('moment');

function FabricOutwardModel() {};

const TABLE_NAME = 'fabric_outward';

FabricOutwardModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM fabric_outward WHERE id = ?`;
        console.log(sql);
        
        let sql1 = `SELECT * FROM  fabric_outward_inventory WHERE fabric_outward_inventory.vou_id = ?`;
        
         
        pool.query(sql, match, function (err, result) {
            
            if (err){ 
                // throw err
                callback(err)
            }
            else{
                var fabric_outward ={
                    ledger_id : result[0].ledger_id,
                    vou_date: result[0].vou_date,
                    order_id : result[0].order_id,
                    narration : result[0].narration,
                    inventory_roll_total : result[0].inventory_roll_total,
                    inventory_weight_total : result[0].inventory_weight_total,
                    from_process_id : result[0].from_process_id,
                    to_process_id : result[0].to_process_id,
                    vouno : result[0].vouno,
        
                    menu_id : result[0].menu_id,
                    refno : result[0].refno,
                    fabric_outward_inventory : []
                    
                }
                pool.query(sql1, match, function (err, result1) {
                    if(err){
                        callback(err)
                    }else{
                        fabric_outward.fabric_outward_inventory = result1;
                        callback(false,fabric_outward);
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
        pool.query(`select fabric_outward.id,fabric_outward.vouno, DATE_FORMAT(fabric_outward.vou_date, '%d-%m-%Y') as vou_date,ledger.ledger from ${TABLE_NAME} left join ledger on ledger.id=fabric_outward.ledger_id`, function(err, result){

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
           
            var fabric_outward ={
                ledger_id : body.ledger_id,
                vou_date: body.vou_date,
                order_id : body.order_id,
                narration : body.narration,
                inventory_roll_total : body.inventory_roll_total,
                inventory_weight_total : body.inventory_weight_total,
                from_process_id : body.from_process_id,
                to_process_id : body.to_process_id,
                vouno : body.vouno,
        
                menu_id : 0,
                refno : 0,
                
            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [fabric_outward, body.id], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    console.log(result);
                    DBCON.query(`delete from fabric_outward_inventory where vou_id = ?`, body.id, (err, deletedData) =>  {
                        if(err)
                        {
                            callback(err)
                        }
                        else{
                            body.fabric_outward_inventory.map((item, index) => {
                                var fabric_outward_inventory = {
                                    vou_id : body.id,
                                    fabric_id : item.fabric_id,
                                    ledger_id : item.ledger_id,
                                    roll : item.roll,
                                    weight : item.weight,
                                    color_id : item.color_id,
                                    dia : item.dia,
                                    gsm : item.gsm,
                                }
                                DBCON.query(`insert into fabric_outward_inventory set ?`, fabric_outward_inventory);
                                if(index === body.fabric_outward_inventory.length - 1)
                                        {
                                            callback(false, result, "Fabric Inward  Updated Successfully!");
                                        }
                            })
                        }
                    })

                }
            })
        } else {
           
                            var fabric_outward ={
                                ledger_id : body.ledger_id,
                                vou_date: body.vou_date,
                                order_id : body.order_id,
                                narration : body.narration,
                                inventory_roll_total : body.inventory_roll_total,
                                inventory_weight_total : body.inventory_weight_total,
                                from_process_id : body.from_process_id,
                                to_process_id : body.to_process_id,
                                vouno : body.vouno,
                            
                                menu_id : 0,
                                refno : 0,
                             }
                        
                        DBCON.query(`insert into ${TABLE_NAME} set ?`, fabric_outward, (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                console.log(result);
                                body.fabric_outward_inventory.map((item, index) => {
                                    var fabric_outward_inventory = {
                                        vou_id : result.insertId,
                                        fabric_id : item.fabric_id,
                                        ledger_id : item.ledger_id,
                                        roll : item.roll,
                                        weight : item.weight,
                                        color_id : item.color_id,
                                        dia : item.dia,
                                        gsm : item.gsm,
                                    }
                                    DBCON.query(`insert into fabric_outward_inventory set ?`, fabric_outward_inventory);
                                    if(index === body.fabric_outward_inventory.length - 1)
                                            {
                                                callback(false, result, "Fabric outward  Saved Successfully!");
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
                pool.query(`delete from fabric_outward_inventory where vou_id = ?`, id, (err,result1) => {
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
    getNextFabricInwardVouNo : (callback) => {
        var query = 'select max(ifnull(vouno, 0)) + 1 as max_vou_no from fabric_outward';

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

module.exports = FabricOutwardModel;