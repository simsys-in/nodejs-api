const vouchersModel = require('../models/vouchers');
const vouchers = new vouchersModel();
const lang = require('../lang')

class vouchersController{
    constructor(){ 
        this.errors ={}
    }

    index = (req, res) => {
        vouchers.queries(req.body,(err,result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    update = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        vouchers.update(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    destroy = (req,res) => {
        vouchers.destroy(req.params.id,(err,result) => {
            err?res.status(500).send({err}):res.send({status:'success',data:result})
        })
    }

    store = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        vouchers.store(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result,id:result.insertId})
        })
    }

    show = (req, res) => {
        vouchers.show(req.params.id, (err, result) => {
            err?res.status(500).send({err}):res.status(200).send(result[0])

        })
    }

    validate(data){
        if (data.vouchers.length <3){
            this.errors.vouchers =lang.error.vouchers;
        }
        if (data.route <1){
            this.errors.route =lang.error.route;
        }

        return Object.keys(this.errors).length>0?false:true;
    }

}
module.exports = new vouchersController()
