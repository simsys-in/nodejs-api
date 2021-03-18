const pool = require('../db_config')

function User() {};



const TABLE_NAME = 'users';

User.prototype = {
    // Find the user data by id or username.
    find: function (user = null, callback) {
        // if the user variable is defind
        if (user) {
            // if user = number return field = id, if user = string return field = email.
            var field = Number.isInteger(user) ? 'id' : 'email';
        }
        // prepare the sql query
        let sql = `SELECT * FROM ${TABLE_NAME} WHERE ${field} = ?`;
        console.log(sql, field, user)

        pool.query(sql, user, function (err, result) {
            if (err) {
                callback(err)
            } else {
                if (result.length) {
                    callback(false, result);
                } else {
                    callback(false, []);
                }
            }
        });
    },

    login: function (username, password, callback) {
        // find the user data by his username.
        this.find(username, function (err, user) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                if (user) {
                    callback(false, user);
                    // return;

                } else {
                    callback("User Not Found");
                }
            }
        });

    }
}

module.exports = User;