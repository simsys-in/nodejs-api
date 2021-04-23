const isset = function(val)
{
    return val !== undefined && val !== null && val !== 'null' && val !== "undefined"
}

const notEmpty = function(val)
{
    return val !== ""
}


exports.issetNotEmpty = function(val = '')
{
    return isset(val) && notEmpty(val)
}