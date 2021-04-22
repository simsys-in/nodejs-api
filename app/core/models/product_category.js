const db = require('../../db_config');

class product_categoryModel {
    constructor() {

    }

    queries(req, callback) {
        const query = 'select * from product_category';
        db.query(query,(err, result)=>{callback(err,result)})
    }

    show(id,callback) {
        const query = db.format('select * from product_category where id = ?', id);
        db.query(query,(err, result)=>{callback(err,result)})
    }

    update(req, callback) {
        const query = db.format(`update product_category set ? where id= ?`, [this.fill(req), req.id])
        db.query(query,(err, result)=>{callback(err,result)})
    }

    destroy(id, callback) {
        let query = db.format(`delete from product_category where id= ${id};`)
        db.query(query,(err, result)=>{callback(err,result)})
    }

    store(req, callback) {
        let query = db.format(`insert into product_category set ?`, this.fill(req))
        db.query(query,(err, result)=>{callback(err,result)})
    }

    fill(d){
        let filled ={};
        if (typeof d.id =='string' && d.id) filled.id=d.id
        if (typeof d.product_category =='string') filled.product_category=d.product_category
        // if (typeof d.menu_route =='string') filled.menu_route=d.menu_route
        // if (typeof d.email =='string') filled.email=d.email
        // if (typeof d.phone =='string') filled.phone=d.phone
        console.log(filled);
        return filled;
    }

}
module.exports = product_categoryModel;