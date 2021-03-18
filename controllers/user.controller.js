const jwt = require("jsonwebtoken");
const DBCON = require('../db_config');
const UserMasModel = require('../models/users.model');

const Users = new UserMasModel();

exports.login = function (req, res) {
    console.log(req.body)
    var email = req.body.username;
    var password = req.body.password;
    var cpin = req.body.cpin;

    process.env['DB_NAME'] = "erp" + cpin;
    console.log(process.env.DB_NAME)
    DBCON.changeUser({
        database: process.env.DB_NAME,
    }, (err) => {
        if (err) throw err;
        console.log(process.env.DB_NAME + " DB Connected")


        Users.login(email, password, function (err, result) {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                console.log(result)
                if (result.length > 0) {
                    var user = Object.assign({}, result[0])
                    console.log(user)
                    if (password === user.password) {
                        var payload = user;
                        console.log("pay", user, payload)
                        let token = jwt.sign(payload, process.env.SIGN_TOKEN, {
                            expiresIn: "4h",
                        });
                        let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                            expiresIn: "1d"
                        });
                        user.token = token;
                        user.userMenuList = [];
                        res.cookie("refreshToken", refreshToken)
                        res.cookie("token", token, {
                            httpOnly: true
                        }).sendSuccess("Login Success", user);


                    } else {
                        res.sendWarning("Password is not matching")
                    }
                } else {
                    res.sendError("User Not Found")
                }
            }
        })
    });
}