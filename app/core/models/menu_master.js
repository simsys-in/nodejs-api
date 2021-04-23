const db = require('../../../db_config');

class menu_masterModel {
    constructor() {

    }

    queries(req, callback) {
        const query = 'select * from menu_master';
        db.query(query,(err, result)=>{callback(err,result)})
    }

    show(id,callback) {
        const query = db.format('select * from menu_master where id = ?', id);
        db.query(query,(err, result)=>{callback(err,result)})
    }

    update(req, callback) {
        const query = db.format(`update menu_master set ? where id= ?`, [this.fill(req), req.id])
        db.query(query,(err, result)=>{callback(err,result)})
    }

    destroy(id, callback) {
        let query = db.format(`delete from menu_master where id= ${id};`)
        db.query(query,(err, result)=>{callback(err,result)})
    }

    store(req, callback) {
        let query = db.format(`insert into menu_master set ?`, this.fill(req))
        db.query(query,(err, result)=>{callback(err,result)})
    }

    fill(d){
        let filled ={};
        if (typeof d.id =='string' && d.id) filled.id=d.id
        if (typeof d.menu =='string') filled.menu=d.menu
        if (typeof d.menu_route =='string') filled.menu_route=d.menu_route
        // if (typeof d.email =='string') filled.email=d.email
        // if (typeof d.phone =='string') filled.phone=d.phone
        console.log(filled);
        return filled;
    }

}
module.exports = menu_masterModel;