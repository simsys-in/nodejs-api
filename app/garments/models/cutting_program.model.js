
const DBCON = require('../../../db_config');
const {
    issetNotEmpty
} = require('../../../helpers/common');
const moment = require('moment');
const { getDBDate } = require('../../../helpers/timer')

function CuttingProgramModel() {};

const TABLE_NAME = 'cutting_program';

CuttingProgramModel.prototype = {
    find: function (match = null, callback) {

        let sql = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;
        console.log(sql);

        DBCON.query(sql, match, function (err, result) {
            if (err){ 
                // throw err
                callback(err)
            }

            if (result.length) {
                result[0].fabrics = [];
                DBCON.query(`select * from cutting_program_inventory where vou_id = ?`, match,(err, inventory) => {
                    if(err)
                    {
                        console.log(err);
                        callback(err);
                    }
                    else{
                        if(inventory.length)
                        {
                            inventory.map((item,ind) => {
                                var newFabric = {
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
                                    fabric_id : item.fabric_id,
                                    dia : item.dia,
                                    gsm : item.gsm,
                                    fabric_wastage : item.fabric_wastage,
                                    fabric_qty : item.fabric_qty_net,
                                    employee_id : item.employee_id,
                                    rate : item.rate,
                                    amount : item.amount,
                                    qty_bundle : item.qty_bundle,
                                    fabric_return_qty : item.fabric_return_qty
                                }

                                result[0].fabrics.push(newFabric);
                                if(ind === inventory.length - 1)
                                {
                                    callback(false, result)
                                }
                            })
                        }
                        else{
                            callback(false, result)
                        }
                    }
                })
                // callback(false,result);
            } else {
                callback(false,null);
            }
        });
    },
    getAll : function(callback){
        DBCON.query(`select ${TABLE_NAME}.id, ${TABLE_NAME}.lotno, ${TABLE_NAME}.vou_date, order_program.order_no  from ${TABLE_NAME} left join order_program on order_program.id = ${TABLE_NAME}.order_id order by ${TABLE_NAME}.id desc`, function(err, result){

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
            
            var cutting_program = {
                vou_date : getDBDate(body.voudate),
                narration : body.narration ? body.narration : "",
                inventory_qty_total : body.total_fabric_qty ? body.total_fabric_qty : 0,
                inventory_amount_total : body.total_amount ? body.total_amount : 0,
                order_id : body.order_id ? body.order_id : 0,
                lotno : body.lotno ? body.lotno : 0,
                process_id : body.process_id ? body.process_id : 0,
                cutting_waste_total : body.total_fabric_wastage ? body.total_fabric_wastage : 0,
                fabric_qty_total : body.total_fabric_qty ? body.total_fabric_qty : 0,
                fabric_return_qty_total : body.total_fabric_return_qty ? body.total_fabric_return_qty : 0,
                qty_bundle_total : body.total_fabric_bundle_qty ? body.total_fabric_bundle_qty : 0,
                size1_total : body.total_size1_qty ? body.total_size1_qty : 0,
                size2_total : body.total_size2_qty ? body.total_size2_qty : 0,
                size3_total : body.total_size3_qty ? body.total_size3_qty : 0,
                size4_total : body.total_size4_qty ? body.total_size4_qty : 0,
                size5_total : body.total_size5_qty ? body.total_size5_qty : 0,
                size6_total : body.total_size6_qty ? body.total_size6_qty : 0,
                size7_total : body.total_size7_qty ? body.total_size7_qty : 0,
                size8_total : body.total_size8_qty ? body.total_size8_qty : 0,
                size9_total : body.total_size9_qty ? body.total_size9_qty : 0,
            }

            DBCON.query(`update ${TABLE_NAME} set ? where id= ?`, [cutting_program, body.id], (err, result) => {
                if(err)
                {
                    console.log(err);
                    callback(err);
                }
                else{
                    const ORDER_ID = body.id;
                    DBCON.query(`delete from cutting_program_inventory where vou_id = ?`, ORDER_ID, (err, deletedResult) => {
                        if(err)
                        {
                            console.log(err);
                            callback(err);
                        }
                        else{
                        if (body.fabrics.length > 0) {

                            body.fabrics.map((fabric, index) => {
                             const inventory = {
                                 vou_id : ORDER_ID,
                                 color_id : fabric.color_id ? fabric.color_id : 0,
                                 product_id : fabric.product_id ? fabric.product_id : 0,
                                 size1 : fabric.size1 ? fabric.size1 : 0,
                                 size2 : fabric.size2 ? fabric.size2 : 0,
                                 size3 : fabric.size3 ? fabric.size3 : 0,
                                 size4 : fabric.size4 ? fabric.size4 : 0,
                                 size5 : fabric.size5 ? fabric.size5 : 0,
                                 size6 : fabric.size6 ? fabric.size6 : 0,
                                 size7 : fabric.size7 ? fabric.size7 : 0,
                                 size8 : fabric.size8 ? fabric.size8 : 0,
                                 size9 : fabric.size9 ? fabric.size9 : 0,
                                 qty : fabric.qty ? fabric.qty : 0,
                                 rate : fabric.rate ? fabric.rate : 0,
                                 amount : fabric.amount ? fabric.amount : 0,
                                 employee_id : fabric.employee_id ? fabric.employee_id : 0,
                                 fabric_id : fabric.fabric_id ? fabric.fabric_id : 0,
                                 dia : fabric.dia ? fabric.dia : 0,
                                 gsm : fabric.gsm ? fabric.gsm : 0,
                                 fabric_qty : fabric.fabric_qty ? fabric.fabric_qty : 0,
                                 fabric_wastage : fabric.fabric_wastage ? fabric.fabric_wastage : 0,
                                 fabric_qty_net : fabric.fabric_return_qty ? fabric.fabric_return_qty : 0,
                                 qty_bundle : fabric.qty_bundle ? fabric.qty_bundle : 0,
                                 menu_id : fabric.menu_id ? fabric.menu_id : 0,
                                 ledger_id : fabric.ledger_id ? fabric.ledger_id : 0,
                                 fabric_return_qty : fabric.fabric_return_qty ? fabric.fabric_return_qty : 0
                             }
     
                             DBCON.query(`insert into cutting_program_inventory set ?`, inventory, (err, result1) => {
                                 if(err)
                                 {
                                     console.log(err);
                                     callback(err);
                                 }
                                 else{
                                     if(index === body.fabrics.length - 1)
                                     {
                                         callback(false, result, "Cutting Program updated successfully!")
                                     }
                                 }
                             })
       
    
                        })
                        }else{
                            callback(false, result, "Cutting Program updated successfully!")

                        }

                        }
                    })
                }
            })
        } else {
            var cutting_program = {
                vou_date : getDBDate(body.voudate),
                narration : body.narration ? body.narration : "",
                inventory_qty_total : body.total_fabric_qty ? body.total_fabric_qty : 0,
                inventory_amount_total : body.total_amount ? body.total_amount : 0,
                order_id : body.order_id ? body.order_id : 0,
                lotno : body.lotno ? body.lotno : 0,
                process_id : body.process_id ? body.process_id : 0,
                cutting_waste_total : body.total_fabric_wastage ? body.total_fabric_wastage : 0,
                fabric_qty_total : body.total_fabric_qty ? body.total_fabric_qty : 0,
                fabric_return_qty_total : body.total_fabric_return_qty ? body.total_fabric_return_qty : 0,
                qty_bundle_total : body.total_fabric_bundle_qty ? body.total_fabric_bundle_qty : 0,
                size1_total : body.total_size1_qty ? body.total_size1_qty : 0,
                size2_total : body.total_size2_qty ? body.total_size2_qty : 0,
                size3_total : body.total_size3_qty ? body.total_size3_qty : 0,
                size4_total : body.total_size4_qty ? body.total_size4_qty : 0,
                size5_total : body.total_size5_qty ? body.total_size5_qty : 0,
                size6_total : body.total_size6_qty ? body.total_size6_qty : 0,
                size7_total : body.total_size7_qty ? body.total_size7_qty : 0,
                size8_total : body.total_size8_qty ? body.total_size8_qty : 0,
                size9_total : body.total_size9_qty ? body.total_size9_qty : 0,
            }

            DBCON.query(`insert into ${TABLE_NAME} set ?`, cutting_program, (err, result) => {
                if(err)
                {
                    console.log(err);
                    callback(err);
                }
                else{
                    const ORDER_ID = result.insertId;
                    if (body.fabrics.length > 0) { 

                        body.fabrics.map((fabric, index) => {
                            const inventory = {
                                vou_id : ORDER_ID,
                                color_id : fabric.color_id ? fabric.color_id : 0,
                                product_id : fabric.product_id ? fabric.product_id : 0,
                                size1 : fabric.size1 ? fabric.size1 : 0,
                                size2 : fabric.size2 ? fabric.size2 : 0,
                                size3 : fabric.size3 ? fabric.size3 : 0,
                                size4 : fabric.size4 ? fabric.size4 : 0,
                                size5 : fabric.size5 ? fabric.size5 : 0,
                                size6 : fabric.size6 ? fabric.size6 : 0,
                                size7 : fabric.size7 ? fabric.size7 : 0,
                                size8 : fabric.size8 ? fabric.size8 : 0,
                                size9 : fabric.size9 ? fabric.size9 : 0,
                                qty : fabric.qty ? fabric.qty : 0,
                                rate : fabric.rate ? fabric.rate : 0,
                                amount : fabric.amount ? fabric.amount : 0,
                                employee_id : fabric.employee_id ? fabric.employee_id : 0,
                                fabric_id : fabric.fabric_id ? fabric.fabric_id : 0,
                                dia : fabric.dia ? fabric.dia : 0,
                                gsm : fabric.gsm ? fabric.gsm : 0,
                                fabric_qty : fabric.fabric_qty ? fabric.fabric_qty : 0,
                                fabric_wastage : fabric.fabric_wastage ? fabric.fabric_wastage : 0,
                                fabric_qty_net : fabric.fabric_return_qty ? fabric.fabric_return_qty : 0,
                                qty_bundle : fabric.qty_bundle ? fabric.qty_bundle : 0,
                                menu_id : fabric.menu_id ? fabric.menu_id : 0,
                                ledger_id : fabric.ledger_id ? fabric.ledger_id : 0,
                                fabric_return_qty : fabric.fabric_return_qty ? fabric.fabric_return_qty : 0
                            }
    
                            DBCON.query(`insert into cutting_program_inventory set ?`, inventory, (err, result1) => {
                                if(err)
                                {
                                    console.log(err);
                                    callback(err);
                                }
                                else{
                                    if(index === body.fabrics.length - 1)
                                    {
                                        callback(false, result, "Cutting Program Saved successfully!")
                                    }
                                }
                            })
    
                        })
                    }else{
                        callback(false, result, "Cutting Program Saved successfully!")

                    }


                }
            })
        }
    },
    delete : function(id, callback){
        DBCON.query(`delete from ${TABLE_NAME} where id = ?`, id, (err,result) => {
            if(err)
            {
                callback(err)
            }
            else{
                DBCON.query(`delete from cutting_program_inventory where vou_id = ?`, id, (err, res) => {
                    callback(false, result)
                })
            }
        })
    },
    getNextLotNo : function(callback){
        DBCON.query(`select max( ifnull(lotno, 0)) + 1 as next_lot_no from ${TABLE_NAME}`, (err, result) => {
            if(err)
            {
                console.log(err);
                callback(err);
            }
            else{
                var next_lot_no = result && result[0] && result[0].next_lot_no ? result[0].next_lot_no : 1;
                callback(false, next_lot_no);
            }
        })
    }
}

module.exports = CuttingProgramModel;