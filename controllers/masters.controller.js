const DBCON = require('../db_config');
const { issetNotEmpty } = require('../helpers/common');
const AddLessModel = require('../models/add_less_mas.model');
const AddLess = new AddLessModel();
const LedgerModel = require('../models/ledger_mas.model');
const Ledger = new LedgerModel();


exports.saveAddLess = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    AddLess.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getAllAddLesss = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    AddLess.getAll((err, data) => {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendSuccess("", data)
        }
    })
}


exports.getAllAddLessSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as vale, name from add_less_mas where status = ?', status, function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getAddLess = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);
    const USER = req.user;

    AddLess.find(Number(id), function (err, data) {
        if (err) {
            console.log(err);
            res.sendError(err)
        } else {
            res.sendInfo("", data);
        }
    })
}

exports.deleteAddLess = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);
    const USER = req.user;

    if (issetNotEmpty(id)) {
        AddLess.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Add Less Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Add Less Not Found! ")
    }

}

exports.saveLedger = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Ledger.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getLedger = function (req, res) {
    var ID = req.query.id;
    if(issetNotEmpty(ID))
    {
        Ledger.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    }
    else{
        Ledger.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}


exports.getAllLedgerSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as vale, name from ledger where status = ?', status, function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

// exports.getAddLess = function (req, res) {
//     const id = req.query.id;
//     console.log("ID : " + id);
//     const USER = req.user;

//     AddLess.find(Number(id), function (err, data) {
//         if (err) {
//             console.log(err);
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data);
//         }
//     })
// }

exports.deleteLedger = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Ledger.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Ledger Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Ledger Not Found! ")
    }

}
