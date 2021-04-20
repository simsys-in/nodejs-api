//import addonModel from '../model/addon';
const menu_masterModel = require('../models/menu_master');
const menu_master = new menu_masterModel();

// class menu_masterController {
//     constructor() {

//     }

    exports.index = (req, res) => {
        menu_master.queries((err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    exports.update = (req, res) => {
        menu_master.update(req.body, (err, data) => {
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
        menu_master.destroy((err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }
    exports.store = (req, res) => {
        menu_master.store(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    exports.show = (req, res) => {
        menu_master.show(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }
// }

// module.exports = menu_masterController;