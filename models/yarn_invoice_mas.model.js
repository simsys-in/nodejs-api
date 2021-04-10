// const pool = require('../db_config');
// const DBCON = require('../db_config');
// const {
//     issetNotEmpty
// } = require('../helpers/common');

// function Yarn_InvoiceModel() {};

// const TABLE_NAME = 'yarn_invoice';

// Yarn_InvoiceModel.prototype = {
//     find: function (match = null, callback) {
//         if (match) {
//             var field = Number.isInteger(match) ? 'id' : 'name';
//         }

//         let sql = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;
//         console.log(sql);

//         pool.query(sql, match, function (err, result) {
//             if (err){ 
//                 // throw err
//                 callback(err)
//             }

//             if (result.length) {
//                 callback(false,result);
//             } else {
//                 callback(false,null);
//             }
//         });
//     },
//     getAll : function(callback){
//         pool.query(`select ${TABLE_NAME}.id, ledger.ledger, ${TABLE_NAME}.narration, date_format(${TABLE_NAME}.vou_date, '%d-%m-%Y') as vou_date, process.process,order_program.order_no, ${TABLE_NAME}.refno from ${TABLE_NAME} left join ledger on ledger.id = yarn_invoice.ledger_id  left join process on process.id = yarn_invoice.process_id left join order_program on order_program.id = yarn_invoice.order_id `, function(err, result){
//             if(err)
//             {
//                 callback(err)
//             }
//             else{
//                 result.map(item => {
//                     item.key = item.id;
//                 })
//                 callback(false, result)
//             }
//         })
//     },
//     checkAndSaveOrUpdate: function (body, callback) {
//         // console.log(body.id, "Entered")
//         // body.updated_at = new Date();
//         if (issetNotEmpty(body.id)) {
//             DBCON.query(`select count(id) as c from ${TABLE_NAME} where id != ? and yarn_invoice = ?`, [body.id, body.name], (err, count) => {
//                 if (err) {
//                     callback(err)
//                 } else {
//                     if (count[0].c > 0) {
//                         callback("Yarn invoice Already Found!")
//                     } else {
//                         // body.created_at = new Date();
//                         DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [body, body.id], (err, result) => {
//                             if (err) {
//                                 callback(err)
//                             } else {
//                                 callback(false, result, "Yarn invoice Updated Successfully")
//                             }
//                         })
//                     }
//                 }
//             })
//         } else {
//             // console.log(body.name, "Entered")
//             // body.created_at = new Date();
//             // DBCON.query(`select count(id) as c from ${TABLE_NAME} where yarn_invoice = ?`, [body.yarn_invoice], (err, count) => {
//             //     if (err) {
//             //         callback(err)
//             //     } else {
//             //         // console.log("DB Query Success")
//             //         if (count[0].c > 0) {
//             //             callback("Yarn invoice Name Already Found!")
//             //         } else {
//                         var yarn_invoice = {
//                             ledger_id : body.ledger_id,
//                             vou_date : body.vou_date,
//                             order_id : body.order_id,
//                             narration : body.narration,
//                             process_id : body.process_id,
//                             refno : body.refno

//                         }
//                         DBCON.query(`insert into ${TABLE_NAME} set ?`, yarn_invoice, (err, result) => {
//                             if (err) {
//                                 callback(err)
//                             } else {
//                                 console.log(result)
//                                 body.yarn_invoice_inventory.map((item, index) => {
//                                     var yarn_invoice_inventory = {
//                                         vou_id : result.insertId,
//                                         fabric_id : item.favric_id,
//                                         gsm : item.gsm,
//                                        qty_kg : item.qty_kg,
//                                        counts : item.counts,
//                                        qty_bag : item.qty_bag,
//                                        qtybag_per : item.qtybag_per,
//                                     }
//                                     DBCON.query(`insert into yarn_invoice_inventory set ?`, yarn_invoice_inventory);
//                                     if(index === body.yarn_invoice_inventory.length - 1)
//                                     {
//                                         callback(false, result, "Product  Saved Successfully!");
//                                     }
//                             })
//                             }
//                         })  
//                     }
//                 },
//     //         })
//     //     }
//     // },
//     delete : function(id, callback){
//         pool.query(`delete from ${TABLE_NAME} where id = ?`, id, (err,result) => {
//             if(err)
//             {
//                 callback(err)
//             }
//             else{
//                 callback(false, result)
//             }
//         })
//     }
// }

// module.exports = Yarn_InvoiceModel;

const pool = require('../db_config');
const DBCON = require('../db_config');
const {
    issetNotEmpty
} = require('../helpers/common');

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

        pool.query(sql, match, function (err, result) {
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
                pool.query(sql1,match, function (err, result1) {
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
        pool.query(`select  ${TABLE_NAME}.id,${TABLE_NAME}.vouno, ledger.ledger, date_format(${TABLE_NAME}.vou_date, '%d-%m-%Y') as vou_date, order_program.order_no, ${TABLE_NAME}.narration, process.process, ${TABLE_NAME}.refno from ${TABLE_NAME} left join ledger on ledger.id = yarn_invoice.ledger_id  left join process on process.id = yarn_invoice.process_id left join order_program on order_program.id = yarn_invoice.order_id order by ${TABLE_NAME}.id desc `, function(err, result){
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
                vou_date : body.vou_date,
                
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
                            vou_date : body.vou_date,
                            
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
        pool.query(`delete from ${TABLE_NAME} where id = ?`, id, (err,result) => {
            if(err)
            {
                callback(err)
            }
            else{
                pool.query(`delete from yarn_invoice_inventory where vou_id = ?`, id, (err,result1) => {
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
    }
}
    
module.exports = Yarn_InvoiceModel;