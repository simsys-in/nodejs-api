const { request } = require("express");

exports.getCookies = function(callback){
    var userData = localStorage.getItem("user");
    callback(false,userData)
}