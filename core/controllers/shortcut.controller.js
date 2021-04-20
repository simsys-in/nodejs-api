//import addonModel from '../model/addon';
const shortcutModel = require('../models/shortcut');
const shortcut = new shortcutModel();

// class shortcutController {
//     constructor() {

//     }

    exports.index = (req, res) => {
        shortcut.queries((err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    exports.update = (req, res) => {
        shortcut.update(req.body, (err, data) => {
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
        shortcut.destroy((err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }
    exports.store = (req, res) => {
        shortcut.store(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    exports.show = (req, res) => {
        shortcut.show(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }
// }

// module.exports = shortcutController;