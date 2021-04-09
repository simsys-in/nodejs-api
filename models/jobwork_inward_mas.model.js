const pool = require('../db_config');
const DBCON = require('../db_config');
const {
    issetNotEmpty
} = require('../helpers/common');

function Jobwork_InwardModel() {};

const TABLE_NAME = 'jobwork_inward';

Jobwork_InwardModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM jobwork_inward WHERE id = ?`;
        console.log(sql);

        let sql1 = `SELECT * FROM  jobwork_inward_inventory where jobwork_inward_inventory.vou_id = ?`;

        pool.query(sql, match, function (err, result) {
            if (err){ 
                // throw err
                callback(err)
            }
            else{
                var jobwork_inward = {
                    ledger_id : result[0].ledger_id,
                    vou_date : result[0].vou_date,
                    narration : result[0].narration,
                    inventory_qty_total : result[0].inventory_qty_total,
                    size1_total : result[0].size1_total,
                    size2_total : result[0].size2_total,
                    size3_total : result[0].size3_total,
                    size4_total : result[0].size4_total,
                    size5_total : result[0].size5_total,
                    size6_total : result[0].size6_total,
                    size7_total : result[0].size7_total,
                    order_id : result[0].order_id,
                    process_id : result[0].process_id,
                    adas : result[0].adas,
                    size8_total : result[0].size8_total,
                    size9_total : result[0].size9_total,
                    jobwork_inward_inventory : []
                }
                pool.query(sql1,match, function (err, result1) {
                    if(err){
                        callback(err)
                    }
                    else{
                        jobwork_inward.jobwork_inward_inventory = result1;
                        callback(false,jobwork_inward)
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
        pool.query(`select  ${TABLE_NAME}.id, ${TABLE_NAME}.vouno, ${TABLE_NAME}.inventory_qty_total, ledger.ledger, date_format(${TABLE_NAME}.vou_date, '%d-%m-%Y') as vou_date, order_program.order_no from ${TABLE_NAME} left join ledger on ledger.id = jobwork_inward.ledger_id left join order_program on order_program.id = jobwork_inward.order_id order by ${TABLE_NAME}.id desc `, function(err, result){
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
            var jobwork_inward = {
                ledger_id : body.ledger_id,
                    vou_date : body.vou_date,
                    narration : body.narration,
                    inventory_qty_total : body.inventory_qty_total,
                    size1_total : body.size1_total,
                    size2_total : body.size2_total,
                    size3_total : body.size3_total,
                    size4_total : body.size4_total,
                    size5_total : body.size5_total,
                    size6_total : body.size6_total,
                    size7_total : body.size7_total,
                    order_id : body.order_id,
                    process_id : body.process_id,
                    adas : body.adas,
                    size8_total : body.size8_total,
                    size9_total : body.size9_total,
            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [jobwork_inward,body.id] ,(err, result) => {
                // if(key === body.jobwork_inward.length - 1)
                if (err) {
                    callback(err)
                } else {
                    console.log(result)
                 DBCON.query('delete from jobwork_inward_inventory where vou_id = ? ',body.id ,(err,deleteData) => {
                     if(err)
                     {
                         callback(err)
                     }
                     else{
                        for (index = 0; index < body.jobwork_inward_inventory.length; index++) {
                            var item = body.jobwork_inward_inventory[index];
                            // body.jobwork_inward_inventory.map((item, index) => {
                            console.log(item)
                            if (item.selected) {
                        // body.jobwork_inward_inventory.map((item, index) => {
                            var jobwork_inward_inventory = {
                                // jobwork_inward_id : result.insertId,
                                vou_id : body.id,
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
                            }
                            DBCON.query(`insert into jobwork_inward_inventory set ?`, jobwork_inward_inventory);
                            if(index === body.jobwork_inward_inventory.length - 1)
                            {
                                callback(false, result, "Jobwork inward Saved Successfully!");
                            }
                    
                     }
                    }}
                 })   
                     
                }
            })
        } else {
           
                        var jobwork_inward = {
                            ledger_id : body.ledger_id,
                            vou_date : body.vou_date,
                            narration : body.narration,
                            inventory_qty_total : body.inventory_qty_total,
                            size1_total : body.size1_total,
                            size2_total : body.size2_total,
                            size3_total : body.size3_total,
                            size4_total : body.size4_total,
                            size5_total : body.size5_total,
                            size6_total : body.size6_total,
                            size7_total : body.size7_total,
                            order_id : body.order_id,
                            process_id : body.process_id,
                            adas : body.adas,
                            size8_total : body.size8_total,
                            size9_total : body.size9_total,
                        }
                        DBCON.query(`insert into ${TABLE_NAME} set ?`, jobwork_inward, (err, result) => {
                            // if(key === body.jobwork_inward.length - 1)
                            if (err) {
                                callback(err)
                            } else {
                                console.log(result)
                                body.jobwork_inward_inventory.map((item, index) => {
                                    if (item.selected) {
                                    var jobwork_inward_inventory = {
                                        // jobwork_inward_id : result.insertId,
                                        vou_id : result.insertId,
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
                                       
                                    }
                                    DBCON.query(`insert into jobwork_inward_inventory set ?`, jobwork_inward_inventory);
                                    if(index === body.jobwork_inward_inventory.length - 1)
                                    {
                                        callback(false, result, "Jobwork inward Saved Successfully!");
                                    }
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
                pool.query(`delete from jobwork_inward_inventory where vou_id = ?`, id, (err,result1) => {
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
    getNextYarnReturnVouNo : (callback) => {
        var query = 'select max(ifnull(vouno, 0)) + 1 as max_vou_no from jobwork_inward';

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
    getNextJobworkInwardVouNo : (callback) => {
        var query = 'select max(ifnull(vouno, 0)) + 1 as max_vou_no from jobwork_inward';

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
    
module.exports = Jobwork_InwardModel;