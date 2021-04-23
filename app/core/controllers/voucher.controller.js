const voucherModel = require('../models/voucher');
const voucher = new voucherModel();
const lang = require('../lang')

class voucherController{
    constructor(){ 
        this.errors ={}
    }

    index = (req, res) => {
        voucher.queries(req.body,(err,result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    update = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        voucher.update(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    destroy = (req,res) => {
        voucher.destroy(req.params.id,(err,result) => {
            err?res.status(500).send({err}):res.send({status:'success',data:result})
        })
    }

    store = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        voucher.store(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result,id:result.insertId})
        })
    }

    show = (req, res) => {
        voucher.show(req.params.id, (err, result) => {
            err?res.status(500).send({err}):res.status(200).send(result[0])

        })
    }

    validate(data){
        this.data = {}
        if (data.voucher.length <3){
            this.errors.voucher =lang.error.voucher;
        }
        if (data.route <1){
            this.errors.route =lang.error.route;
        }

        return Object.keys(this.errors).length>0?false:true;
    }

}
module.exports = new voucherController()
