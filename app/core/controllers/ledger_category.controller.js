const ledger_categoryModel = require('../models/ledger_category');
const ledger_category = new ledger_categoryModel();
const lang = require('../lang')

class ledger_categoryController{
    constructor(){ 
        this.errors ={}
    }

    index = (req, res) => {
        ledger_category.queries(req.body,(err,result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    update = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        ledger_category.update(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    destroy = (req,res) => {
        ledger_category.destroy(req.params.id,(err,result) => {
            err?res.status(500).send({err}):res.send({status:'success',data:result})
        })
    }

    store = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        ledger_category.store(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result,id:result.insertId})
        })
    }

    show = (req, res) => {
        ledger_category.show(req.params.id, (err, result) => {
            err?res.status(500).send({err}):res.status(200).send(result[0])

        })
    }

    validate(data){
        
        if (data.ledger_category.length <3){
            this.errors.ledger_category =lang.error.ledger_category;
        }
        // if (data.alias <1){
        //     this.errors.alias =lang.error.alias;
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
module.exports = new ledger_categoryController()
