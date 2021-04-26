
const DBCON = require('../../../db_config');
const {
    issetNotEmpty
} = require('../../../helpers/common');

function ProductDetailsModel() {};

const TABLE_NAME = 'product_details';

ProductDetailsModel.prototype = {
    find: function (match = null, callback) {
       
        let sql = `SELECT * FROM ${TABLE_NAME} WHERE id = ?`;
        // console.log(sql);

        DBCON.query(sql, match, function (err, result) {
            if (err){ 
                callback(err)
            }

            if (result.length) {
                result[0].size_details = [];
                DBCON.query('select concat(size.size1, ",", size.size2, ",",size.size3, ",",size.size4, ",",size.size5, ",",size.size6, ",",size.size7, ",",size.size8, ",",size.size9) as sizes from size where id = ?',result[0].size_id, function (err, data) {
                    if (err) {
                        // console.log(err)
                        callback(err)
                    } else {
                        var sizes = data.length > 0 ? data[0].sizes !== null ? data[0].sizes : "" : "";
                        // console.log(sizes);
                        sizes = sizes.split(",");
                        result[0].size_details = sizes;
                        // res.sendInfo("", sizes);
                        callback(false,result);
                    }
                })
            } else {
                callback(false,[]);
            }
        });
    },
    getAll : function(callback){
        DBCON.query(`select product_details.id,product.product,size.size from ${TABLE_NAME} left join product on product.id=product_details.product_id left join size on size.id = product_details.size_id order by ${TABLE_NAME}.id desc`, function(err, result){
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
        // console.log(body)
        var data = {
            product_id : body.product_id,
            size_id : body.size_id,
            size1_total : body.size1_total,
            size2_total : body.size2_total,
            size3_total : body.size3_total,
            size4_total : body.size4_total,
            size5_total : body.size5_total,
            size6_total : body.size6_total,
            size7_total : body.size7_total,
            size8_total : body.size8_total,
            size9_total : body.size9_total,
            size1_rate : body.size1_rate,
            size2_rate : body.size2_rate,
            size3_rate : body.size3_rate,
            size4_rate : body.size4_rate,
            size5_rate : body.size5_rate,
            size6_rate : body.size6_rate,
            size7_rate : body.size7_rate,
            size8_rate : body.size8_rate,
            size9_rate : body.size9_rate
        }
        // console.log(data.id);
        if (issetNotEmpty(body.id)) {
            DBCON.query(`select count(id) as c from ${TABLE_NAME} where  id != ? and product_id = ? and size_id = ?`, [ body.id,data.product_id, data.size_id], (err, count) => {
                if (err) {
                    callback(err)
                } else {
                    if (count[0].c > 0) {
                        callback("Product Details Already Found!")
                    } else {
                        // body.created_at = new Date();
                        DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [data, body.id], (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                callback(false, result, "Product Details Updated Successfully")
                            }
                        })
                    }
                }
            })
        } else {
            // console.log(body.name, "Entered")
            // body.created_at = new Date();
            DBCON.query(`select count(id) as c from ${TABLE_NAME} where product_id = ? and size_id = ?`, [data.product_id,data.size_id], (err, count) => {
                if (err) {
                    callback(err)
                } else {
                    // console.log("DB Query Success")
                    if (count[0].c > 0) {
                        callback("Product Details Name Already Found!")
                    } else {
                        DBCON.query(`insert into ${TABLE_NAME} set ?`, data, (err, result) => {
                            if (err) {
                                callback(err)
                            } else {
                                callback(false, result, "Product Details Saved Successfully!")
                            }
                        })
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
                callback(false, result)
            }
        })
    }
}

module.exports = ProductDetailsModel;