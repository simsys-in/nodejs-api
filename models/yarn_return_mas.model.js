// const pool = require('../db_config');
// const DBCON = require('../db_config');
// const {
//     issetNotEmpty
// } = require('../helpers/common');

// function Yarn_ReturnModel() {};

// const TABLE_NAME = 'yarn_return';

// Yarn_ReturnModel.prototype = {
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
//         pool.query(`select  ${TABLE_NAME}.id, ledger.ledger, date_format(${TABLE_NAME}.vou_date, '%d-%m-%Y') as vou_date, order_program.order_no, ${TABLE_NAME}.narration,${TABLE_NAME}.refno, process.process, ${TABLE_NAME}.refno from ${TABLE_NAME} left join ledger on ledger.id = yarn_return.ledger_id  left join process on process.id = yarn_return.process_id left join order_program on order_program.id = yarn_return.order_id `, function(err, result){
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
//             DBCON.query(`select count(id) as c from ${TABLE_NAME} where id != ? and yarn_return = ?`, [body.id, body.name], (err, count) => {
//                 if (err) {
//                     callback(err)
//                 } else {
//                     if (count[0].c > 0) {
//                         callback("Yarn return Already Found!")
//                     } else {
//                         // body.created_at = new Date();
//                         DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [body, body.id], (err, result) => {
//                             if (err) {
//                                 callback(err)
//                             } else {
//                                 callback(false, result, "Yarn return Updated Successfully")
//                             }
//                         })
//                     }
//                 }
//             })
//         } else {
//             // console.log(body.name, "Entered")
//             // body.created_at = new Date();
//             // DBCON.query(`select count(id) as c from ${TABLE_NAME} where yarn_return = ?`, [body.yarn_return], (err, count) => {
//             //     if (err) {
//             //         callback(err)
//             //     } else {
//             //         // console.log("DB Query Success")
//             //         if (count[0].c > 0) {
//             //             callback("Yarn return Name Already Found!")
//             //         } else {
//                         var yarn_return = {
//                             ledger_id : body.ledger_id,
//                             vou_date : body.vou_date,
//                             order_id : body.order_id,
//                             narration : body.narration,
//                             process_id : body.process_id,
//                             refno : body.refno

//                         }
//                         DBCON.query(`insert into ${TABLE_NAME} set ?`, yarn_return, (err, result) => {
//                             if (err) {
//                                 callback(err)
//                             } else {
//                                 console.log(result)
//                                 body.yarn_return_inventory.map((item, index) => {
//                                     var yarn_return_inventory = {
//                                         vou_id : result.insertId,
//                                         fabric_id : item.favric_id,
//                                         gsm : item.gsm,
//                                        qty_kg : item.qty_kg,
//                                        counts : item.counts,
//                                        qty_bag : item.qty_bag,
//                                        qtybag_per : item.qtybag_per,
//                                     }
//                                     DBCON.query(`insert into yarn_return_inventory set ?`, yarn_return_inventory);
//                                     if(index === body.yarn_return_inventory.length - 1)
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

// module.exports = Yarn_ReturnModel;

const pool = require('../db_config');
const DBCON = require('../db_config');
const {
    issetNotEmpty
} = require('../helpers/common');

function Yarn_ReturnModel() {};

const TABLE_NAME = 'yarn_return';

