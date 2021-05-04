const DBCON = require('../../../db_config');
const {
    issetNotEmpty
} = require('../../../helpers/common');
const AddLessModel = require('../models/add_less_mas.model');
const AddLess = new AddLessModel();
const LedgerModel = require('../models/ledger_mas.model');
const Ledger = new LedgerModel();
const ProductGroupModel = require('../models/product_group_mas.model');
const ProductGroup = new ProductGroupModel();
const UnitModel = require('../models/unit_mas.model');
const Unit = new UnitModel();
const ProductModel = require('../models/product_mas.model');
const Product = new ProductModel();
const ColorModel = require('../models/color_mas.model');
const Color = new ColorModel();
const MasterGroupModel = require('../models/master_group_mas.model');
const MasterGroup = new MasterGroupModel();
const ProductDetailsModel = require('../models/product_details.model');
const ProductDetails = new ProductDetailsModel();









const Product_CategoryModel = require('../models/product_category_mas.model');
const Product_Category = new Product_CategoryModel();

const Ledger_GroupModel = require('../models/ledger_group_mas.model');
const Ledger_Group = new Ledger_GroupModel();



const Ledger_CategoryModel = require('../models/ledger_category_mas.model');
const Ledger_Category = new Ledger_CategoryModel();

const Employee_CategoryModel = require('../models/employee_category_mas.model');
const Employee_Category = new Employee_CategoryModel();

const EmployeeModel = require('../models/employee_mas.model');
const Employee = new EmployeeModel();


const ProcessModel = require('../models/process_mas.model');
const Process = new ProcessModel();

const SizeModel = require('../models/size_mas.model');
const Size = new SizeModel();


const MasterModel = require('../models/master_mas.model');
const Master = new MasterModel();

const BranchModel = require('../models/branch_mas.model');
const Branch = new BranchModel();

const DepartmentModel = require('../models/department_mas.model');
const Department = new DepartmentModel();

const BankModel = require('../models/bank_mas.model');
const Bank = new BankModel();

const VoucherModel = require('../models/voucher.model');
const Voucher = new VoucherModel();

//report
const ReportModel = require('../models/report.model');
const Report = new ReportModel();





//designation
const DesignationModel = require('../models/designation.model');
const Designation = new DesignationModel();



exports.saveAddLess = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    AddLess.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getAllAddLesss = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    AddLess.getAll((err, data) => {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendSuccess("", data)
        }
    })
}


exports.getAllAddLessSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, name from add_less_mas where status = ?', status, function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getAddLess = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);
    const USER = req.user;

    AddLess.find(Number(id), function (err, data) {
        if (err) {
            // console.log(err);
            res.sendError(err)
        } else {
            res.sendInfo("", data);
        }
    })
}

exports.deleteAddLess = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);
    const USER = req.user;

    if (issetNotEmpty(id)) {
        AddLess.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Add Less Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Add Less Not Found! ")
    }

}

exports.saveLedger = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Ledger.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getLedger = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Ledger.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Ledger.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}


exports.getAllLedgerSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    // const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, ledger as name from ledger order by ledger.ledger asc', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

// exports.getAddLess = function (req, res) {
//     const id = req.query.id;
//     console.log("ID : " + id);
//     const USER = req.user;

//     AddLess.find(Number(id), function (err, data) {
//         if (err) {
//             console.log(err);
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data);
//         }
//     })
// }

exports.deleteLedger = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Ledger.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Ledger Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Ledger Not Found! ")
    }

}








exports.getAllProduct_CategorySB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, product_category as name from product_category order by product_category.product_category asc',  function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}





exports.saveProduct_Category = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Product_Category.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}
//product_group

exports.saveProductGroup = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    ProductGroup.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getProduct_Category = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Product_Category.find(Number(ID), function (err, data) {

            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    } else {
        Product_Category.getAll((err, data) => {

            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.getProductGroup = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        ProductGroup.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        ProductGroup.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}



exports.getAllProductGroupSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, product_group as name from product_group order by product_group.product_group asc ',  function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}


exports.getAllMasterGroupSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, master_group as name from master_group order by master_group.master_group asc ',  function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

// exports.getAddLess = function (req, res) {
//     const id = req.query.id;
//     console.log("ID : " + id);
//     const USER = req.user;

//     AddLess.find(Number(id), function (err, data) {
//         if (err) {
            // console.log(err);
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data);
//         }
//     })
// }

exports.deleteProduct_Category = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Product_Category.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Product Category Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Product Category Not Found! ")
    }

}

exports.deleteProductGroup = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        ProductGroup.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {

                res.sendInfo("Product Group Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Product Group Not Found! ")
    }

}


exports.saveLedger_Group = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Ledger_Group.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}
//unit

exports.saveUnit = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Unit.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getLedger_Group = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Ledger_Group.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Ledger_Group.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}
exports.getUnit = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Unit.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Unit.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}


