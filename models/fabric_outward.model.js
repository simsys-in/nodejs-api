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
        pool.query(`select fabric_outward.id,fabric_outward.vouno, DATE_FORMAT(fabric_outward.vou_date, '%d-%m-%Y') as vou_date,ledger.ledger from ${TABLE_NAME} left join ledger on ledger.id=fabric_outward.ledger_id order by ${TABLE_NAME}.id desc`, function(err, result){

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
    getNextFabricOutwardVouNo : (callback) => {
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
    },

    getFabricOutwardReport: (id, callback) => {
        var fabric_outward_details = {};
        const QUERY = `select fabric_outward.id, 'Test' as dcno, fabric_outward.vou_date, process.process, product.hsnsac, order_program.order_no, order_program.id as order_id, 'Vehicle No' as vehicle_no, product.product from fabric_outward left join order_program on order_program.id = fabric_outward.order_id left join product on product.id = order_program.style_id left join process on process.id = fabric_outward.to_process_id where fabric_outward.id = ${id};`;

        DBCON.query(QUERY, (err, result) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                fabric_outward_details = result[0];
                const ORDER_ID = fabric_outward_details.order_id;
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

                        const GET_COLOR_DETAILS_QUERY = `select color.color,product.product as fabric,fabric_outward_inventory.gsm ,fabric_outward_inventory.dia ,fabric_outward_inventory.roll ,fabric_outward_inventory.weight  from fabric_outward_inventory left join color on color.id = fabric_outward_inventory.color_id left join product on product.id = fabric_outward_inventory.fabric_id  where vou_id = ${id};`;

                        DBCON.query(GET_COLOR_DETAILS_QUERY, (err, color_details) => {
                            if (err) {
                                console.log(err);
                                callback(err);
                            } else {
                                fabric_outward_details.color_details = color_details;

                                // const GET_ACCESSORIES_QUERY = `select product.product, jobwork_outward_product.qty, unit.unit  from jobwork_outward_product left join product on product.id = jobwork_outward_product.product_id left join unit on unit.id = product.unit_id where vou_id = ${id};`;

                                // DBCON.query(GET_ACCESSORIES_QUERY, (err, accessories) => {
                                //     if (err) {
                                //         console.log(err);
                                //         callback(err);
                                //     } else {
                                //         jobwork_outward_details.accessories = accessories;

                                        const GET_COMPANY_DETAILS = `select * from company limit 1`;
                                        const GET_LEDGER_DETAILS = `select ledger.ledger, ledger.delivery_address, ledger.mobile, ledger.phone, ledger.gstno from fabric_outward left join ledger on fabric_outward.ledger_id = ledger.id where fabric_outward.id = ${id}`;
                                        DBCON.query(GET_COMPANY_DETAILS, (err, company_details) => {
                                            if (err) {
                                                console.log(err);
                                                callback(err);

                                            } else {
                                                fabric_outward_details.company_details = company_details[0];
                                                DBCON.query(GET_LEDGER_DETAILS, (err, ledger_details) => {
                                                    if (err) {
                                                        console.log(err);
                                                        callback(err);
                                                    } else {
                                                        fabric_outward_details.ledger_details = ledger_details[0];
                                                        callback(false, fabric_outward_details);
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

module.exports = FabricOutwardModel;