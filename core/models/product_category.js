const db = require('../../db_config');

class product_categoryModel { 
    constructor() {}

    queries(callback) {
        db.query('select id,product_category from product_category', function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }
    show(id,callback) {
        db.query('select * from product_category where id = ?', id, function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }
    update(body, callback) {
        db.query(`update product_category set ? where id= ?`, [body, body.id], function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }

    destroy(callback) {
        db.query('delete from product_category where id=${id};', function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result)
            }
        })
    }

    store(body, callback) {
        delete body.id;
        db.query(`insert into product_category set ?`, body, function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }

}
module.exports = product_categoryModel;