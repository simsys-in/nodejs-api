const addonModel = require('../models/addon.model');
const addon_model=new addonModel();

// addon controller
// get 
exports.index = function(req,res){
    addon_model.getaddon((err,data) => {
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
exports.update = function(req,res){
    addon_model.putaddon(req.body,(err,data) => {
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
exports.destroy = function(req,res){
    const id = req.query.id;
    console.log(req.body)
    addon_model.deleteaddon((err,data) => {
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
exports.store = function(req,res){
    addon_model.postaddon(req.body,(err,data) => {
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
exports.show = function(req,res){
    addon_model.postaddon(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500).send(err)
        }
        else{
            res.send(data)
        }
    })
}