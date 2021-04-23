
const DBCON = require('../../../db_config');
const {
    issetNotEmpty
} = require('../../../helpers/common');

const moment = require('moment');
const { getDBDate } = require('../../../helpers/timer')

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
        
         
        DBCON.query(sql, match, function (err, result) {
            
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
                DBCON.query(sql1, match, function (err, result1) {
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
        DBCON.query(`select fabric_return.id,fabric_return.vouno, DATE_FORMAT(fabric_return.vou_date, '%d-%m-%Y') as vou_date,ledger.ledger from ${TABLE_NAME} left join ledger on ledger.id=fabric_return.ledger_id order by ${TABLE_NAME}.id desc`, function(err, result){

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
                vou_date: getDBDate(body.vou_date),
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
                            if(body.fabric_return_inventory.length > 0){

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
                            }else{
                                callback(false, result, "Fabric Return  Updated Successfully!");

                            }

                        }
                    })

                }
            })
        } else {
           
                            var fabric_return ={
                                ledger_id : body.ledger_id,
                                vou_date: getDBDate(body.vou_date),
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
                                if(body.fabric_return_inventory.length > 0){

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
                                }else{
                                    callback(false, result, "Fabric Return  Saved Successfully!");

                                }


                            }
                        })
            //         }
            //     }
            // })
        }
    },
    delete : function(id, callback){
        DBCON.query(`delete from ${TABLE_NAME} where id = ?`, id, (err,result) => {
            if(err)
            {
                callback(err)
            }
            else{
                DBCON.query(`delete from fabric_return_inventory where vou_id = ?`, id, (err,result1) => {
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
        var query = 'select ifnull(max(vouno), 0) + 1 as max_vou_no from fabric_return';

        DBCON.query(query, (err, result) => {
            if(err){
                console.log(err);
                callback(err)
            }
            else{
                callback(false,result[0]);
            }
        })
    },

    getFabricReturnReport: (id, callback) => {
        var fabric_outward_details = {};
        const QUERY = `select fabric_return.id, fabric_return.vouno, fabric_return.vou_date, process.process, product.hsnsac, order_program.order_no, order_program.id as order_id, 'Vehicle No' as vehicle_no, product.product from fabric_return left join order_program on order_program.id = fabric_return.order_id left join product on product.id = order_program.style_id left join process on process.id = fabric_return.process_id where fabric_return.id = ${id};`;

        DBCON.query(QUERY, (err, result) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                fabric_return_details = result[0];
                const ORDER_ID = fabric_return_details.order_id;
            

                        const GET_COLOR_DETAILS_QUERY = `select color.color,product.product as fabric,fabric_return_inventory.gsm ,fabric_return_inventory.dia ,fabric_return_inventory.roll ,fabric_return_inventory.weight  from fabric_return_inventory left join color on color.id = fabric_return_inventory.color_id left join product on product.id = fabric_return_inventory.fabric_id  where vou_id = ${id};`;

                        DBCON.query(GET_COLOR_DETAILS_QUERY, (err, color_details) => {
                            if (err) {
                                console.log(err);
                                callback(err);
                            } else {
                                fabric_return_details.color_details = color_details;

                                // const GET_ACCESSORIES_QUERY = `select product.product, jobwork_outward_product.qty, unit.unit  from jobwork_outward_product left join product on product.id = jobwork_outward_product.product_id left join unit on unit.id = product.unit_id where vou_id = ${id};`;

                                // DBCON.query(GET_ACCESSORIES_QUERY, (err, accessories) => {
                                //     if (err) {
                                //         console.log(err);
                                //         callback(err);
                                //     } else {
                                //         jobwork_outward_details.accessories = accessories;

                                        const GET_COMPANY_DETAILS = `select * from company limit 1`;
                                        const GET_LEDGER_DETAILS = `select ledger.ledger, ledger.address, ledger.mobile, ledger.phone, ledger.gstno from fabric_return left join ledger on fabric_return.ledger_id = ledger.id where fabric_return.id = ${id}`;
                                        DBCON.query(GET_COMPANY_DETAILS, (err, company_details) => {
                                            if (err) {
                                                console.log(err);
                                                callback(err);

                                            } else {
                                                fabric_return_details.company_details = company_details[0];
                                                DBCON.query(GET_LEDGER_DETAILS, (err, ledger_details) => {
                                                    if (err) {
                                                        console.log(err);
                                                        callback(err);
                                                    } else {
                                                        fabric_return_details.ledger_details = ledger_details[0];
                                                        callback(false, fabric_return_details);
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
module.exports = FabricReturnModel;