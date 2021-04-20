const db = require('../../db_config');

class addonModel { 
    constructor() {}

    queries(callback) {
        db.query('select * from addon', function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }
    show(id,callback) {
        db.query('select * from addon where id = ?', id, function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }
    update(body, callback) {
        db.query(`update addon set ? where id= ?`, [body, body.id], function (err, result) {
            if (err) {
                callback(err)
            } else {
                callback(false, result);
            }
        })
    }

    destroy(id,callback) {
        db.query(`delete from addon where id= ${id};`, function (err, result) {
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
        if (data.addon !== "" && data.addon !== undefined && data.addon !== null){
            if(err){
                callback(err)
            }
            else{
                db.query(`insert into addon set ?`, body, function (err, result) {
                    if (err) {
                        callback(err)
                    } else {
                        callback(false, result);
                    }
                })          
            }
        }
        else{
            callback("product group cannot be null")
        }

    }

}
module.exports = addonModel;