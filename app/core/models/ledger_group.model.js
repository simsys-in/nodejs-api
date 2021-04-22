const DBCON =  require('../../db_config');

function ledger_group(){}; 

ledger_group.prototype = {
    find: function (match = null, callback) {

        let sql = `SELECT * FROM ledger_group WHERE id = ?`;
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
        DBCON.query(`select * from ledger_group order by ledger_group.id desc`, function(err, result){

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
    putledger_group:function(body,callback){
        DBCON.query(`update ledger_group set ? where id= ?`, [body, body.id],function (err,result){
            if(err)
            {
                callback(err)
            }
            else{
                callback(false,result);
            }
        })
    },
    deleteledger_group:function(callback){
        DBCON.query('delete from ledger_group where id=${id};',function(err,result){
            if(err)
            {
                callback(err)
            }
            else{
                callback(false,result)
            }
        })
    },
    postledger_group:function(body,callback){
        delete body.id;
        DBCON.query(`insert into ledger_group set ?`, body,function (err,result){
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


module.exports = ledger_group ;