Yarn_ReturnModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM yarn_return WHERE id = ?`;
        console.log(sql);

        let sql1 = `SELECT * FROM  yarn_return_inventory where yarn_return_inventory.vou_id = ?`;

        pool.query(sql, match, function (err, result) {
            if (err){ 
                // throw err
                callback(err)
            }
            else{
                var yarn_return = {
                    ledger_id : result[0].ledger_id,
                    narration : result[0].narration,
                    vou_date : result[0].vou_date,
                    inventory_qty_kg_total : result[0].inventory_qty_kg_total,
                    inventory_qty_bag_total : result[0].inventory_qty_bag_total,
                     process_id : result[0].process_id,
                     refno : result[0].refno,
                    //  vouno : result[0].vouno,
                       menu_id : 0,
                    order_id : result[0].order_id,
                    yarn_return_inventory : []
                }
                pool.query(sql1,match, function (err, result1) {
                    if(err){
                        callback(err)
                    }
                    else{
                        yarn_return.yarn_return_inventory = result1;
                        callback(false,yarn_return)
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
        pool.query(`select  ${TABLE_NAME}.id, ledger.ledger, date_format(${TABLE_NAME}.vou_date, '%d-%m-%Y') as vou_date, order_program.order_no, ${TABLE_NAME}.narration, process.process, ${TABLE_NAME}.refno from ${TABLE_NAME} left join ledger on ledger.id = yarn_return.ledger_id  left join process on process.id = yarn_return.process_id left join order_program on order_program.id = yarn_return.order_id `, function(err, result){
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
            var yarn_return = {
                ledger_id : body.ledger_id,
                narration : body.narration,
                vou_date : body.vou_date,
                inventory_qty_kg_total : body.inventory_qty_kg_total,
                inventory_qty_bag_total : body.inventory_qty_bag_total,
                 process_id : body.process_id,
                 refno : body.refno,
                //  vouno : body.vouno,
                   menu_id : 0,
                order_id : body.order_id,
            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [yarn_return,body.id] ,(err, result) => {
                // if(key === body.yarn_return.length - 1)
                if (err) {
                    callback(err)
                } else {
                    console.log(result)
                 DBCON.query('delete from yarn_return_inventory where vou_id = ? ',body.id ,(err,deleteData) => {
                     if(err)
                     {
                         callback(err)
                     }
                     else{
                        body.yarn_return_inventory.map((item, index) => {
                            var yarn_return_inventory = {
                                // yarn_return_id : result.insertId,
                                vou_id : body.id,
                                fabric_id : item.fabric_id,
                                gsm : item.gsm,
                               qty_kg : item.qty_kg,
                               counts : item.counts,
                               qty_bag : item.qty_bag,
                               qtybag_per : item.qtybag_per,
                            }
                            DBCON.query(`insert into yarn_return_inventory set ?`, yarn_return_inventory);
                            if(index === body.yarn_return_inventory.length - 1)
                            {
                                callback(false, result, "Yarn return Saved Successfully!");
                            }
                    })
                     }
                 })   
                    
                }
            })
        } else {
            // console.log(body.name, "Entered")
            // body.created_at = new Date();
            // DBCON.query(`select count(id) as c from ${TABLE_NAME} where yarn_return = ?`, [body.yarn_return], (err, count) => {
            //     if (err) {
            //         callback(err)
            //     } else {
            //         // console.log("DB Query Success")
            //         if (count[0].c > 0) {
            //             callback("Yarn return Name Already Found!")
            //         } else {
                        var yarn_return = {
                            ledger_id : body.ledger_id,
                            narration : body.narration,
                            vou_date : body.vou_date,
                            inventory_qty_kg_total : body.inventory_qty_kg_total,
                            inventory_qty_bag_total : body.inventory_qty_bag_total,
                             process_id : body.process_id,
                             refno : body.refno,
                            //  vouno : body.vouno,
                               menu_id : 0,
                            order_id : body.order_id,
                        }
                        DBCON.query(`insert into ${TABLE_NAME} set ?`, yarn_return, (err, result) => {
                            // if(key === body.yarn_return.length - 1)
                            if (err) {
                                callback(err)
                            } else {
                                console.log(result)
                                body.yarn_return_inventory.map((item, index) => {
                                    var yarn_return_inventory = {
                                        // yarn_return_id : result.insertId,
                                        vou_id : result.insertId,
                                        fabric_id : item.fabric_id,
                                        gsm : item.gsm,
                                       qty_kg : item.qty_kg,
                                       counts : item.counts,
                                       qty_bag : item.qty_bag,
                                       qtybag_per : item.qtybag_per,
                                    }
                                    DBCON.query(`insert into yarn_return_inventory set ?`, yarn_return_inventory);
                                    if(index === body.yarn_return_inventory.length - 1)
                                    {
                                        callback(false, result, "Yarn return Saved Successfully!");
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
                pool.query(`delete from yarn_return_inventory where vou_id = ?`, id, (err,result1) => {
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
    }
}
    
module.exports = Yarn_ReturnModel;