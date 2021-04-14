const productgroupModel = require('../payroll_model/productgroup.model');
const productgroup = new productgroupModel();

const product_categoryModel = require('../payroll_model/product_category.model');
const product_category = new product_categoryModel();

const product_rateModel = require ('../payroll_model/product_rate.model');
const product_rate = new product_rateModel();

const product_stockModel = require ('../payroll_model/product_stock.model');
const product_stock = new product_stockModel();

const productModel = require ('../payroll_model/product.model');
const product = new productModel();

const purchase_invoiceModel = require ('../payroll_model/purchase_invoice.model');
const purchase_invoice = new purchase_invoiceModel();

const purchase_invoice_accountsModel = require ('../payroll_model/purchase_invoice_accounts.model');
const purchase_invoice_accounts = new purchase_invoice_accountsModel();

const purchase_invoice_inventoryModel = require ('../payroll_model/purchase_invoice_inventory.model');
const purchase_invoice_inventory = new purchase_invoice_inventoryModel();

const purchase_orderModel = require ('../payroll_model/purchase_order.model');
const purchase_order = new purchase_orderModel();

const purchase_order_accountsModel = require ('../payroll_model/purchase_order_accounts.model');
const purchase_order_accounts = new purchase_order_accountsModel();

const purchase_order_inventoryModel = require ('../payroll_model/purchase_order_inventory.model');
const purchase_order_inventory = new purchase_order_inventoryModel();

const processModel = require('../payroll_model/process.model');
const process = new processModel();

const paymentModel = require('../payroll_model/payment.model');
const payment = new paymentModel();

const menu_reportModel = require('../payroll_model/menu_report.model');
const menu_report = new menu_reportModel();

const menu_masterModel = require('../payroll_model/menu_master.model');
const menu_master = new menu_masterModel();

const master_groupModel = require('../payroll_model/master_group.model');
const master_group = new master_groupModel();

const masterModel = require('../payroll_model/master.model');
const master = new masterModel();


