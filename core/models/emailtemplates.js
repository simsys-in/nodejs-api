const db = require('../../db_config');

class emailtemplatesModel { 
    constructor() {}

    queries(callback) {
        db.query('select * from emailtemplates', function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }
    show(callback) {
        db.query('select * from emailtemplates where id=?',id, function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }
    update(body, callback) {
        db.query(`update emailtemplates set ? where id= ?`, [body, body.id], function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }

    destroy(callback) {
        db.query('delete from emailtemplates where id=${id};', function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result)
            }
        })
    }

    store(body, callback) {
        delete body.id;
        db.query(`insert into emailtemplates set ?`, body, function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }

}
module.exports = emailtemplatesModel;