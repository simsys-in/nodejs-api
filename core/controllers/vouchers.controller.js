//import vouchersModel from '../model/vouchers';
const vouchersModel = require('../models/vouchers');
const vouchers_model = new vouchersModel();

class vouchersController {
    constructor() {

    }

    index = function (req, res) {
        vouchers_model.queries((err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.sendInfo("",data)
            }
        })
    }

    update = function (req, res) {
        vouchers_model.update(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    destroy = function (req, res) {
        const id = req.query.id;
        console.log(req.body)
        vouchers_model.destroy((err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }
    store = function (req, res) {
        vouchers_model.store(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    show = function (req, res) {
        vouchers_model.show(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }
}

module.exports = new vouchersController();