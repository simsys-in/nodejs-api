const DBCON = require('../../db_config');
const {
    issetNotEmpty
} = require('../../helpers/common');
const moment = require('moment');
const { getDBDate } = require('../../helpers/timer')

function CompanyModel() {};

const TABLE_NAME = 'company';

CompanyModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM company WHERE id = ?`;
        console.log(sql);

        let sql1 = `SELECT * FROM  company_details where company_details.company_id = ?`;

        DBCON.query(sql, match, function (err, result) {
            if (err){ 
                // throw err
                callback(err)
            }
            else{
                var company = {
                    company : result[0].company,
                    currency_code : result[0].currency_code,
                    phone : result[0].phone,
                    apikey : result[0].apikey,
                    email : result[0].email,
                    tin : result[0].tin,
                    acc_start_date : getDBDate(result[0].acc_start_date),
                    gstno : result[0].gstno,
                    week_start_day : result[0].week_start_day,
                    cst : result[0].cst,
                    address : result[0].address,
                    accounts_ledger : result[0].accounts_ledger,
                    bankacno : result[0].bankacno,
                    bankbranch : result[0].bankbranch,
                    bankname : result[0].bankname,
                    ifsc : result[0].ifsc,
                   company_details : []
                }
                DBCON.query(sql1,match, function (err, result1) {
                    if(err){
                        callback(err)
                    }
                    else{
                        company.currency_decimal = result1[0].currency_decimal;
                        company.inventory_decimal = result1[0].inventory_decimal;
                        callback(false,company)
                    }
                })
                    
            

            }


        });
    },
    getAll : function(callback){
        DBCON.query(`select * from ${TABLE_NAME} order by ${TABLE_NAME}.id desc `, function(err, result){
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
    checkAndSaveOrUpdate: function (body, callback) {
        // console.log(body.id, "Entered")
        // body.updated_at = new Date();
         
        if (issetNotEmpty(body.id)) {
            var company = {
                company : body.company,
                currency_code : body.currency_code,
                phone : body.phone,
                apikey : body.apikey,
                email : body.email,
                tin : body.tin,
                acc_start_date : getDBDate(body.acc_start_date),
                gstno : body.gstno,
                week_start_day : body.week_start_day,
                cst : body.cst,
                address : body.address,
                accounts_ledger : body.accounts_ledger,
                bankacno : body.bankacno,
                bankbranch : body.bankbranch,
                bankname : body.bankname,
                ifsc : body.ifsc,
            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [company,body.id] ,(err, result) => {
                if (err) {
                    callback(err)
                } else {
                    console.log(result)
                 DBCON.query('delete from company_details where company_id = ? ',body.id ,(err,deleteData) => {
                     if(err)
                     {
                         callback(err)
                     }
                     else{
                            var company_details = {
                                // company_id : result.insertId,
                                        company_id : body.id,
                                        currency_decimal : body.currency_decimal,
                                        inventory_decimal : body.inventory_decimal,
                            }
                            DBCON.query(`insert into company_details set ?`, company_details, (err, data) => {
                                if(err)
                                {
                                    callback(err);
                                }
                                else{
                                    callback(false, data, "Company saved successfully!")
                                }

                            });
                   
                     }
                 })   
                    
                }
            })
        } else {
           
                        var company = {
                            company : body.company,
                            currency_code : body.currency_code,
                            phone : body.phone,
                            apikey : body.apikey,
                            email : body.email,
                            tin : body.tin,
                            acc_start_date : getDBDate(body.acc_start_date),
                            gstno : body.gstno,
                            week_start_day : body.week_start_day,
                            cst : body.cst,
                            address : body.address,
                            accounts_ledger : body.accounts_ledger,
                            bankacno : body.bankacno,
                            bankbranch : body.bankbranch,
                            bankname : body.bankname,
                            ifsc : body.ifsc,
                            
                            
                        }
                        DBCON.query(`insert into ${TABLE_NAME} set ?`, company, (err, result) => {
                            // if(key === body.company.length - 1)
                            if (err) {
                                callback(err)
                            } else {
                                console.log(result)
                                    var company_details = {
                                        // company_id : result.insertId,
                                        company_id : result.insertId,
                                        currency_decimal : body.currency_decimal,
                                        inventory_decimal : body.inventory_decimal,
                                    }

                                    DBCON.query(`insert into company_details set ?`, company_details, (err, data) => {
                                        if(err)
                                        {
                                            callback(err);
                                        }
                                        else{
                                            callback(false, data, "Company saved successfully!")
                                        }

                                    });
                           
                            }
                        })  
                    }
                },
    //         })
    //     }
    // },
    delete : function(id, callback){
        DBCON.query(`delete from ${TABLE_NAME} where id = ?`, id, (err,result) => {
            if(err)
            {
                callback(err)
            }
            else{
                DBCON.query(`delete from company_details where company_id = ?`, id, (err,result1) => {
                    if(err)
                    {
                        callback(err)
                    }
                    else{
                        callback(false, result1)
                    }
                })
            }
        })
    },
   
    




}
    
module.exports = CompanyModel;