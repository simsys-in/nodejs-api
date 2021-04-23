const smstemplatesModel = require('../models/smstemplates');
const smstemplates = new smstemplatesModel();
const lang = require('../lang')

class smstemplatesController{
    constructor(){ 
        this.errors ={}
    }

    index = (req, res) => {
        smstemplates.queries(req.body,(err,result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    update = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        smstemplates.update(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    destroy = (req,res) => {
        smstemplates.destroy(req.params.id,(err,result) => {
            err?res.status(500).send({err}):res.send({status:'success',data:result})
        })
    }

    store = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        smstemplates.store(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result,id:result.insertId})
        })
    }

    show = (req, res) => {
        smstemplates.show(req.params.id, (err, result) => {
            err?res.status(500).send({err}):res.status(200).send(result[0])

        })
    }

    validate(data){
        
        if (data.smstemplates.length <3){
            this.errors.smstemplates =lang.error.smstemplates;
            
        }
        // if (data.smstemplates_route <1){
        //     this.errors.smstemplates_route =lang.error.smstemplates_route;
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
module.exports = new smstemplatesController()
