
const DBCON = require('../../db_config');
const {
    issetNotEmpty
} = require('../../helpers/common');

const moment = require('moment');
const { getDBDate } = require('../../helpers/timer')

function DyeingProgramModel() {};

const TABLE_NAME = 'dyeing_program';

DyeingProgramModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM dyeing_program WHERE id = ?`;
        console.log(sql);
        
        let sql1 = `SELECT * FROM  dyeing_program_inventory WHERE dyeing_program_inventory.vou_id = ?`;
        
         
        DBCON.query(sql, match, function (err, result) {
            
            if (err){ 
                // throw err
                callback(err)
            }
            else{
                var dyeing_program ={
                    ledger_id : result[0].ledger_id,
                    vou_date: result[0].vou_date,
                    order_id : result[0].order_id,
                    // narration : result[0].narration,
                    inventory_rolls_total : result[0].inventory_rolls_total,
                    inventory_weight_total : result[0].inventory_weight_total,
                    // process_id : result[0].process_id,
                    vouno : result[0].vouno,
                    // menu_id : result[0].menu_id,
                    // refno : result[0].refno,
                    dyeing_program_inventory : []
                    
                }
                DBCON.query(sql1, match, function (err, result1) {
                    if(err){
                        callback(err)
                    }else{
                        dyeing_program.dyeing_program_inventory = result1;
                        callback(false,dyeing_program);
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
        DBCON.query(`select ${TABLE_NAME}.id,${TABLE_NAME}.vouno , DATE_FORMAT(${TABLE_NAME}.vou_date, '%d-%m-%Y') as vou_date , ledger.ledger from ${TABLE_NAME} left join ledger on ledger.id = dyeing_program.ledger_id order by ${TABLE_NAME}.id desc`, function(err, result){

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
        body.updated_at = new Date();
        if (issetNotEmpty(body.id)) {
           
            var dyeing_program ={
                ledger_id : body.ledger_id,
                vou_date: getDBDate(body.vou_date),
                order_id : body.order_id,
                // narration : body.narration,
                inventory_rolls_total : body.inventory_rolls_total,
                inventory_weight_total : body.inventory_weight_total,
                // process_id : body.process_id,
                vouno : body.vouno,
                // menu_id : body.menu_id,
                // refno : body.refno
                
            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [dyeing_program, body.id], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    console.log(result);
                    DBCON.query(`delete from dyeing_program_inventory where vou_id = ?`, body.id, (err, deletedData) =>  {
                        if(err)
                        {
                            callback(err)
                        }
                        else{
                            body.dyeing_program_inventory.map((item, index) => {
                                var dyeing_program_inventory = {
                                    vou_id : body.id,
                                    fabric_id : item.fabric_id,
                                    // ledger_id : item.ledger_id,
                                    rolls : item.rolls,
                                    weight : item.weight,
                                    color_id : item.color_id,
                                    dia : item.dia,
                                    gsm : item.gsm,
                                }
                                DBCON.query(`insert into dyeing_program_inventory set ?`, dyeing_program_inventory);
                                if(index === body.dyeing_program_inventory.length - 1)
                                        {
                                            callback(false, result, "Fabric Inward  Saved Successfully!");
                                        }
                            })
                        }
                    })

                }
            })
        } else {
           
                        var dyeing_program ={
                                ledger_id : body.ledger_id,
                                vou_date: getDBDate (body.vou_date),
                                order_id : body.order_id,
                                // narration : body.narration,
                                inventory_rolls_total : body.inventory_rolls_total,
                                inventory_weight_total : body.inventory_weight_total,
                                // process_id : body.process_id,
                                vouno : body.vouno,
                                // menu_id : body.menu_id,
                                // refno : body.refno,
                                // created_at :new Date()
                            }
                        
                        DBCON.query(`insert into ${TABLE_NAME} set ?`, dyeing_program, (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                console.log(result);
                                body.dyeing_program_inventory.map((item, index) => {
                                    var dyeing_program_inventory = {
                                        vou_id : result.insertId,
                                        fabric_id : item.fabric_id,
                                        // ledger_id : item.ledger_id,
                                        rolls : item.rolls,
                                        weight : item.weight,
                                        color_id : item.color_id,
                                        dia : item.dia,
                                        gsm : item.gsm,
                                    }
                                    DBCON.query(`insert into dyeing_program_inventory set ?`, dyeing_program_inventory);
                                    if(index === body.dyeing_program_inventory.length - 1)
                                            {
                                                callback(false, result, "Fabric Inward  Updated Successfully!");
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
        DBCON.query(`delete from ${TABLE_NAME} where id = ?`, id, (err,result) => {
            if(err)
            {
                callback(err)
            }
            else{
                DBCON.query(`delete from dyeing_program_inventory where vou_id = ?`, id, (err,result1) => {
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
    getNextDyeingProgramVouNo : (callback) => {
        var query = 'select ifnull(max(vouno), 0) + 1 as max_vou_no from dyeing_program';

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
    
    getDyeingProgramReport: (id, callback) => {
        var fabric_outward_details = {};
        const QUERY = `select dyeing_program.id, 'Test' as dcno, dyeing_program.vou_date, process.process, product.hsnsac, order_program.order_no, order_program.id as order_id, 'Vehicle No' as vehicle_no, product.product from dyeing_program left join order_program on order_program.id = dyeing_program.order_id left join product on product.id = order_program.style_id left join process on process.id = dyeing_program.process_id where dyeing_program.id = ${id};`;

        DBCON.query(QUERY, (err, result) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                dyeing_program_details = result[0];
                const ORDER_ID = dyeing_program_details.order_id;
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

                        const GET_COLOR_DETAILS_QUERY = `select color.color,product.product as fabric,dyeing_program_inventory.gsm ,dyeing_program_inventory.dia ,dyeing_program_inventory.rolls ,dyeing_program_inventory.weight  from dyeing_program_inventory left join color on color.id = dyeing_program_inventory.color_id left join product on product.id = dyeing_program_inventory.fabric_id  where vou_id = ${id};`;

                        DBCON.query(GET_COLOR_DETAILS_QUERY, (err, color_details) => {
                            if (err) {
                                console.log(err);
                                callback(err);
                            } else {
                                dyeing_program_details.color_details = color_details;

                                // const GET_ACCESSORIES_QUERY = `select product.product, jobwork_outward_product.qty, unit.unit  from jobwork_outward_product left join product on product.id = jobwork_outward_product.product_id left join unit on unit.id = product.unit_id where vou_id = ${id};`;

                                // DBCON.query(GET_ACCESSORIES_QUERY, (err, accessories) => {
                                //     if (err) {
                                //         console.log(err);
                                //         callback(err);
                                //     } else {
                                //         jobwork_outward_details.accessories = accessories;

                                        const GET_COMPANY_DETAILS = `select * from company limit 1`;
                                        const GET_LEDGER_DETAILS = `select ledger.ledger, ledger.delivery_address, ledger.mobile, ledger.phone, ledger.gstno from dyeing_program left join ledger on dyeing_program.ledger_id = ledger.id where dyeing_program.id = ${id}`;
                                        DBCON.query(GET_COMPANY_DETAILS, (err, company_details) => {
                                            if (err) {
                                                console.log(err);
                                                callback(err);

                                            } else {
                                                dyeing_program_details.company_details = company_details[0];
                                                DBCON.query(GET_LEDGER_DETAILS, (err, ledger_details) => {
                                                    if (err) {
                                                        console.log(err);
                                                        callback(err);
                                                    } else {
                                                        dyeing_program_details.ledger_details = ledger_details[0];
                                                        callback(false, dyeing_program_details);
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

module.exports = DyeingProgramModel;