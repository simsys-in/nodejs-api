const db = require('../../db_config');

class product_groupModel {
    constructor() {}

    queries(callback) {
        db.query('select id,product_group,narration,product_parent_id from product_group', function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }
    show(id, callback) {
        db.query('select * from product_group where id = ?', id, function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }
    update(body, callback) {
        if (body.product_group.length > 3) {
            db.query(`update product_group set ? where id= ?`, [body, body.id], function (err, result) {
                if (err) {
                    callback(err)
                } else {
                    callback(false, result);
                }
            })
        } else {
            callback("product group should be more than 3 characters")
        }
    }

    destroy(id, callback) {
        db.query(`delete from product_group where id= ${id};`, function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result)
            }
        })
    }

    store(body, callback) {
        delete body.id;
        var data = body;
        // if (data.product_group !== "" && data.product_group !== undefined && data.product_group !== null) {
        if (body.product_group.length > 3) {

            db.query(`insert into product_group set ?`, body, function (err, result) {
                if (err) {
                    callback(err)
                } 
                else {
                    callback(false, result);
                }
            })
        } 
        else {
            callback("product group should be more than 3 characters")
        }

    } 

}
module.exports = product_groupModel;