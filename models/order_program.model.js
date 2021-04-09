const pool = require('../db_config');
const DBCON = require('../db_config');
const {
    issetNotEmpty
} = require('../helpers/common');

const moment = require('moment');

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
        
        let sql2 = `SELECT * FROM order_fabric WHERE order_fabric.order_id = ?`;

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
                    ledger_id : result[0].ledger_id,
                    // fabric_id : result[0].fabric_id,
                    // dia : result[0].dia,
                    gsm : result[0].gsm,
                    product_id : 0,
                    menu : 0,
                    order_process : [],
                    order_fabrics : []
                    
                }
                pool.query(sql1, match, function (err, result1) {
                    if(err){
                        callback(err)
                    }else{
                        order_program.order_process = result1;
                        pool.query(sql2, match, function (err, result2) {
                            if(err){
                                callback(err)
                            }else{
                                order_program.order_fabrics = result2;
                                callback(false,order_program);
                            }
                        })
        
                        
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
        pool.query(`select *,DATE_FORMAT(due_date, '%d-%m-%Y') as due_date, DATE_FORMAT(vou_date, '%d-%m-%Y') as vou_date from ${TABLE_NAME} order by ${TABLE_NAME}.id desc`, function(err, result){

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
            var order_details = {
                order_no : body.order_no,
                due_date: body.due_date,
                vou_date : body.orderDate,
                size_id : body.size_id,
                style_id : body.style_id,
                status_id : body.status_id,
                ledger_id : body.ledger_id ? body.ledger_id : 0,
                product_id : 0,
                // dia : body.dia,
                gsm : 0,
                menu_id : 0,
            
            }

            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [order_details, body.id], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    console.log(result);
                    DBCON.query(`delete from order_process where order_id = ?`, body.id, (err, deletedData) =>  {
                        if(err)
                        {
                            callback(err)
                        }
                        else{
                            DBCON.query(`delete from order_fabric where order_id = ?`, body.id, (err, deletedData) =>  {
                                if(err)
                                {
                                    callback(err)
                                }else{
                                     body.order_process.map((item, index) => {
                                var order_process = {
                                    order_id : body.id,
                                    process_id : item.process_id,
                                    ledger_id : item.ledger_id,
                                    rate : item.rate,
                                    waste : item.waste,
                                }
        
                                DBCON.query(`insert into order_process set ?`, order_process);
                                    if(index === body.order_fabrics.length - 1)
                                    {
                                        body.order_fabrics.map((fabric, key) => {
                                            var order_fabrics = {
                                                order_id : body.id,
                                                fabric_id : fabric.fabric_id,
                                                dia : fabric.dia,
                                                gsm : fabric.gsm
                                            }
                                            
                                            DBCON.query(`insert into order_fabric set ?`, order_fabrics);

                                            if(key === body.order_fabrics.length - 1)
                                            {
                                                callback(false, result, "Order Program  Saved Successfully!");
                                            }
                                        })
                                    }
                                
                                })
                            }
                            })
                        }
                    })

                }
            })
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
                            ledger_id : body.ledger_id ? body.ledger_id : 0,
                            product_id : 0,
                            // dia : body.dia,
                            gsm : 0,
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
                                    if(index === body.order_fabrics.length - 1)
                                    {
                                        body.order_fabrics.map((fabric, key) => {
                                            var order_fabrics = {
                                                order_id : result.insertId,
                                                fabric_id : fabric.fabric_id,
                                                dia : fabric.dia,
                                                gsm : fabric.gsm
                                            }
                                            
                                            DBCON.query(`insert into order_fabric set ?`, order_fabrics);

                                            if(key === body.order_fabrics.length - 1)
                                            {
                                                callback(false, result, "Order Program  Saved Successfully!");
                                            }
                                        })
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
                pool.query(`delete from order_process where order_id = ?`, id, (err,result1) => {
                    if(err)
                    {
                        callback(err)
                    }
                    else{
                        pool.query(`delete from order_fabric where order_id = ?`, id, (err,result2) => {
                            if(err)
                            {
                                callback(err)
                            }
                            else{
                                callback(false, result2)
                            }
                        })
                    }
                })
            }
        })
    },
    getNextOrderNo : (callback) => {
        var query = `select max(ifnull(order_no, 0)) + 1 as max_order_no from ${TABLE_NAME}`;

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
    getStyleForOrderId : (order_id,callback) => {
        DBCON.query(`select style_id from ${TABLE_NAME} where id = ${order_id}`,  (err,result) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            else{
                var style_id = result && result[0] &&result[0].style_id ? result[0].style_id : null;
                callback(err, style_id);
            }
        })
    }

   
}

module.exports = OrderProgramModel;