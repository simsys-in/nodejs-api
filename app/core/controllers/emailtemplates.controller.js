const emailtemplatesModel = require('../models/emailtemplates');
const emailtemplates = new emailtemplatesModel();
const lang = require('../lang')

class emailtemplatesController{
    constructor(){ 
        this.errors ={}
    }

    index = (req, res) => {
        emailtemplates.queries(req.body,(err,result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    update = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        emailtemplates.update(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    destroy = (req,res) => {
        emailtemplates.destroy(req.params.id,(err,result) => {
            err?res.status(500).send({err}):res.send({status:'success',data:result})
        })
    }

    store = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        emailtemplates.store(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result,id:result.insertId})
        })
    }

    show = (req, res) => {
        emailtemplates.show(req.params.id, (err, result) => {
            err?res.status(500).send({err}):res.status(200).send(result[0])

        })
    }

    validate(data){
        
        if (data.emailtemplates_name.length <3){
            this.errors.emailtemplates_name =lang.error.emailtemplates_name;
        }
        return this.errors.length>0?false:true;
    }

}
module.exports = new emailtemplatesController()
