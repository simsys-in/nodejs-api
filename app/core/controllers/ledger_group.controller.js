const ledger_groupModel = require('../models/ledger_group');
const ledger_group = new ledger_groupModel();
const lang = require('../lang')

class ledger_groupController{
    constructor(){ 
        this.errors ={}
    }

    index = (req, res) => {
        ledger_group.queries(req.body,(err,result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    update = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        ledger_group.update(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    destroy = (req,res) => {
        ledger_group.destroy(req.params.id,(err,result) => {
            err?res.status(500).send({err}):res.send({status:'success',data:result})
        })
    }

    store = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        ledger_group.store(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result,id:result.insertId})
        })
    }

    show = (req, res) => {
        ledger_group.show(req.params.id, (err, result) => {
            err?res.status(500).send({err}):res.status(200).send(result[0])

        })
    }

    validate(data){
        
        if (data.ledger_group.length <3){
            this.errors.ledger_group =lang.error.ledger_group;
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
        return this.errors.length>0?false:true;
    }

}
module.exports = new ledger_groupController()
