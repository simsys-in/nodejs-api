const db = require('../../db_config');

class masterModel { 
    constructor() {}

    queries(callback) {
        db.query('select * from master', function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }
    show(callback) {
        db.query('select * from master', function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }
    update(body, callback) {
        db.query(`update master set ? where id= ?`, [body, body.id], function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }

    destroy(callback) {
        db.query('delete from master where id=${id};', function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result)
            }
        })
    }

    store(body, callback) {
        delete body.id;
        db.query(`insert into master set ?`, body, function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }

}
module.exports = masterModel;