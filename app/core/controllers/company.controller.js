const companyModel = require('../models/company');
const company = new companyModel();
const lang = require('../lang')

class companyController{
    constructor(){ 
        this.errors ={}
    }

    index = (req, res) => {
        company.queries(req.body,(err,result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    update = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        company.update(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    destroy = (req,res) => {
        company.destroy(req.params.id,(err,result) => {
            err?res.status(500).send({err}):res.send({status:'success',data:result})
        })
    }

    store = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        company.store(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result,id:result.insertId})
        })
    }

    show = (req, res) => {
        company.show(req.params.id, (err, result) => {
            err?res.status(500).send({err}):res.status(200).send(result[0])

        })
    }

    validate(data){
        
        if (data.company.length <3){
            this.errors.company =lang.error.company;
        }
        if (data.alias <1){
            this.errors.alias =lang.error.alias;
        }
        if (data.email <1){
            this.errors.email =lang.error.email; 
        }
        if (data.phone <10){
            this.errors.phone =lang.error.phone;
        }


        return Object.keys(this.errors).length>0?false:true;
    }

}
module.exports = new companyController()
