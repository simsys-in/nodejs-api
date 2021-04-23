const db = require('../../../db_config');

class master_groupModel {
    constructor() {

    } 

    queries(req, callback) {
        const query = 'select * from master_group';
        db.query(query,(err, result)=>{callback(err,result)})
    }

    show(id,callback) {
        const query = db.format('select * from master_group where id = ?', id);
        db.query(query,(err, result)=>{callback(err,result)})
    }

    update(req, callback) {
        const query = db.format(`update master_group set ? where id= ?`, [this.fill(req), req.id])
        db.query(query,(err, result)=>{callback(err,result)})
    }

    destroy(id, callback) {
        let query = db.format(`delete from master_group where id= ${id};`)
        db.query(query,(err, result)=>{callback(err,result)})
    }

    store(req, callback) {
        let query = db.format(`insert into master_group set ?`, this.fill(req))
        db.query(query,(err, result)=>{callback(err,result)})
    }

    fill(d){
        let filled ={};
        if (typeof d.id =='string' && d.id) filled.id=d.id
        if (typeof d.master_group =='string') filled.master_group=d.master_group
        console.log(filled);
        return filled;
    }
}
module.exports = master_groupModel;