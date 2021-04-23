const db = require('../../../db_config');

class user_groupModel {
    constructor() {

    }

    queries(req, callback) {
        const query = 'select * from user_group';
        db.query(query,(err, result)=>{callback(err,result)})
    }

    show(id,callback) {
        const query = db.format('select * from user_group where id = ?', id);
        db.query(query,(err, result)=>{callback(err,result)})
    }

    update(req, callback) {
        const query = db.format(`update user_group set ? where id= ?`, [this.fill(req), req.id])
        db.query(query,(err, result)=>{callback(err,result)})
    }

    destroy(id, callback) {
        let query = db.format(`delete from user_group where id= ${id};`)
        db.query(query,(err, result)=>{callback(err,result)})
    }

    store(req, callback) {
        let query = db.format(`insert into user_group set ?`, this.fill(req))
        db.query(query,(err, result)=>{callback(err,result)})
    }

    fill(d){
        let filled ={};
        if (typeof d.id =='string' && d.id) filled.id=d.id
        if (typeof d.user_group =='string') filled.user_group=d.user_group
        // if (typeof d.menu_route =='string') filled.menu_route=d.menu_route
        // if (typeof d.email =='string') filled.email=d.email
        // if (typeof d.phone =='string') filled.phone=d.phone
        console.log(filled);
        return filled;
    }

}
module.exports = user_groupModel;