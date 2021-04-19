//import addonModel from '../model/addon';
const masterModel = require('../models/master');
const master = new masterModel();

// class masterController {
//     constructor() {

//     }

    exports.index = (req, res) => {
        master.queries((err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    exports.update = (req, res) => {
        master.update(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    exports.destroy = (req, res) => {
        const id = req.query.id;
        console.log(req.body)
        master.destroy((err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }
    exports.store = (req, res) => {
        master.store(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    exports.show = (req, res) => {
        master.show(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }
// }

// module.exports = masterController;