const DBCON = require('../../db_config');
const {
    issetNotEmpty
} = require('../../helpers/common');
const moment = require('moment');
const { getDBDate } = require('../../helpers/timer')

function Yarn_InvoiceModel() {};

const TABLE_NAME = 'yarn_invoice';

Yarn_InvoiceModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM yarn_invoice WHERE id = ?`;
        console.log(sql);

        let sql1 = `SELECT * FROM  yarn_invoice_inventory where yarn_invoice_inventory.vou_id = ?`;

        DBCON.query(sql, match, function (err, result) {
            if (err){ 
                // throw err
                callback(err)
            }
            else{
                var yarn_invoice = {
                    ledger_id : result[0].ledger_id,
                    narration : result[0].narration,
                    vou_date : result[0].vou_date,
                    
                    inventory_qty_kg_total : result[0].inventory_qty_kg_total,
                    inventory_qty_bag_total : result[0].inventory_qty_bag_total,
                    // vouno : result[0].vouno,
                    process_id : result[0].process_id,
                    refno : result[0].refno,
                    menu_id : 0,
                    inventory_amount_total : result[0].inventory_amount_total,
                    order_id : result[0].order_id,
                    vouno : result[0].vouno,
                    yarn_invoice_inventory : []
                }
                DBCON.query(sql1,match, function (err, result1) {
                    if(err){
                        callback(err)
                    }
                    else{
                        yarn_invoice.yarn_invoice_inventory = result1;
                        callback(false,yarn_invoice)
                    }
                })
                    
                // })

            }


            // if (result.length) {
            //     callback(false,result);
            // } else {
            //     callback(false,null);
            // }
        });
    },
    getAll : function(callback){
        DBCON.query(`select  ${TABLE_NAME}.id,${TABLE_NAME}.vouno, ledger.ledger, date_format(${TABLE_NAME}.vou_date, '%d-%m-%Y') as vou_date, order_program.order_no, ${TABLE_NAME}.narration, process.process, ${TABLE_NAME}.refno from ${TABLE_NAME} left join ledger on ledger.id = yarn_invoice.ledger_id  left join process on process.id = yarn_invoice.process_id left join order_program on order_program.id = yarn_invoice.order_id order by ${TABLE_NAME}.id desc `, function(err, result){
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
            var yarn_invoice = {
                ledger_id : body.ledger_id,
                narration : body.narration,
                vou_date : getDBDate(body.vou_date),
                
                inventory_qty_kg_total : body.inventory_qty_kg_total,
                inventory_qty_bag_total : body.inventory_qty_bag_total,
                // vouno : body.vouno,
                process_id : body.process_id,
                refno : body.refno,
                menu_id : 0,
                inventory_amount_total:body.inventory_amount_total,
                order_id : body.order_id,
                vouno : body.vouno,
            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [yarn_invoice,body.id] ,(err, result) => {
                // if(key === body.yarn_invoice.length - 1)
                if (err) {
                    callback(err)
                } else {
                    console.log(result)
                 DBCON.query('delete from yarn_invoice_inventory where vou_id = ? ',body.id ,(err,deleteData) => {
                     if(err)
                     {
                         callback(err)
                     }
                     else{
                        body.yarn_invoice_inventory.map((item, index) => {
                            var yarn_invoice_inventory = {
                                // yarn_invoice_id : result.insertId,
                                vou_id : body.id,
                                fabric_id : item.fabric_id,
                                gsm : item.gsm,
                               qty_kg : item.qty_kg,
                               counts : item.counts,
                               qty_bag : item.qty_bag,
                               qtybag_per : item.qtybag_per,
                               rate : item.rate,
                               amount : item.amount,
                            }
                            DBCON.query(`insert into yarn_invoice_inventory set ?`, yarn_invoice_inventory);
                            if(index === body.yarn_invoice_inventory.length - 1)
                            {
                                callback(false, result, "Yarn invoice Saved Successfully!");
                            }
                    })
                     }
                 })   
                    
                }
            })
        } else {
            // console.log(body.name, "Entered")
            // body.created_at = new Date();
            // DBCON.query(`select count(id) as c from ${TABLE_NAME} where yarn_invoice = ?`, [body.yarn_invoice], (err, count) => {
            //     if (err) {
            //         callback(err)
            //     } else {
            //         // console.log("DB Query Success")
            //         if (count[0].c > 0) {
            //             callback("Yarn invoice Name Already Found!")
            //         } else {
                        var yarn_invoice = {
                            ledger_id : body.ledger_id,
                            narration : body.narration,
                            vou_date : getDBDate(body.vou_date),
                            
                            inventory_qty_kg_total : body.inventory_qty_kg_total,
                            inventory_qty_bag_total : body.inventory_qty_bag_total,
                            // vouno : body.vouno,
                            process_id : body.process_id,
                            refno : body.refno,
                            menu_id : 0,
                            inventory_amount_total : body.inventory_amount_total,
                            order_id : body.order_id,
                            vouno : body.vouno,
                        }
                        DBCON.query(`insert into ${TABLE_NAME} set ?`, yarn_invoice, (err, result) => {
                            // if(key === body.yarn_invoice.length - 1)
                            if (err) {
                                callback(err)
                            } else {
                                console.log(result)
                                body.yarn_invoice_inventory.map((item, index) => {
                                    var yarn_invoice_inventory = {
                                        // yarn_invoice_id : result.insertId,
                                        vou_id : result.insertId,
                                        fabric_id : item.fabric_id,
                                        gsm : item.gsm,
                                       qty_kg : item.qty_kg,
                                       counts : item.counts,
                                       qty_bag : item.qty_bag,
                                       qtybag_per : item.qtybag_per,
                                       rate : item.rate,
                                       amount : item.amount

                        
                                    }
                                    DBCON.query(`insert into yarn_invoice_inventory set ?`, yarn_invoice_inventory);
                                    if(index === body.yarn_invoice_inventory.length - 1)
                                    {
                                        callback(false, result, "Yarn invoice Saved Successfully!");
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
        DBCON.query(`delete from ${TABLE_NAME} where id = ?`, id, (err,result) => {
            if(err)
            {
                callback(err)
            }
            else{
                DBCON.query(`delete from yarn_invoice_inventory where vou_id = ?`, id, (err,result1) => {
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
    getNextYarnInvoiceVouNo : (callback) => {
        var query = 'select ifnull(max(vouno),0) + 1 as max_vou_no from yarn_invoice';

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
    getYarnInvoiceReport: (id, callback) => {
        var yarn_invoice_details = {};
        const QUERY = `select yarn_invoice.id, yarn_invoice.vouno, yarn_invoice.vou_date,process.process, order_program.order_no from yarn_invoice left join process on process.id = yarn_invoice.process_id left join order_program on order_program.id = yarn_invoice.order_id where yarn_invoice.id = ${id};`;

        DBCON.query(QUERY, (err, result) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                yarn_invoice_details = result[0];


                                const GET_INVENTORY_QUERY = `select yarn_invoice_inventory.id, yarn_invoice_inventory.gsm, product.product, yarn_invoice_inventory.counts, yarn_invoice_inventory.qty_kg, yarn_invoice_inventory.rate, yarn_invoice_inventory.amount from yarn_invoice_inventory left join product on product.id = yarn_invoice_inventory.fabric_id where vou_id = ${id};`;

                                DBCON.query(GET_INVENTORY_QUERY, (err, inventory) => {
                                    if (err) {
                                        console.log(err);
                                        callback(err);
                                    } else {
                                        yarn_invoice_details.inventory = inventory;

                                        //total
                                const GET_INVENTORYTOTAL_QUERY = `select yarn_invoice.inventory_qty_kg_total, yarn_invoice.inventory_amount_total from yarn_invoice where yarn_invoice.id = ${id};`;

                                DBCON.query(GET_INVENTORYTOTAL_QUERY, (err, inventorytotal) => {
                                    if (err) {
                                        console.log(err);
                                        callback(err);
                                    } else {
                                        yarn_invoice_details.inventorytotal = inventorytotal;

                                        //total


                                        const GET_COMPANY_DETAILS = `select * from company limit 1`;
                                        const GET_LEDGER_DETAILS = `select ledger.ledger, ledger.delivery_address, ledger.mobile, ledger.phone, ledger.gstno from yarn_invoice left join ledger on yarn_invoice.ledger_id = ledger.id where yarn_invoice.id = ${id}`;
                                        DBCON.query(GET_COMPANY_DETAILS, (err, company_details) => {
                                            if (err) {
                                                console.log(err);
                                                callback(err);

                                            } else {
                                                yarn_invoice_details.company_details = company_details[0];
                                                DBCON.query(GET_LEDGER_DETAILS, (err, ledger_details) => {
                                                    if (err) {
                                                        console.log(err);
                                                        callback(err);
                                                    } else {
                                                        yarn_invoice_details.ledger_details = ledger_details[0];
                                                        callback(false, yarn_invoice_details);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });

                            }
                    //     })
                    // }
                })

            }
        })
    },




}
    
module.exports = Yarn_InvoiceModel;