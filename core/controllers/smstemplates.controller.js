//import addonModel from '../model/addon';
const smstemplatesModel = require('../models/smstemplates');
const smstemplates = new smstemplatesModel();

// class smstemplatesController {
//     constructor() {

//     }

    exports.index = (req, res) => {
        smstemplates.queries((err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    exports.update = (req, res) => {
        smstemplates.update(req.body, (err, data) => {
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
        smstemplates.destroy((err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }
    exports.store = (req, res) => {
        smstemplates.store(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    exports.show = (req, res) => {
        smstemplates.show(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }
// }

// module.exports = smstemplatesController;