const menu_masterModel = require('../models/menu_master');
const menu_master = new menu_masterModel();
const lang = require('../lang')

class menu_masterController{
    constructor(){ 
        this.errors ={}
    }

    index = (req, res) => {
        menu_master.queries(req.body,(err,result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    update = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        menu_master.update(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result})
        })
    }

    destroy = (req,res) => {
        menu_master.destroy(req.params.id,(err,result) => {
            err?res.status(500).send({err}):res.send({status:'success',data:result})
        })
    }

    store = (req, res) => {
        if (!this.validate(req.body)) return res.status(400).json({status:'error',errors:this.errors})

        menu_master.store(req.body,(err, result) => {
            err?res.status(500).send({err}):res.status(200).send({status:'success',data:result,id:result.insertId})
        })
    }

    show = (req, res) => {
        menu_master.show(req.params.id, (err, result) => {
            err?res.status(500).send({err}):res.status(200).send(result[0])

        })
    }

    validate(data){
        
        if (data.menu.length <3){
            this.errors.menu =lang.error.menu;
        }
        if (data.menu_route <1){
            this.errors.menu_route =lang.error.menu_route;
        }
        // if (data.email <1){
        //     this.errors.email =lang.error.email;
        // }
        // if (data.phone <1){
        //     this.errors.phone =lang.error.phone;
        // }


        return this.errors.length>0?false:true;
    }

}
module.exports = new menu_masterController()
