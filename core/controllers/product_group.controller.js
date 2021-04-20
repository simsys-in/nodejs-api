const product_groupModel = require('../models/product_group');
const product_group = new product_groupModel();


    exports.index = (req, res) => {
        product_group.queries((err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data) 
            }
        })
    }

    exports.update = (req, res) => {
        product_group.update(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    exports.destroy = (req,res) => {
        const id = req.params.id;
        console.log(req.body)
        product_group.destroy(id,(err,data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    exports.store = (req, res) => {
        product_group.store(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    exports.show = (req, res) => {
        product_group.show(req.params.id, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data[0])
            }
        })
    }
