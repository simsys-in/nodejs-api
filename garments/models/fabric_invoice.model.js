
const DBCON = require('../../db_config');
const {
    issetNotEmpty
} = require('../../helpers/common');
const moment = require('moment');
const { getDBDate } = require('../../helpers/timer')

function FabricInvoiceModel() {};

const TABLE_NAME = 'fabric_invoice';

FabricInvoiceModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM fabric_invoice WHERE id = ?`;
        console.log(sql);
        
        let sql1 = `SELECT * FROM  fabric_invoice_inventory WHERE fabric_invoice_inventory.vou_id = ?`;
        
         
        DBCON.query(sql, match, function (err, result) {
            
            if (err){ 
                // throw err
                callback(err)
            }
            else{
                var fabric_invoice ={
                    ledger_id : result[0].ledger_id,
                    vou_date: result[0].vou_date,
                    vouno: result[0].vouno,
                    order_id : result[0].order_id,
                    narration : result[0].narration,
                    inventory_qty_total : result[0].inventory_qty_total,
                    inventory_qty2_total : result[0].inventory_qty2_total,
                    process_id : result[0].process_id,
                    inventory_amount_total : result[0].inventory_amount_total,
                    menu_id : result[0].menu_id,
                    inventory_roll_total : result[0].inventory_roll_total,
                    inventory_weight_total : result[0].inventory_weight_total,
                    amount : result[0].amount,
                    refno : result[0].refno,
                    fabric_invoice_inventory : []
                    
                }
                DBCON.query(sql1, match, function (err, result1) {
                    if(err){
                        callback(err)
                    }else{
                        fabric_invoice.fabric_invoice_inventory = result1;
                        callback(false,fabric_invoice);
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
        DBCON.query(`select fabric_invoice.id,fabric_invoice.vouno, DATE_FORMAT(fabric_invoice.vou_date, '%d-%m-%Y') as vou_date , ledger.ledger from ${TABLE_NAME} left join ledger on ledger.id=fabric_invoice.ledger_id order by ${TABLE_NAME}.id desc`, function(err, result){

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
        body.updated_at = new Date();
        if (issetNotEmpty(body.id)) {
           
            var fabric_invoice ={
                ledger_id : body.ledger_id,
                vou_date: getDBDate(body.vou_date),
                vouno: body.vouno,
                order_id : body.order_id,
                narration : body.narration,
                inventory_qty_total : 0,
                inventory_qty2_total : 0,
                process_id : body.process_id,
                inventory_amount_total : body.inventory_amount_total,
                menu_id : 0,
                inventory_roll_total : body.inventory_roll_total,
                inventory_weight_total : body.inventory_weight_total,
                amount : 0,
                refno : body.refno,     
            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [fabric_invoice, body.id], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    console.log(result);
                    DBCON.query(`delete from fabric_invoice_inventory where vou_id = ?`, body.id, (err, deletedData) =>  {
                        if(err)
                        {
                            callback(err)
                        }
                        else{
                            body.fabric_invoice_inventory.map((item, index) => {
                                var fabric_invoice_inventory = {
                                    vou_id : body.id,
                                    fabric_id : item.fabric_id,
                                    roll : item.roll,
                                    weight : item.weight,
                                    color_id : item.color_id,
                                    dia : item.dia,
                                    gsm : item.gsm,
                                    rate : item.rate,
                                    amount : item.amount

                                }
                                DBCON.query(`insert into fabric_invoice_inventory set ?`, fabric_invoice_inventory);
                                if(index === body.fabric_invoice_inventory.length - 1)
                                        {
                                            callback(false, result, "Fabric Invoice  Updated Successfully!");
                                        }
                            })
                        }
                    })

                }
            })
        } else {
           
                            var fabric_invoice ={
                                ledger_id : body.ledger_id,
                                vou_date: getDBDate(body.vou_date),
                                vouno: body.vouno,
                                order_id : body.order_id,
                                narration : body.narration,
                                inventory_qty_total : 0,
                                inventory_qty2_total : 0,
                                process_id : body.process_id,
                                inventory_amount_total : body.inventory_amount_total,
                                menu_id : 0,
                                inventory_roll_total : body.inventory_roll_total,
                                inventory_weight_total : body.inventory_weight_total,
                                amount : 0,
                                refno : body.refno,     
                                created_at :new Date()
                            }
                        
                        DBCON.query(`insert into ${TABLE_NAME} set ?`, fabric_invoice, (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                console.log(result);
                                body.fabric_invoice_inventory.map((item, index) => {
                                    var fabric_invoice_inventory = {
                                        vou_id : result.insertId,
                                        fabric_id : item.fabric_id,
                                        roll : item.roll,
                                        weight : item.weight,
                                        color_id : item.color_id,
                                        dia : item.dia,
                                        gsm : item.gsm,
                                        rate : item.rate,
                                        amount : item.amount
    
                                    }
                                    DBCON.query(`insert into fabric_invoice_inventory set ?`, fabric_invoice_inventory);
                                    if(index === body.fabric_invoice_inventory.length - 1)
                                            {
                                                callback(false, result, "Fabric Invoice  Saved Successfully!");
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
                DBCON.query(`delete from fabric_invoice_inventory where vou_id = ?`, id, (err,result1) => {
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
    getNextFabricInvoiceVouNo : (callback) => {
        var query = 'select max(ifnull(vouno, 0)) + 1 as max_vou_no from fabric_invoice';

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
    getFabricInvoiceReport: (id, callback) => {
        var fabric_outward_details = {};
        const QUERY = `select fabric_invoice.id, 'Test' as dcno, fabric_invoice.vou_date, process.process, product.hsnsac, order_program.order_no, order_program.id as order_id, 'Vehicle No' as vehicle_no, product.product from fabric_invoice left join order_program on order_program.id = fabric_invoice.order_id left join product on product.id = order_program.style_id left join process on process.id = fabric_invoice.process_id where fabric_invoice.id = ${id};`;

        DBCON.query(QUERY, (err, result) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                fabric_invoice_details = result[0];
                const ORDER_ID = fabric_invoice_details.order_id;
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

                        const GET_COLOR_DETAILS_QUERY = `select color.color,product.product as fabric,fabric_invoice_inventory.gsm ,fabric_invoice_inventory.dia ,fabric_invoice_inventory.roll ,fabric_invoice_inventory.weight, fabric_invoice_inventory.rate, fabric_invoice_inventory.amount  from fabric_invoice_inventory left join color on color.id = fabric_invoice_inventory.color_id left join product on product.id = fabric_invoice_inventory.fabric_id  where vou_id = ${id};`;

                        DBCON.query(GET_COLOR_DETAILS_QUERY, (err, color_details) => {
                            if (err) {
                                console.log(err);
                                callback(err);
                            } else {
                                fabric_invoice_details.color_details = color_details;

                                // const GET_ACCESSORIES_QUERY = `select product.product, jobwork_outward_product.qty, unit.unit  from jobwork_outward_product left join product on product.id = jobwork_outward_product.product_id left join unit on unit.id = product.unit_id where vou_id = ${id};`;

                                // DBCON.query(GET_ACCESSORIES_QUERY, (err, accessories) => {
                                //     if (err) {
                                //         console.log(err);
                                //         callback(err);
                                //     } else {
                                //         jobwork_outward_details.accessories = accessories;

                                        const GET_COMPANY_DETAILS = `select * from company limit 1`;
                                        const GET_LEDGER_DETAILS = `select ledger.ledger, ledger.delivery_address, ledger.mobile, ledger.phone, ledger.gstno from fabric_invoice left join ledger on fabric_invoice.ledger_id = ledger.id where fabric_invoice.id = ${id}`;
                                        DBCON.query(GET_COMPANY_DETAILS, (err, company_details) => {
                                            if (err) {
                                                console.log(err);
                                                callback(err);

                                            } else {
                                                fabric_invoice_details.company_details = company_details[0];
                                                DBCON.query(GET_LEDGER_DETAILS, (err, ledger_details) => {
                                                    if (err) {
                                                        console.log(err);
                                                        callback(err);
                                                    } else {
                                                        fabric_invoice_details.ledger_details = ledger_details[0];
                                                        callback(false, fabric_invoice_details);
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

module.exports = FabricInvoiceModel;