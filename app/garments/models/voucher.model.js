const DBCON = require('../../db_config');
const {
    issetNotEmpty
} = require('../../helpers/common');

const moment = require('moment');
const {
    getDBDate
} = require('../../helpers/timer')

function VoucherModel() {};

const TABLE_NAME = 'route';

VoucherModel.prototype = {
    find: function (match = null, callback) {
        if (match) {
            var field = Number.isInteger(match) ? 'id' : 'name';
        }

        let sql = `SELECT * FROM route WHERE id = ?`;
        console.log(sql);

        let sql1 = `SELECT * FROM  route_accounts WHERE route_accounts.vou_id = ?`;


        DBCON.query(sql, match, function (err, result) {

            if (err) {
                // throw err
                callback(err)
            } else {
                var route = {
                    voutype: result[0].voutype,
                    menu_type: result[0].menu_type,
                    vou_route: result[0].vou_route,
                    tbl: result[0].tbl,
                    sort_order: 0,
                    menu_parent_id: 0,
                    parent_id: result[0].parent_id,
                    accounts: 0,
                    sts: result[0].sts,
                    display_route: 0,
                    template_route: result[0].template_route,
                    sign: 0,
                    vouno_start: result[0].vouno_start,
                    entry_type: result[0].entry_type,
                    vou_prefix: result[0].vou_prefix,
                    vou_suffix: result[0].vou_suffix,
                    icon: 0,
                    parent_route: 0,
                    visible: 0,
                    ledger2_id: result[0].ledger2_id,
                    print_title: result[0].print_title,
                    terms_condition: result[0].terms_condition,
                    print_route: result[0].print_route,
                    status: result[0].status,
                    smsstatus: result[0].smsstatus,
                    smstemplate_id: 0,
                    addon: 0,
                    smstemplate: result[0].smstemplate,
                    route_accounts: []

                }
                DBCON.query(sql1, match, function (err, result1) {
                    if (err) {
                        callback(err)
                    } else {
                        route.route_accounts = result1;
                        callback(false, route);
                    }
                })



            }

            // if (result.length) {
            //     callback(false,result);
            // } else {
            //     callback(false,null);
            // }
        });
    },
    getAll: function (callback) {
        DBCON.query(`select route.id,route.voutype,route.vou_route from ${TABLE_NAME} order by ${TABLE_NAME}.id desc`, function (err, result) {

            if (err) {
                callback(err)
            } else {
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

            var route = {
                voutype: body.voutype,
                menu_type: body.menu_type,
                vou_route: body.vou_route,
                tbl: body.tbl,
                sort_order: 0,
                menu_parent_id: 0,
                parent_id: body.parent_id,
                accounts: 0,
                sts: body.sts,
                display_route: 0,
                template_route: body.template_route,
                sign: 0,
                vouno_start: body.vouno_start,
                entry_type: 0,
                vou_prefix: body.vou_prefix,
                vou_suffix: body.vou_suffix,
                icon: 0,
                parent_route: 0,
                visible: 0,
                ledger2_id: body.ledger2_id,
                print_title: body.print_title,
                terms_condition: body.terms_condition,
                print_route: body.print_route,
                status: body.status,
                smsstatus: body.smsstatus,
                smstemplate_id: 0,
                addon: 0,
                smstemplate: body.smstemplate,

            }
            DBCON.query(`update ${TABLE_NAME} set ? where id = ?`, [route, body.id], (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    console.log(result);
                    DBCON.query(`delete from route_accounts where vou_id = ?`, body.id, (err, deletedData) => {
                        if (err) {
                            callback(err)
                        } else {
                            if (body.route_accounts.length > 0) {
                                body.route_accounts.map((item, index) => {
                                    var route_accounts = {
                                        vou_id: body.id,
                                        slno: 0,
                                        narration: item.description,
                                        uid: 0,
                                        ledger_id: item.ledger_id,
                                        narration: 0,
                                        percentage: item.percentage,
                                        amount: item.amount,
                                        part: 0,
                                    }
                                    DBCON.query(`insert into route_accounts set ?`, route_accounts);
                                    if (index === body.route_accounts.length - 1) {
                                        callback(false, result, "Voucher  Updated Successfully!");
                                    }
                                })
                            } else {
                                callback(false, result, "Voucher  Updated Successfully!");
                            }
                        }
                    })

                }
            })
        } else {

            var route = {
                voutype: body.voutype,
                menu_type: body.menu_type,
                vou_route: body.vou_route,
                tbl: body.tbl,
                sort_order: 0,
                menu_parent_id: 0,
                parent_id: body.parent_id,
                accounts: 0,
                sts: 0,
                display_route: 0,
                template_route: body.template_route,
                sign: 0,
                vouno_start: body.vouno_start,
                entry_type: 0,
                vou_prefix: body.vou_prefix,
                vou_suffix: body.vou_suffix,
                icon: 0,
                parent_route: 0,
                visible: 0,
                ledger2_id: body.ledger2_id,
                print_title: body.print_title,
                terms_condition: body.terms_condition,
                print_route: body.print_route,
                status: body.status,
                smsstatus: body.smsstatus,
                smstemplate_id: 0,
                addon: 0,
                smstemplate: body.smstemplate,

            }

            DBCON.query(`insert into ${TABLE_NAME} set ?`, route, (err, result) => {
                if (err) {
                    callback(err)
                } else {
                    console.log(result);
                    if (body.route_accounts.length > 0) {

                        body.route_accounts.map((item, index) => {
                            var route_accounts = {
                                vou_id: result.insertId,
                                slno: 0,
                                narration: item.description,
                                uid: 0,
                                ledger_id: item.ledger_id,
                                narration: 0,
                                percentage: item.percentage,
                                amount: item.amount,
                                part: 0,
    
                            }
                            DBCON.query(`insert into route_accounts set ?`, route_accounts);
                            if (index === body.route_accounts.length - 1) {
                                callback(false, result, "Voucher Saved Successfully!");
                            }
                        })
                    }else{
                        callback(false, result, "Voucher Saved Successfully!");

                    }

                }
            })
            //         }
            //     }
            // })
        }
    },
    delete: function (id, callback) {
        DBCON.query(`delete from ${TABLE_NAME} where id = ?`, id, (err, result) => {
            if (err) {
                callback(err)
            } else {
                DBCON.query(`delete from route_accounts where vou_id = ?`, id, (err, result1) => {
                    if (err) {
                        callback(err)
                    } else {
                        callback(false, result1)
                    }
                })

            }
        })
    },

}

module.exports = VoucherModel;