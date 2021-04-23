
const DBCON = require('../../../db_config');
const {
    issetNotEmpty
} = require('../../../helpers/common');

const moment = require('moment');
const { getDBDate } = require('../../../helpers/timer')

function FabricInwardModel() {};

const TABLE_NAME = 'fabric_inward';

FabricInwardModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM fabric_inward WHERE id = ?`;
        console.log(sql);
        
        let sql1 = `SELECT *,1 as selected FROM  fabric_inward_inventory WHERE fabric_inward_inventory.vou_id = ?`;
        
         
        DBCON.query(sql, match, function (err, result) {
            
            if (err){ 
                // throw err
                callback(err)
            }
            else{
                var fabric_inward ={
                    ledger_id : result[0].ledger_id,
                    vou_date: result[0].vou_date,
                    order_id : result[0].order_id,
                    narration : result[0].narration,
                    inventory_roll_total : result[0].inventory_roll_total,
                    inventory_weight_total : result[0].inventory_weight_total,
                    process_id : result[0].process_id,
                    vouno : result[0].vouno,
                    menu_id : result[0].menu_id,
                    refno : result[0].refno,
                    fabric_inward_inventory : []
                    
                }
                DBCON.query(sql1, match, function (err, result1) {
                    if(err){
                        callback(err)
                    }else{
                        fabric_inward.fabric_inward_inventory = result1;
                        callback(false,fabric_inward);
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
        DBCON.query(`select ${TABLE_NAME}.id,${TABLE_NAME}.vouno , DATE_FORMAT(${TABLE_NAME}.vou_date, '%d-%m-%Y') as vou_date , ledger.ledger from ${TABLE_NAME} left join ledger on ledger.id=fabric_inward.ledger_id order by ${TABLE_NAME}.id desc`, function(err, result){

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
           
            var fabric_inward ={
                ledger_id : body.ledger_id,
                vou_date: getDBDate(body.vou_date),
                order_id : body.order_id,
                narration : body.narration,
                inventory_roll_total : body.inventory_roll_total,
                inventory_weight_total : body.inventory_weight_total,
                process_id : body.process_id,
                vouno : body.vouno,
                menu_id : body.menu_id,
                refno : body.refno
                
            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [fabric_inward, body.id], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    console.log(result);
                    DBCON.query(`delete from fabric_inward_inventory where vou_id = ?`, body.id, (err, deletedData) =>  {
                        if(err)
                        {
                            callback(err)
                        }
                        else{
                            if (body.fabric_invoice_inventory.length > 0) {
                                
                                body.fabric_inward_inventory.map((item, index) => {
                                    if (item.selected && issetNotEmpty(item.fabric_id) && item.fabric_id !== 0 && issetNotEmpty(item.color_id) && item.color_id !== 0){
    
                                        var fabric_inward_inventory = {
                                            vou_id : body.id,
                                            fabric_id : item.fabric_id,
                                            ledger_id : item.ledger_id,
                                            roll : item.roll,
                                            weight : item.weight,
                                            color_id : item.color_id,
                                            dia : item.dia,
                                            gsm : item.gsm,
                                        }
                                        DBCON.query(`insert into fabric_inward_inventory set ?`, fabric_inward_inventory);
                                    }
                                        if(index === body.fabric_inward_inventory.length - 1)
                                                {
                                                    callback(false, result, "Fabric Inward  Saved Successfully!");
                                                }
                                })
                            }else{
                                callback(false, result, "Fabric Inward  Saved Successfully!");

                            }
                        }
                    })

                }
            })
        } else {
           
                        var fabric_inward ={
                                ledger_id : body.ledger_id,
                                vou_date: getDBDate (body.vou_date),
                                order_id : body.order_id,
                                narration : body.narration,
                                inventory_roll_total : body.inventory_roll_total,
                                inventory_weight_total : body.inventory_weight_total,
                                process_id : body.process_id,
                                vouno : body.vouno,
                                menu_id : body.menu_id,
                                refno : body.refno,
                                created_at :new Date()
                            }
                        
                        DBCON.query(`insert into ${TABLE_NAME} set ?`, fabric_inward, (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                console.log(result);
                                if (body.fabric_invoice_inventory.length > 0) {

                                    body.fabric_inward_inventory.map((item, index) => {
                                    if (item.selected && issetNotEmpty(item.fabric_id) && item.fabric_id !== 0 && issetNotEmpty(item.color_id) && item.color_id !== 0 ) {

                                        var fabric_inward_inventory = {
                                            vou_id : result.insertId,
                                            fabric_id : item.fabric_id,
                                            ledger_id : item.ledger_id,
                                            roll : item.roll,
                                            weight : item.weight,
                                            color_id : item.color_id,
                                            dia : item.dia,
                                            gsm : item.gsm,
                                        }
                                        DBCON.query(`insert into fabric_inward_inventory set ?`, fabric_inward_inventory);
                                    }
                                        if(index === body.fabric_inward_inventory.length - 1)
                                                {
                                                    callback(false, result, "Fabric Inward  Updated Successfully!");
                                                }
                                })
                                }else{
                                    callback(false, result, "Fabric Inward  Updated Successfully!");

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
                DBCON.query(`delete from fabric_inward_inventory where vou_id = ?`, id, (err,result1) => {
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
        var query = 'select ifnull(max(vouno), 0) + 1 as max_vou_no from fabric_inward';

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
    getFabricInwardReport: (id, callback) => {
        var fabric_outward_details = {};
        const QUERY = `select fabric_inward.id, fabric_inward.vouno, fabric_inward.vou_date, process.process, product.hsnsac, order_program.order_no, order_program.id as order_id, 'Vehicle No' as vehicle_no, product.product from fabric_inward left join order_program on order_program.id = fabric_inward.order_id left join product on product.id = order_program.style_id left join process on process.id = fabric_inward.process_id where fabric_inward.id = ${id};`;

        DBCON.query(QUERY, (err, result) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                fabric_inward_details = result[0];
                const ORDER_ID = fabric_inward_details.order_id;
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

                        const GET_COLOR_DETAILS_QUERY = `select color.color,product.product as fabric,fabric_inward_inventory.gsm ,fabric_inward_inventory.dia ,fabric_inward_inventory.roll ,fabric_inward_inventory.weight  from fabric_inward_inventory left join color on color.id = fabric_inward_inventory.color_id left join product on product.id = fabric_inward_inventory.fabric_id  where vou_id = ${id};`;

                        DBCON.query(GET_COLOR_DETAILS_QUERY, (err, color_details) => {
                            if (err) {
                                console.log(err);
                                callback(err);
                            } else {
                                fabric_inward_details.color_details = color_details;

                                // const GET_ACCESSORIES_QUERY = `select product.product, jobwork_outward_product.qty, unit.unit  from jobwork_outward_product left join product on product.id = jobwork_outward_product.product_id left join unit on unit.id = product.unit_id where vou_id = ${id};`;

                                // DBCON.query(GET_ACCESSORIES_QUERY, (err, accessories) => {
                                //     if (err) {
                                //         console.log(err);
                                //         callback(err);
                                //     } else {
                                //         jobwork_outward_details.accessories = accessories;

                                        const GET_COMPANY_DETAILS = `select * from company limit 1`;
                                        const GET_LEDGER_DETAILS = `select ledger.ledger, ledger.address, ledger.mobile, ledger.phone, ledger.gstno from fabric_inward left join ledger on fabric_inward.ledger_id = ledger.id where fabric_inward.id = ${id}`;
                                        DBCON.query(GET_COMPANY_DETAILS, (err, company_details) => {
                                            if (err) {
                                                console.log(err);
                                                callback(err);

                                            } else {
                                                fabric_inward_details.company_details = company_details[0];
                                                DBCON.query(GET_LEDGER_DETAILS, (err, ledger_details) => {
                                                    if (err) {
                                                        console.log(err);
                                                        callback(err);
                                                    } else {
                                                        fabric_inward_details.ledger_details = ledger_details[0];
                                                        callback(false, fabric_inward_details);
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

module.exports = FabricInwardModel;