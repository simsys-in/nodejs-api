const db = require('../../../db_config');

class companyModel {
    constructor() {

    }

    queries(req, callback) {
        const query = 'select * from company';
        db.query(query,(err, result)=>{callback(err,result)})
    }

    show(id,callback) {
        const query = db.format('select * from company where id = ?', id);
        db.query(query,(err, result)=>{callback(err,result)})
    }

    update(req, callback) {
        const query = db.format(`update company set ? where id= ?`, [this.fill(req), req.id])
        db.query(query,(err, result)=>{callback(err,result)})
    }

    destroy(id, callback) {
        let query = db.format(`delete from company where id= ${id};`)
        db.query(query,(err, result)=>{callback(err,result)})
    }

    store(req, callback) {
        let query = db.format(`insert into company set ?`, this.fill(req))
        db.query(query,(err, result)=>{callback(err,result)})
    }

    fill(d){
        let filled ={};
        if (typeof d.id =='string' && d.id) filled.id=d.id
        if (typeof d.company =='string') filled.company=d.company
        if (typeof d.alias =='string') filled.alias=d.alias
        if (typeof d.email =='string') filled.email=d.email
        if (typeof d.phone =='string') filled.phone=d.phone
        console.log(filled);
        return filled;
    }

}
module.exports = companyModel;