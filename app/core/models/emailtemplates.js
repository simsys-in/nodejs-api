const db = require('../../db_config');

class emailtemplatesModel {
    constructor() {

    }

    queries(req, callback) {
        const query = 'select * from emailtemplates';
        db.query(query,(err, result)=>{callback(err,result)})
    }

    show(id,callback) {
        const query = db.format('select * from emailtemplates where id = ?', id);
        db.query(query,(err, result)=>{callback(err,result)})
    }

    update(req, callback) {
        const query = db.format(`update emailtemplates set ? where id= ?`, [this.fill(req), req.id])
        db.query(query,(err, result)=>{callback(err,result)})
    }

    destroy(id, callback) {
        let query = db.format(`delete from emailtemplates where id= ${id};`)
        db.query(query,(err, result)=>{callback(err,result)})
    }
 
    store(req, callback) {
        let query = db.format(`insert into emailtemplates set ?`, this.fill(req))
        db.query(query,(err, result)=>{callback(err,result)})
    }

    fill(d){
        let filled ={};
        if (typeof d.id =='string' && d.id) filled.id=d.id
        if (typeof d.emailtemplates =='string') filled.emailtemplates=d.emailtemplates
        console.log(filled);
        return filled;
    }

}
module.exports = emailtemplatesModel;