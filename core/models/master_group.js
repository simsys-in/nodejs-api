const db = require('../../db_config');

class master_groupModel { 
    constructor() {}

    queries(callback) {
        db.query('select * from master_group', function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }
    show(callback) {
        db.query('select * from master_group', function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }
    update(body, callback) {
        db.query(`update master_group set ? where id= ?`, [body, body.id], function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }

    destroy(callback) {
        db.query('delete from master_group where id=${id};', function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result)
            }
        })
    }

    store(body, callback) {
        delete body.id;
        db.query(`insert into master_group set ?`, body, function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }

}
module.exports = master_groupModel;