exports.getAllLedger_GroupSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, name from ledger_group order by ledger_group.ledger_group asc ', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}
exports.getAllUnitSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, unit as name from unit order by unit.unit asc ', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}


// exports.getAddLess = function (req, res) {
//     const id = req.query.id;
    // console.log("ID : " + id);
//     const USER = req.user;

//     AddLess.find(Number(id), function (err, data) {
//         if (err) {
            // console.log(err);
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data);
//         }
//     })
// }

exports.deleteLedger_Group = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Ledger_Group.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Ledger Group Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Ledger Group Not Found! ")
    }

}


exports.deleteUnit = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Unit.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {

                res.sendInfo("Unit Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Unit Not Found! ")
    }

}

exports.saveLedger_Category = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Ledger_Category.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}
//Product

exports.saveProduct = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Product.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getLedger_Category = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Ledger_Category.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Ledger_Category.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.getProduct = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Product.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Product.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}


exports.getAllLedger_CategorySB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select id as value, name from ledger_category order by ledger_category.ledger_category asc ', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}





exports.getAllProductAccessoriesSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select product.id as value, product.product as name from product left join product_category on product.product_category_id = product_category.id where product_category="Accessories"',function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}


exports.getAllProductSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value , product as name from product order by product.product asc',function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

// exports.getAddLess = function (req, res) {
//     const id = req.query.id;
//     console.log("ID : " + id);
//     const USER = req.user;

//     AddLess.find(Number(id), function (err, data) {
//         if (err) {
//             console.log(err);
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data);
//         }
//     })
// }

exports.deleteLedger_Category = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Ledger_Category.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Ledger Category Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Ledger Category Not Found! ")
    }

}

exports.deleteProduct = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Product.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {

                res.sendInfo("Product Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Product Not Found! ")
    }

}















































































































































//Color


exports.saveColor = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Color.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}
exports.saveProcess = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Process.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getColor = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Color.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Color.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}
exports.getProcess = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Process.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        
        Process.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}





exports.deleteColor = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Color.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {  
                  res.sendInfo("Color Deleted Successfully!");
        }
    })
} else {
    res.sendWarning("Color Not Found! ")
}
}


exports.getMobileForLedgerID = function(req,res){
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    var ledger_id = req.query.ledger_id ? req.query.ledger_id : null;
    DBCON.query('select mobile from ledger  where id = ? ', ledger_id, function (err, data) {
        if(err){
            res.sendError(err)
        }else{
            res.sendInfo("", data[0]? data[0].mobile:"")
        }
    })

}

exports.getUnitForProductID = function(req,res){
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    var product_id = req.query.product_id ? req.query.product_id : null;
    if(issetNotEmpty(product_id))
    {
        DBCON.query('select unit_id from product  where id = ? ', product_id, function (err, data) {
            if(err){
                res.sendError(err)
            }else{
                res.sendInfo("", data[0].unit_id)
            }
        })
    }
    else{
        res.sendError("Product not found")
    }

}


exports.getProcessSBForOrderID = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    var order_id = req.query.order_id ? req.query.order_id : null;
    DBCON.query('select process.id as value, process.process as name from  order_process left join process on process.id = order_process.process_id  where order_process.order_id = ? ', order_id, function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            var result = [];
            if(data.length > 0)
            {
                data.forEach((item, index) => {
                    if(item.value !== null)
                    {
                        result.push(item);

                        if(index === data.length - 1)
                        {
                            res.sendInfo("", result)
                        }
                    }
                })
            }
            else{
                res.sendInfo("", result)
            }
        }
    })
}


exports.getAllFabricsSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select product.id as value, product.product as name from product left join product_category on product.product_category_id = product_category.id where product_category="FABRIC" order by product.product asc', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteProcess = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        
        Process.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
            
                res.sendInfo("Process Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Process Not Found! ")
    }

}



//master group


exports.saveMasterGroup = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    MasterGroup.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}
exports.saveSize = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Size.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getMasterGroup = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        MasterGroup.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        MasterGroup.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.getSize = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Size.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        
        Size.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}





exports.deleteMasterGroup = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        MasterGroup.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                 res.sendInfo("Master Group Deleted Successfully!");
        }
    })
} else {
    res.sendWarning("Master Group Not Found! ")
}

}




exports.getAllSizeSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select id as value, size as name from size order by size.size asc ', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}



exports.getAllProcessSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select id as value, process as name from process order by process.process asc ', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}



exports.getAllColorSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    // const status = body.status ? body.status : 'active';
    DBCON.query('select id as value, color as name from color order by color.color asc ', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteSize = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
       
        Size.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
               

                res.sendInfo("Size Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Size Not Found! ")
    }

}


exports.saveMaster = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Master.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}