// product_group controller
// get 
exports.getproduct_group = function(res){
    productgroup.getproduct_group((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// put 
exports.putproduct_group = function(req,res){
    productgroup.putproduct_group(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// delete
exports.deleteproduct_group = function(req,res){
    const id = req.query.id;
    console.log(req.body)
    productgroup.deleteproduct_group((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}

// product_category controller
// get 
exports.getproduct_category = function (res){
    product_category.getproduct_category((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// put
exports.putproduct_category = function(res){
    product_category.putproduct_category(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// delete
exports.deleteproduct_category = function(req,res){
    const id = req.query.id;
    console.log(req.body)
    product_category.deleteproduct_category((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}

// product_rate controller
// get
exports.getproduct_rate = function (res){
    product_rate.getproduct_rate((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// put
exports.putproduct_rate = function(res){
    product_rate.putproduct_rate(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// delete
exports.deleteproduct_rate = function(req,res){
    const id = req.query.id;
    console.log(req.body)
    product_rate.deleteproduct_rate((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}

// product_stock controller
// get 
exports.getproduct_stock = function (res){
    product_stock.getproduct_stock((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// put
exports.putproduct_stock = function(res){
    product_stock.putproduct_stock(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// delete
exports.deleteproduct_stock = function(req,res){
    const id = req.query.id;
    console.log(req.body)
    product_stock.deleteproduct_stock((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}

// product controllers
// get
exports.getproduct = function(res){
    product.getproduct((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// put 
exports.putproduct = function(req,res){
    product.putproduct(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// delete
exports.deleteproduct = function(req,res){
    const id = req.query.id;
    console.log(req.body)
    product.deleteproduct((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}

// purchase_invoice controller
// get
exports.getpurchase_invoice = function(res){
    purchase_invoice.getpurchase_invoice((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// put 
exports.putpurchase_invoice = function(req,res){
    purchase_invoice.putpurchase_invoice(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// delete
exports.deletepurchase_invoice = function(req,res){
    const id = req.query.id;
    console.log(req.body)
    purchase_invoice.deletepurchase_invoice((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}

// purchase_invoice_accounts
// get

exports.getpurchase_invoice_accounts = function(res){
    purchase_invoice_accounts.getpurchase_invoice_accounts((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// put 
exports.putpurchase_invoice_accounts = function(req,res){
    purchase_invoice_accounts.putpurchase_invoice_accounts(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// delete
exports.deletepurchase_invoice_accounts = function(req,res){
    const id = req.query.id;
    console.log(req.body)
    purchase_invoice_accounts.deletepurchase_invoice_accounts((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}

// purchase_invoice_inventory controller
// get

exports.getpurchase_invoice_inventory = function(res){
    purchase_invoice_inventory.getpurchase_invoice_inventory((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// put 
exports.putpurchase_invoice_inventory = function(req,res){
    purchase_invoice_inventory.putpurchase_invoice_inventory(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// delete
exports.deletepurchase_invoice_inventory = function(req,res){
    const id = req.query.id;
    console.log(req.body)
    purchase_invoice_inventory.deletepurchase_invoice_inventory((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}

// purchase order controller
// get

exports.getpurchase_order = function(res){
    purchase_order.getpurchase_order((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// put 
exports.putpurchase_order = function(req,res){
    purchase_order.putpurchase_order(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// delete
exports.deletepurchase_order = function(req,res){
    const id = req.query.id;
    console.log(req.body)
    purchase_order.deletepurchase_order((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}

// purchase_order_accounts controller
// get

exports.getpurchase_order_accounts = function(res){
    purchase_order_accounts.getpurchase_order_accounts((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// put 
exports.putpurchase_order_accounts = function(req,res){
    purchase_order_accounts.putpurchase_order_accounts(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// delete
exports.deletepurchase_order_accounts = function(req,res){
    const id = req.query.id;
    console.log(req.body)
    purchase_order_accounts.deletepurchase_order_accounts((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}

// purchase_order_inventory controller
// get
exports.getpurchase_order_inventory = function(res){
    purchase_order_inventory.getpurchase_order_inventory((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// put 
exports.putpurchase_order_inventory = function(req,res){
    purchase_order_inventory.putpurchase_order_inventory(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// delete
exports.deletepurchase_order_inventory = function(req,res){
    const id = req.query.id;
    console.log(req.body)
    purchase_order_inventory.deletepurchase_order_inventory((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}

// process controller
// get 
exports.getprocess = function(res){
    process.getprocess((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// put 
exports.putprocess = function(req,res){
    process.putprocess(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// delete
exports.deleteprocess = function(req,res){
    const id = req.query.id;
    console.log(req.body)
    process.deleteprocess((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}

// payment controller
// get 
exports.getpayment = function(res){
    payment.getpayment((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// put 
exports.putpayment = function(req,res){
    payment.putpayment(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// delete
exports.deletepayment = function(req,res){
    const id = req.query.id;
    console.log(req.body)
    payment.deletepayment((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}


// menu_report controller
// get 
exports.getmenu_report = function(res){
    menu_report.getmenu_report((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// put 
exports.putmenu_report = function(req,res){
    menu_report.putmenu_report(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// delete
exports.deletemenu_report = function(req,res){
    const id = req.query.id;
    console.log(req.body)
    menu_report.deletemenu_report((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}

// menu_master controller
// get 
exports.getmenu_master = function(res){
    menu_master.getmenu_master((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// put 
exports.putmenu_master = function(req,res){
    menu_master.putmenu_master(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// delete
exports.deletemenu_master = function(req,res){
    const id = req.query.id;
    console.log(req.body)
    menu_master.deletemenu_master((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}

// master_group controller
// get 
exports.getmaster_group = function(res){
    master_group.getmaster_group((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// put 
exports.putmaster_group = function(req,res){
    master_group.putmaster_group(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// delete
exports.deletemaster_group = function(req,res){
    const id = req.query.id;
    console.log(req.body)
    master_group.deletemaster_group((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}

// master controller
// get 
exports.getmaster = function(res){
    master.getmaster((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// put 
exports.putmaster = function(req,res){
    master.putmaster(req.body,(err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}
// delete
exports.deletemaster = function(req,res){
    const id = req.query.id;
    console.log(req.body)
    master.deletemaster((err,data) => {
        if(err){
            console.log(err)
            res.status(500),send(err)
        }
        else{
            res.send(data)
        }
    })
}


