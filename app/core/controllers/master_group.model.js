const master_groupModel = require('../models/master_group');
const master_group = new master_groupModel();

// master_group controller
// get 
exports.index = (req,res)=>{
    master_group.queries((err,data) => {
        if(err){
            console.log(err)
            res.status(500).send(err)
        }
        else{
            res.send(data)
        }
    })
}
// put 
exports.update = (req,res)=>{
    master_group.update(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500).send(err)
        }
        else{
            res.send(data)
        }
    })
}
// delete
exports.destroy = (req,res)=>{
    const id = req.query.id;
    console.log(req.body)
    master_group.destroy((err,data) => {
        if(err){
            console.log(err)
            res.status(500).send(err)
        }
        else{
            res.send(data)
        }
    })
}

// post
exports.store = (req,res)=>{
    master_group.store(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500).send(err)
        }
        else{
            res.send(data)
        }
    })
}
//get :id
exports.show = (req,res)=>{
    master_group.show(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500).send(err)
        }
        else{
            res.send(data)
        }
    })
}