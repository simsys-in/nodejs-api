const db = require('../../../db_config');

class ledger_groupModel {
    constructor() {

    }

    queries(req, callback) {
        const query = 'select * from ledger_group';
        db.query(query,(err, result)=>{callback(err,result)})
    }

    show(id,callback) {
        const query = db.format('select * from ledger_group where id = ?', id);
        db.query(query,(err, result)=>{callback(err,result)})
    }

    update(req, callback) {
        const query = db.format(`update ledger_group set ? where id= ?`, [this.fill(req), req.id])
        db.query(query,(err, result)=>{callback(err,result)})
    }

    destroy(id, callback) {
        let query = db.format(`delete from ledger_group where id= ${id};`)
        db.query(query,(err, result)=>{callback(err,result)})
    }

    store(req, callback) {
        let query = db.format(`insert into ledger_group set ?`, this.fill(req))
        db.query(query,(err, result)=>{callback(err,result)})
    }

    fill(d){
        let filled ={};
        if (typeof d.id =='string' && d.id) filled.id=d.id
        if (typeof d.ledger_group =='string') filled.ledger_group=d.ledger_group
        console.log(filled);
        return filled;
    }

}
module.exports = ledger_groupModel;