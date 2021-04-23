const db = require('../../../db_config');

class ledger_categoryModel {
    constructor() {

    }

    queries(req, callback) {
        const query = 'select * from ledger_category';
        db.query(query,(err, result)=>{callback(err,result)})
    }

    show(id,callback) {
        const query = db.format('select * from ledger_category where id = ?', id);
        db.query(query,(err, result)=>{callback(err,result)})
    }

    update(req, callback) {
        const query = db.format(`update ledger_category set ? where id= ?`, [this.fill(req), req.id])
        db.query(query,(err, result)=>{callback(err,result)})
    }

    destroy(id, callback) {
        let query = db.format(`delete from ledger_category where id= ${id};`)
        db.query(query,(err, result)=>{callback(err,result)})
    }

    store(req, callback) {
        let query = db.format(`insert into ledger_category set ?`, this.fill(req))
        db.query(query,(err, result)=>{callback(err,result)})
    }

    fill(d){
        let filled ={};
        if (typeof d.id =='string' && d.id) filled.id=d.id
        if (typeof d.ledger_category =='string') filled.ledger_category=d.ledger_category
        // if (typeof d.alias =='string') filled.alias=d.alias
        // if (typeof d.email =='string') filled.email=d.email
        // if (typeof d.phone =='string') filled.phone=d.phone
        console.log(filled);
        return filled;
    }

}
module.exports = ledger_categoryModel;