const pool = require('../db_config');
const DBCON = require('../db_config');
const {
    issetNotEmpty
} = require('../helpers/common');

const moment = require('moment');

function JobworkOutwardModel() {};

const TABLE_NAME = 'jobwork_outward';

JobworkOutwardModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM jobwork_outward WHERE id = ?`;
        console.log(sql);
        
        let sql1 = `SELECT * FROM jobwork_outward_inventory WHERE jobwork_outward_inventory.order_id = ?`;
        
        let sql2 = `SELECT * FROM jobwork_outward_product WHERE jobwork_outward_product.order_id = ?`;

        pool.query(sql, match, function (err, result) {
            
            if (err){ 
                // throw err
                callback(err)
            }
            else{
                var jobwork_outward ={
                    ledger_id : result[0].ledger_id,
                    vou_date: result[0].vou_date,
                    narration : result[0].narration,
                    inventory_qty_total : result[0].inventory_qty_total,
                    size1_total : result[0].size1_total,
                    size2_total : result[0].size2_total,
                    size3_total : result[0].size3_total,
                    size4_total : result[0].size4_total,
                    size5_total : result[0].size5_total,
                    size6_total : result[0].size6_total,
                    size7_total : result[0].size7_total,
                    size8_total : result[0].size8_total,
                    size9_total : result[0].size9_total,
                    order_id : result[0].order_id,
                    from_process_id : result[0].from_process_id,
                    to_process_id : result[0].to_process_id,
                    product_id : 0,
                    jobwork_outward_inventory : [],
                    jobwork_outward_product : []
                    
                }
                pool.query(sql1, match, function (err, result1) {
                    if(err){
                        callback(err)
                    }else{
                        jobwork_outward.jobwork_outward_inventory = result1;
                        pool.query(sql2, match, function (err, result2) {
                            if(err){
                                callback(err)
                            }else{
                                jobwork_outward.jobwork_outward_product = result2;
                                callback(false,jobwork_outward);
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
        pool.query(`select jobwork_outward.id,jobwork_outward.vouno,jobwork_outward.inventory_qty_total, DATE_FORMAT(jobwork_outward.vou_date, '%d-%m-%Y') as vou_date,ledger.ledger from ${TABLE_NAME} left join ledger on ledger.id=jobwork_outward.ledger_id`, function(err, result){

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
            var jobwork_outward ={
                ledger_id : body.ledger_id,
                vou_date: body.vou_date,
                narration : body.narration,
                inventory_qty_total : body.inventory_qty_total,
                size1_total : body.size1_total,
                size2_total : body.size2_total,
                size3_total : body.size3_total,
                size4_total : body.size4_total,
                size5_total : body.size5_total,
                size6_total : body.size6_total,
                size7_total : body.size7_total,
                size8_total : body.size8_total,
                size9_total : body.size9_total,
                order_id : body.order_id,
                from_process_id : body.from_process_id,
                to_process_id : body.to_process_id,
                product_id : body.product_id,
            
            }

            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [jobwork_outward, body.id], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    console.log(result);
                    DBCON.query(`delete from jobwork_outward_inventory where order_id = ?`, body.id, (err, deletedData) =>  {
                        if(err)
                        {
                            callback(err)
                        }
                        else{
                            DBCON.query(`delete from jobwork_outward_product where order_id = ?`, body.id, (err, deletedData) =>  {
                                if(err)
                                {
                                    callback(err)
                                }else{
                                     body.jobwork_outward_inventory.map((item, index) => {
                                var jobwork_outward_inventory = {
                                    order_id : body.id,
                                    color_id : item.color_id,
                                    size1 : item.size1,
                                    size2 : item.size2,
                                    size3 : item.size3,
                                    size4 : item.size4,
                                    size5 : item.size5,
                                    size6 : item.size6,
                                    size7 : item.size7,
                                    size8 : item.size8,
                                    size9 : item.size9,
                                    qty : item.qty,
                                    vou_id : item.vou_id,
                                    inward_inv_id : item.inward_inv_id
                                }
        
                                DBCON.query(`insert into jobwork_outward_inventory set ?`, jobwork_outward_inventory);
                                    if(index === body.jobwork_outward_product.length - 1)
                                    {
                                        body.jobwork_outward_product.map((jobworkproduct, key) => {
                                            var jobwork_outward_product = {
                                                order_id : body.id,
                                                product_id : jobworkproduct.fabric_id,
                                                qty : jobworkproduct.qty,
                                                vou_id : jobworkproduct.vou_id
                                            }
                                            
                                            DBCON.query(`insert into jobwork_outward_product set ?`, jobwork_outward_product);

                                            if(key === body.jobwork_outward_product.length - 1)
                                            {
                                                callback(false, result, "Jobwork Outward  Updated Successfully!");
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
                        var jobwork_outward ={
                            ledger_id : body.ledger_id,
                            vou_date: body.vou_date,
                            narration : body.narration,
                            inventory_qty_total : body.inventory_qty_total,
                            size1_total : body.size1_total,
                            size2_total : body.size2_total,
                            size3_total : body.size3_total,
                            size4_total : body.size4_total,
                            size5_total : body.size5_total,
                            size6_total : body.size6_total,
                            size7_total : body.size7_total,
                            size8_total : body.size8_total,
                            size9_total : body.size9_total,
                            order_id : body.order_id,
                            from_process_id : body.from_process_id,
                            to_process_id : body.to_process_id,
                            product_id : body.product_id
                        }
                        

                        DBCON.query(`insert into ${TABLE_NAME} set ?`, jobwork_outward, (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                console.log(result);
                                body.jobwork_outward_inventory.map((item, index) => {
                                    varjobwork_outward_inventory = {
                                        order_id : result.insertId,
                                        color_id : item.color_id,
                                        size1 : item.size1,
                                        size2 : item.size2,
                                        size3 : item.size3,
                                        size4 : item.size4,
                                        size5 : item.size5,
                                        size6 : item.size6,
                                        size7 : item.size7,
                                        size8 : item.size8,
                                        size9 : item.size9,
                                        qty : item.qty,
                                        vou_id : item.vou_id,
                                        inward_inv_id : item.inward_inv_id
                                    }
                                    DBCON.query(`insert into jobwork_outward_inventory set ?`, jobwork_outward_inventory);
                                    if(index === body.jobwork_outward_product.length - 1)
                                    {
                                        body.jobwork_outward_product.map((jobworkproduct, key) => {
                                            var jobwork_outward_product = {
                                                order_id : body.id,
                                                product_id : jobworkproduct.fabric_id,
                                                qty : jobworkproduct.qty,
                                                vou_id : jobworkproduct.vou_id
                                            }
                                            
                                            DBCON.query(`insert into jobwork_outward_product set ?`, jobwork_outward_product);

                                            if(key === body.jobwork_outward_product.length - 1)
                                            {
                                                callback(false, result, "Jobwork Outward  Saved Successfully!");
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
                pool.query(`delete from jobwork_outward_inventory where order_id = ?`, id, (err,result1) => {
                    if(err)
                    {
                        callback(err)
                    }
                    else{
                        pool.query(`delete from jobwork_outward_product where order_id = ?`, id, (err,result2) => {
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
   
   
}

module.exports = JobworkOutwardModel;