const product_categoryModel = require('../models/product_category');
const product_category = new product_categoryModel();
const lang = require('../lang')

class product_categoryController{
    constructor(){ 
        this.errors ={}
    }

    index = (req, res) => {
        product_category.queries(req.body,(err,result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    update = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        product_category.update(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    destroy = (req,res) => {
        product_category.destroy(req.params.id,(err,result) => {
            err?res.status(500).send({err}):res.send({status:'success',data:result})
        })
    }

    store = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        product_category.store(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result,id:result.insertId})
        })
    }

    show = (req, res) => {
        product_category.show(req.params.id, (err, result) => {
            err?res.status(500).send({err}):res.status(200).send(result[0])

        })
    }

    validate(data){
        
        if (data.product_category.length <3){
            this.errors.product_category =lang.error.product_category;
        }
        // if (data.product_category_route <1){
        //     this.errors.product_category_route =lang.error.product_category_route;
        // }
        // if (data.email <1){
        //     this.errors.email =lang.error.email;
        // }
        // if (data.phone <1){
        //     this.errors.phone =lang.error.phone;
        // }


        return Object.keys(this.errors).length>0?false:true;
    }

}
module.exports = new product_categoryController()
