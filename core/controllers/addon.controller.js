//import addonModel from '../model/addon';
const addonModel = require('../models/addon');
const addon_model = new addonModel();

class addonController {
    constructor() {

    }

    index = (req, res) => {
        addon_model.queries((err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    update = (req, res) => {
        addon_model.update(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    destroy = (req, res) => {
        const id = req.query.id;
        console.log(req.body)
        addon_model.destroy((err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }
    store = (req, res) => {
        addon_model.store(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }

    show = (req, res) => {
        addon_model.show(req.body, (err, data) => {
            if (err) {
                console.log(err)
                res.status(500).send(err)
            } else {
                res.send(data)
            }
        })
    }
}
// // addon controller
// // get 
// exports.index = (req,res)=>{
//     addon_model.queries((err,data) => {
//         if(err){
//             console.log(err)
//             res.status(500).send(err)
//         }
//         else{
//             res.send(data)
//         }
//     })
// }
// // put 
// exports.update = (req,res)=>{
//     addon_model.update(req.body,(err,data) => {
//         if(err){
//             console.log(err)
//             res.status(500).send(err)
//         }
//         else{
//             res.send(data)
//         }
//     })
// }
// // delete
// exports.destroy = (req,res)=>{
//     const id = req.query.id;
//     console.log(req.body)
//     addon_model.destroy((err,data) => {
//         if(err){
//             console.log(err)
//             res.status(500).send(err)
//         }
//         else{
//             res.send(data)
//         }
//     })
// }

// // post
// exports.store = (req,res)=>{
//     addon_model.store(req.body,(err,data) => {
//         if(err){
//             console.log(err)
//             res.status(500).send(err)
//         }
//         else{
//             res.send(data)
//         }
//     })
// }
// //get :id
// exports.show = (req,res)=>{
//     addon_model.show(req.body,(err,data) => {
//         if(err){
//             console.log(err)
//             res.status(500).send(err)
//         }
//         else{
//             res.send(data)
//         }
//     })
// }
module.exports = new addonController();