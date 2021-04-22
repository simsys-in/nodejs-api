const masterModel = require('../models/master');
const master = new masterModel();
const lang = require('../lang')

class masterController{
    constructor(){ 
        this.errors ={}
    }

    index = (req, res) => {
        master.queries(req.body,(err,result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    update = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        master.update(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    destroy = (req,res) => {
        master.destroy(req.params.id,(err,result) => {
            err?res.status(500).send({err}):res.send({status:'success',data:result})
        })
    }

    store = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        master.store(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result,id:result.insertId})
        })
    }

    show = (req, res) => {
        master.show(req.params.id, (err, result) => {
            err?res.status(500).send({err}):res.status(200).send(result[0])

        })
    }

    validate(data){
        
        if (data.master.length <3){
            this.errors.master =lang.error.master;
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
module.exports = new masterController()
