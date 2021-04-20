const db = require('../../db_config');

class vouchersModel { 
    constructor() {}

    queries(callback) {
        db.query('select * from route', function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }
    show(id,callback) {
        db.query('select * from route where id = ?', id, function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }
    update(body, callback) {
        db.query(`update route set ? where id= ?`, [body, body.id], function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }

    destroy(callback) {
        db.query('delete from route where id=${id};', function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result)
            }
        })
    }

    store(body, callback) {
        delete body.id;
        db.query(`insert into route set ?`, body, function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }

}
module.exports = vouchersModel;