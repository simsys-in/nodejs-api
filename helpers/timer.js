var moment  = require('moment');
const { format } = require('path');


exports.getDateFormat = function()
{
    return getDateFormat();
}

exports.getDBDateFormat = function()
{
    return getDBDateFormat();
}

exports.getDateTimeFormat = function()
{
    return "DD-MM-YYYY HH:mm:ss";
}

function getDateFormat()
{
    return "DD-MM-YYYY";
}

function getDBDateFormat()
{
    return "YYYY-MM-DD";
}

function getMonthYearFormat()
{
    return "MMM-YYYY";
}

function getDBDateTimeFormat () {
    return "YYYY-MM-DD HH:mm:ss";
}

function getDBFromDateTimeFormat () {
    return "YYYY-MM-DDT00:00:00.000Z";
}

function getDBToDateTimeFormat () {
    return "YYYY-MM-DDT23:59:59.999Z";
}

exports.getDBDateTimeFormat = function()
{
    return getDBDateTimeFormat();
}

exports.checkValidDate = function(date)
{
    var D = moment(date);
    return D.isValid();
}


exports.getStandardDate = function(date = new Date())
{   
    return moment(date).format(getDateFormat());
}


exports.getStandardDateTime = function(date = new Date())
{   
    return moment(date).format(getDateTimeFormat());
}

exports.getDBDateTime = function(date = new Date())
{   
    return moment(date).format(getDBDateTimeFormat());
}


exports.getDBFromDateTime = function(date = new Date())
{   
    return moment(date).format(getDBFromDateTimeFormat());
}


exports.getDBToDateTime = function(date = new Date())
{   
    return moment(date).format(getDBToDateTimeFormat());
}


exports.getCurrentDate = function()
{
    // console.log(moment(new Date()).format(getDateFormat()), "Harish");
    // var date = moment(new Date()).format(getDateFormat());
    var date = moment().format(getDateFormat());
    return date;
}


exports.subtractDays = function(n=1,type="days")
{
    var date = moment().format(getDateFormat());
    
    return moment(date).subtract(n, type).format(getDateFormat());
}


exports.getDifferentBetweenTwoDate = function(start=new Date(),end=new Date(),type="minutes")
{
    // var date = moment().format(getDateFormat());
    
    return moment(start).diff(end,type);
}

exports.getStartDateOfMonth = function(date = new Date())
{
    return moment(date).startOf('month').format(getDateFormat());
}

exports.getEndDateOfMonth = function(date = new Date())
{
    return moment(date).endOf('month').format(getDateFormat());
}

exports.getYearFromDate = function(date = new Date())
{
    return moment(date,getDateFormat()).year();
}

exports.getMonthYearFromDate = function(date = new Date())
{
    return moment(date).format(getMonthYearFormat());
}

exports.getDBDate = function(date = new Date())
{
    return moment(date).format(getDBDateFormat());
}