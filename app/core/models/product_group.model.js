const DBCON =  require('../../../db_config');

function product_group(){}; 

product_group.prototype = {
    find: function (match = null, callback) {

        let sql = `SELECT * FROM product_group WHERE id = ?`;
        console.log(sql);

        DBCON.query(sql, match, function (err, result) {
            if (err){ 
                callback(err)
            }

            if (result.length) {
                callback(false,result);
            } else {
                callback(false,null);
            }
        });
    },
    getAll : function(callback){
        DBCON.query(`select * from product_group order by product_group.id desc`, function(err, result){

            if(err)
            {
                callback(err)
            }
            else{
                result.map(item => {
                    item.key = item.id;
                })
                callback(false, result)
            }
        })
    },
    putproduct_group:function(body,callback){
        DBCON.query(`update product_group set ? where id= ?`, [body, body.id],function (err,result){
            if(err)
            {
                callback(err)
            }
            else{
                callback(false,result);
            }
        })
    },
    deleteproduct_group:function(callback){
        DBCON.query('delete from product_group where id=${id};',function(err,result){
            if(err)
            {
                callback(err)
            }
            else{
                callback(false,result)
            }
        })
    },
    postproduct_group:function(body,callback){
        delete body.id;
        DBCON.query(`insert into product_group set ?`, body,function (err,result){
            if(err)
            {
                callback(err)
            }
            else{
                callback(false,result);
            }
        })
    }
}


module.exports = product_group ;