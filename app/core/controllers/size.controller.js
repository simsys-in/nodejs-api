const sizeModel = require('../models/size');
const size = new sizeModel();
const lang = require('../lang')

class sizeController{
    constructor(){ 
        this.errors ={}
    }

    index = (req, res) => {
        size.queries(req.body,(err,result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    update = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        size.update(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    destroy = (req,res) => {
        size.destroy(req.params.id,(err,result) => {
            err?res.status(500).send({err}):res.send({status:'success',data:result})
        })
    }

    store = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        size.store(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result,id:result.insertId})
        })
    }

    show = (req, res) => {
        size.show(req.params.id, (err, result) => {
            err?res.status(500).send({err}):res.status(200).send(result[0])

        })
    }

    validate(data){
        
        if (data.size.length <3){
            this.errors.size =lang.error.size;
            
        }
        // if (data.size_route <1){
        //     this.errors.size_route =lang.error.size_route;
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
module.exports = new sizeController()
