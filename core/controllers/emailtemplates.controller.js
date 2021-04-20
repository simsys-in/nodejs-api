//import addonModel from '../model/addon';
const emailtemplatesModel = require('../models/emailtemplates');
const emailtemplates = new emailtemplatesModel();

// class emailtemplatesController {
//     constructor() {

//     }

    exports.index = (req, res) => {
        emailtemplates.queries((err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    exports.update = (req, res) => {
        emailtemplates.update(req.body, (err, data) => {
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
        emailtemplates.destroy((err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }
    exports.store = (req, res) => {
        emailtemplates.store(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    exports.show = (req, res) => {
        emailtemplates.show(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }
// }

// module.exports = emailtemplatesController;