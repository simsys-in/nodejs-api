const pool = require('../db_config');
const DBCON = require('../db_config');
const {
    issetNotEmpty
} = require('../helpers/common');

function ProductModel() {};

const TABLE_NAME = 'product';

ProductModel.prototype = {
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
        pool.query(`select ${TABLE_NAME}.id, product_group.product_group, product_category.product_category, ${TABLE_NAME}.product,unit.unit,${TABLE_NAME}.qrcode,${TABLE_NAME}.narration, ${TABLE_NAME}.purchase_rate, ${TABLE_NAME}.sales_rate, ${TABLE_NAME}.qty, ${TABLE_NAME}.purchase_rate_last, ${TABLE_NAME}.min_stock_qty, ${TABLE_NAME}.	hsnsac, ${TABLE_NAME}.gst, ${TABLE_NAME}.sgst, ${TABLE_NAME}.cgst, ${TABLE_NAME}.sts, ${TABLE_NAME}.unit2_id, ${TABLE_NAME}.unit2_convert, ${TABLE_NAME}.clo_qty, ${TABLE_NAME}.status_id, ${TABLE_NAME}.	purchase_rate_incltax, ${TABLE_NAME}.sales_rate_incltax, ${TABLE_NAME}.purchase_amount, ${TABLE_NAME}.sales_amount, ${TABLE_NAME}.alias from ${TABLE_NAME} left join product_group on product_group.id = product.product_group_id left join product_category on product_category.id = product.product_category_id left join unit on unit.id = product.unit_id ` , function(err, result){

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
            DBCON.query(`select count(id) as c from ${TABLE_NAME} where id != ? and product = ?`, [body.id, body.product], (err, count) => {
                if (err) {
                    callback(err)
                } else {
                    if (count[0].c > 0) {
                        callback("Product  Already Found!")
                    } else {
                        // body.created_at = new Date();
                        DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [body, body.id], (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                callback(false, result, "Product  Updated Successfully")
                            }
                        })
                    }
                }
            })
        } else {
            DBCON.query(`select count(id) as c from ${TABLE_NAME} where product = ?`, [body.product], (err, count) => {
                if (err) {
                    callback(err)
                } else {
                    // console.log("DB Query Success")
                    if (count[0].c > 0) {
                        callback("Product  Name Already Found!")
                    } else {
                        var product_details = {
                            product_group_id : body.product_group_id,
                            product_category_id : body.product_category_id,
                            product : body.product,
                            unit_id : body.unit_id,
                            qrcode : body.qrcode,
                            narration : body.narration,
                            purchase_rate : 0,
                            sales_rate : 0,
                            qty : 0,
                            purchase_rate_last : 0,
                            min_stock_qty : 0,
                            hsnsac : body.hsnsac,
                            gst : body.gst,
                            sgst : body.sgst,
                            cgst : body.cgst,
                            sts : 0,
                            unit2_id : body.unit2_id,
                            unit2_convert : 0,
                            clo_qty : 0,
                            status_id : body.status,
                            purchase_rate_incltax : body.purchase_rate_incltax,
                            sales_rate_incltax : body.sales_rate_incltax,
                            purchase_amount : body.purchase_amount,
                            sales_amount : body.sales_amount,
                            alias : body.alias,
                        }

                        DBCON.query(`insert into ${TABLE_NAME} set ?`, product_details, (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                console.log(result);
                                body.sales_price.map((item, index) => {
                                    var product_rate = {
                                        product_id : result.insertId,
                                        sales_rate : item.mrp,
                                        price_group_id : item.price_group,
                                        purchase_rate : item.sales_rate,
                                    }
                                    DBCON.query(`insert into product_rate set ?`, product_rate);
                                    if(index === body.sales_price.length - 1)
                                    {
                                        body.stock_details.map((stock, key) => {
                                            var stock_details = {
                                                product_id : result.insertId,
                                                godown_id : stock.godown,
                                                qty : stock.qty
                                            }
                                            
                                            DBCON.query(`insert into product_stock set ?`, stock_details);

                                            if(key === body.stock_details.length - 1)
                                            {
                                                callback(false, result, "Product  Saved Successfully!");
                                            }
                                        })
                                    }
                                })

                            }
                        })
                    }
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
    }
}

module.exports = ProductModel;