const pool = require('../db_config');
const DBCON = require('../db_config');
const {
    issetNotEmpty
} = require('../helpers/common');

function CuttingProgramModel() {};

const TABLE_NAME = 'cutting_program';

CuttingProgramModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM ${TABLE_NAME} WHERE ${field} = ?`;
        console.log(sql);

        pool.query(sql, match, function (err, result) {
            if (err){ 
                // throw err
                callback(err)
            }

            if (result.length) {
                callback(false,result);
            } else {
                callback(false,null);
            }
        });
    },
    getAll : function(callback){
        pool.query(`select * from ${TABLE_NAME} order by id desc`, function(err, result){

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
            DBCON.query(`select count(id) as c from ${TABLE_NAME} where id != ? and cuttingprogram = ?`, [body.id, body.cuttingprogram], (err, count) => {
                if (err) {
                    callback(err)
                } else {
                    if (count[0].c > 0) {
                        callback("CuttingProgram Already Found!")
                    } else {
                        // body.created_at = new Date();
                        DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [body, body.id], (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                callback(false, result, "CuttingProgram Updated Successfully")
                            }
                        })
                    }
                }
            })
        } else {
            var cutting_program = {
                vou_date : body.voudate,
                narration : body.narration ? body.narration : "",
                inventory_qty_total : body.total_fabric_qty ? body.total_fabric_qty : 0,
                inventory_amount_total : body.total_amount ? body.total_amount : 0,
                order_id : body.order_id ? body.order_id : 0,
                lotno : body.lot_no ? body.lot_no : 0,
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

                }
            })
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
    },
    getNextLotNo : function(callback){
        pool.query(`select max( ifnull(lotno, 0)) + 1 as next_lot_no from ${TABLE_NAME}`, (err, result) => {
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