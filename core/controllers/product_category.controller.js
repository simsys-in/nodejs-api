const product_categoryModel = require('../models/product_category');
const product_category = new product_categoryModel();


    exports.index = (req, res) => {
        product_category.queries((err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    exports.update = (req, res) => {
        product_category.update(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    exports.destroy = (req,res) => {
        const id = req.query.id;
        console.log(req.body)
        product_category.destroy((err,data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    exports.store = (req, res) => {
        product_category.store(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    exports.show = (req, res) => {
        product_category.show(req.params.id, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data[0])
            }
        })
    }
