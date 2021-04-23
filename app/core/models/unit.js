const db = require('../../../db_config');

class unitModel {
    constructor() {
        //this.fillable = ["unit","narration","unit_category_id","decimal_digits"]

    }

    queries(req, callback) {
        const query = 'select * from unit';
        db.query(query,(err, result)=>{callback(err,result)})
    }

    show(id,callback) {
        const query = db.format('select * from unit where id = ?', id);
        db.query(query,(err, result)=>{callback(err,result)})
    }

    update(req, callback) {
        const query = db.format(`update unit set ? where id= ?`, [this.fill(req), req.id])
        db.query(query,(err, result)=>{callback(err,result)})
    }

    destroy(id, callback) {
        let query = db.format(`delete from unit where id= ${id};`)
        db.query(query,(err, result)=>{callback(err,result)})
    }

    store(req, callback) {
        let query = db.format(`insert into unit set ?`, this.fill(req))
        db.query(query,(err, result)=>{callback(err,result)})
    }

    fill(d){
        let filled ={};
        if (typeof d.id =='string' && d.id) filled.id=d.id
        if (typeof d.unit =='string') filled.unit=d.unit
        if (typeof d.narration =='string') filled.narration=d.narration
        if (typeof d.decimal_digits =='string') filled.decimal_digits=d.decimal_digits
        // if (typeof d.unit_category_id =='string') filled.unit_category_id=d.unit_category_id
        console.log(filled);
        return filled;
    }
}
module.exports = unitModel;