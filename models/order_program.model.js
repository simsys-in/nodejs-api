const pool = require('../db_config');
const DBCON = require('../db_config');
const {
    issetNotEmpty
} = require('../helpers/common');

function OrderProgramModel() {};

const TABLE_NAME = 'order_program';

OrderProgramModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM order_program WHERE id = ?`;
        console.log(sql);
        
        let sql1 = `SELECT * FROM order_process WHERE order_process.order_id = ?`;
        
         
        pool.query(sql, match, function (err, result) {
            
            if (err){ 
                // throw err
                callback(err)
            }
            else{
                var order_program ={
                    order_no : result[0].order_no,
                    due_date: result[0].due_date,
                    orderDate : result[0].vou_date,
                    size_id : result[0].size_id,
                    style_id : result[0].style_id,
                    status_id : result[0].status_id,
                    fabric_id : result[0].fabric_id,
                    dia : result[0].dia,
                    gsm : result[0].gsm,
                    product_id : 0,
                    menu : 0,
                    order_process : []
                    
                }
                pool.query(sql1, match, function (err, result1) {
                    if(err){
                        callback(err)
                    }else{
                        order_program.order_process = result1;
                        callback(false,order_program);
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
        pool.query(`select * from ${TABLE_NAME}`, function(err, result){

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
            // DBCON.query(`select count(id) as c from ${TABLE_NAME} where id != ? and order_program = ?`, [body.id, body.order_no], (err, count) => {
            //     if (err) {
            //         callback(err)
            //     } else {
            //         if (count[0].c > 0) {
            //             callback("Order Program  Already Found!")
            //         } else {
                        // body.created_at = new Date();
                        DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [body, body.id], (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                callback(false, result, "Order Program  Updated Successfully")
                            }
                        })
            //         }
            //     }
            // })
        } else {
            // DBCON.query(`select count(id) as c from ${TABLE_NAME} where order_program = ?`, [body.order_no], (err, count) => {
            //     if (err) {
            //         callback(err)
            //     } else {
            //         // console.log("DB Query Success")
            //         if (count[0].c > 0) {
            //             callback("Order Program Name Already Found!")
            //         } else {
                        var order_details = {
                            order_no : body.order_no,
                            due_date: body.due_date,
                            vou_date : body.orderDate,
                            size_id : body.size_id,
                            style_id : body.style_id,
                            status_id : body.status_id,
                            fabric_id : body.fabric_id,
                            product_id : 0,
                            dia : body.dia,
                            gsm : body.gsm,
                            menu_id : 0,
                        
                        }

                        DBCON.query(`insert into ${TABLE_NAME} set ?`, order_details, (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                console.log(result);
                                body.order_process.map((item, index) => {
                                    var order_process = {
                                        order_id : result.insertId,
                                        process_id : item.process_id,
                                        ledger_id : item.ledger_id,
                                        rate : item.rate,
                                        waste : item.waste,
                                    }
                                    DBCON.query(`insert into order_process set ?`, order_process);
                                    if(index === body.order_process.length - 1)
                                            {
                                                callback(false, result, "Order Program  Saved Successfully!");
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
                callback(false, result)
            }
        })
    }
}

module.exports = OrderProgramModel;