exports.getMaster = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Master.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Master.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.getAllMasterSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select id as value, name from master order by master.master asc ', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteMaster = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Master.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Master Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Master Not Found! ")
    }

}





exports.getAllLedgerCategorySB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, ledger_category as name from ledger_category order by ledger_category.ledger_category asc ', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getAllLedgerGroupSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, ledger_group as name from ledger_group order by ledger_group.ledger_group asc ', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}



exports.saveEmployee_Category = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Employee_Category.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}

exports.getEmployee_Category = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Employee_Category.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Employee_Category.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.getAllEmployee_CategorySB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select id as value, name from employee_category order by employee_category.employee_category asc ', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteEmployee_Category = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Employee_Category.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Employee category Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Employee category Not Found! ")
    }

}

exports.saveEmployee = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Employee.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}

exports.getEmployee = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Employee.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Employee.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.getAllEmployeeSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select id as value, name from employee order by employee.employee asc', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteEmployee = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Employee.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Employee  Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Employee Not Found! ")
    }

}
exports.getAllEmployeeCategorySB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, employee_category as name from employee_category order by employee_category.employee_category asc ', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}
exports.getAllShiftSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, shift as name from shift order by shift.shift asc ', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}
exports.getAllDesignationSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, designation as name from designation order by designation.designation asc ', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}
exports.getAllDepartmentSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, department as name from department order by department.department asc ', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}
// exports.getAllCuttingMasterSB = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     const status = body.status ? body.status : 'active'
//     DBCON.query('select ledger.id as value, ledger as name from ledger left join ledger_category on ledger_category.id= ledger.ledger_category_id where ledger_category.ledger_category= "CUTTING MASTER"  order by ledger.ledger asc ', function (err, data) {
//         if (err) {
//             // console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data)
//         }
//     })
// }
exports.getAllBranchSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, branch as name from branch order by branch.branch asc ', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}
exports.getAllBankSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, bank as name from bank order by bank.bank asc ', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}













exports.saveBranch = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Branch.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}

exports.getBranch = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Branch.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Branch.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}


exports.deleteBranch = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Branch.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Branch Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Branch Not Found! ")
    }

}

exports.saveDepartment = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Department.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}

exports.getDepartment = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Department.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Department.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.deleteDepartment = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Department.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Department Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Department Not Found! ")
    }

}



exports.saveBank = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Bank.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}



//designation
exports.saveDesignation = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Designation.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}

exports.getBank = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Bank.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Bank.getAll((err, data) => {   
                    if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendSuccess("", data)
        }
    })
}
}

exports.getDesignation = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Designation.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Designation.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}


exports.deleteBank = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Bank.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Bank Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Bank Not Found! ")
    }

}


exports.deleteDesignation = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Designation.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Designation Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Designation Not Found! ")
    }

}


////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////

exports.getLedgerForOrderID = function(req,res){
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    var order_id = req.query.order_id ? req.query.order_id : null;
    DBCON.query('select ledger_id from order_program  where id = ? ', order_id, function (err, data) {
        if(err){
            res.sendError(err)
        }else{
            res.sendInfo("", data[0].ledger)
        }
    })

}

exports.getFabricsForOrderID = function (req, res) {
   
    
    var order_id = req.query.order_id ? req.query.order_id : null;
    DBCON.query(`select cutting_program_inventory.gsm, cutting_program_inventory. dia, cutting_program_inventory.fabric_id, cutting_program_inventory.color_id, cutting_program_inventory.fabric_qty as weight from cutting_program_inventory left join cutting_program on cutting_program.id = cutting_program_inventory.vou_id where order_id = ${order_id}; `, function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
          
                res.sendInfo("", data)
            }
        
    })
}

const CompanyModel = require('../models/company_mas.model');
const Company = new CompanyModel();

exports.saveCompany = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Company.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}

