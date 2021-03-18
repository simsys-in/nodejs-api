// const DBCON = require('../db_config');
const { resume } = require('../db_config');
const USER_MODEL = require('../models/user_mas.model');

const User = new USER_MODEL()

exports.save_user = function(req, res)
{

}

exports.getAllUsers = function(res, res)
{
    User.getAll((results) => {
        res.sendSuccess(results)
    })
}