exports.getCompany = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Company.find(Number(ID), function (err, data) {

            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    } else {
        Company.getAll((err, data) => {

            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.deleteCompany = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Company.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Company Details Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Company Details Not Found! ")
    }

}

exports.getAllCompanySB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, company as name from company order by company.company asc',  function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}


const ShortcutModel = require('../models/shortcut_mas.model');
const Shortcut = new ShortcutModel();

exports.saveShortcut = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Shortcut.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}

exports.getShortcut = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Shortcut.find(Number(ID), function (err, data) {

            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    } else {
        Shortcut.getAll((err, data) => {

            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.deleteShortcut = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Shortcut.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Shortcut Details Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Shortcut Details Not Found! ")
    }

}

exports.getAllShortcutSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.shortcut = USER.shortcut
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, shortcut as name from shortcut order by shortcut.shortcut asc',  function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

const ShiftModel = require('../models/shift_mas.model');
const Shift = new ShiftModel();

exports.saveShift = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Shift.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}

exports.getShift = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Shift.find(Number(ID), function (err, data) {

            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    } else {
        Shift.getAll((err, data) => {

            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.deleteShift = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Shift.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Shift Details Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Shift Details Not Found! ")
    }

}

exports.getAllShiftSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.shift = USER.shift
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, shift as name from shift order by shift.shift asc',  function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}


exports.getAllCuttingMasterSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select employee.id as value, employee as name from employee left join employee_category on employee_category.id= employee.employee_category_id where employee_category.employee_category= "CUTTING MASTER"  order by employee.employee asc ', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}




////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////


////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////

exports.getSizeDetails = function (req, res) {
    const body = req.body;
    const USER = req.user;
    const size_id = req.query.size_id
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select concat(size.size1, ",", size.size2, ",",size.size3, ",",size.size4, ",",size.size5, ",",size.size6, ",",size.size7, ",",size.size8, ",",size.size9) as sizes from size where id = ?',size_id, function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            var sizes = data.length > 0 ? data[0].sizes !== null ? data[0].sizes : "" : "";
            // console.log(sizes);
            sizes = sizes.split(",");
            res.sendInfo("", sizes);
        }
    })
}

exports.getPrefilledProductDetails = (req,res) => {
    var product_id = req.query.product_id;
    DBCON.query(`select * from product_details where product_id=?`, product_id,(err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            var resData = result.length ? result[0] :  {
                product_id : Number(product_id),
                size_id : null,
                size1_total : '',
                size2_total : '',
                size3_total : '',
                size4_total : '',
                size5_total : '',
                size6_total : '',
                size7_total : '',
                size8_total : '',
                size9_total : '',
                size1_rate : '',
                size2_rate : '',
                size3_rate : '',
                size4_rate : '',
                size5_rate : '',
                size6_rate : '',
                size7_rate : '',
                size8_rate : '',
                size9_rate : '',
            }
            resData.size_details = [];
            res.sendInfo("", resData);
        }
    })
}

//Product_details
exports.saveProductDetails = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    ProductDetails.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getProductDetails = function (req, res) {
    var id = req.query.id;
    if (issetNotEmpty(id)) {
        ProductDetails.find(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        ProductDetails.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}




exports.deleteProductDetails = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        ProductDetails.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Product Details Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Product Details Not Found! ")
    }

}


exports.getSizeForProductID = function(req,res){
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    var product_id = req.query.product_id ? req.query.product_id : null;
    DBCON.query(`select concat(size.size1, ",", size.size2, ",",size.size3, ",",size.size4, ",",size.size5, ",",size.size6, ",",size.size7, ",",size.size8, ",",size.size9) as sizes from product_details left join size on size.id = product_details.size_id where product_id = ${product_id}`, (err, data) => {
        if(err)
        {
            // console.log(err);
            res.sendError(err);
        }
        else{
            var sizes = data.length > 0 ? data[0].sizes !== null ? data[0].sizes : "" : "";
            // console.log(sizes);
            sizes = sizes.split(",");
            res.sendInfo("", sizes);
        }
    })

}

exports.getLedgerForLedgerGroup= (req, res) => {
    const ledger_group_id = req.query.ledger_group_id;

    const QUERY = `select ledger.id as value, ledger.ledger as name from ledger where ledger_group_id=${ledger_group_id} order by ledger asc;`;
    // console.log(QUERY);
    DBCON.query(QUERY, (err, result) => {
        if(err)
        {
            // console.log(err);
            res.sendError(err);
        }
        else{
            res.sendInfo("", result);
        }
    })

}

//voucher
exports.saveVoucher = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Voucher.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getVoucher = function (req, res) {
    var id = req.query.id;
    if (issetNotEmpty(id)) {
        Voucher.find(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Voucher.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}




exports.deleteVoucher = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Voucher.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Voucher Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Voucher Details Not Found! ")
    }

}

//report
exports.saveReport = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Report.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getReport = function (req, res) {
    var id = req.query.id;
    if (issetNotEmpty(id)) {
        Report.find(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Report.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}




exports.deleteReport = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Report.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Report Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Report Details Not Found! ")
    }

}



////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Kowsalya Workspace/////////////////
////////////////////// Boopathi Workspace/////////////////


////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////


exports.getAccountsLedger = (req, res) => {
    const LEDGER_GROUP_ID = req.query.ledger_group_id;

    const QUERY = `select ledger.id as value, ledger.ledger as name from ledger left join ledger_group on ledger.ledger_group_id = ledger_group.id where ledger_group="Sales Account" order by ledger asc;`;

    DBCON.query(QUERY, (err, result) => {
        if(err)
        {
            // console.log(err);
            res.sendError(err);
        }
        else{
            res.sendInfo("", result);
        }
    })
}







////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// Hariprakash Workspace/////////////////
////////////////////// HariPrakash Workspace/////////////////