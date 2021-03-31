const DBCON = require('../db_config');
const {
    issetNotEmpty
} = require('../helpers/common');
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
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getAddLess = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);
    const USER = req.user;

    AddLess.find(Number(id), function (err, data) {
        if (err) {
            console.log(err);
            res.sendError(err)
        } else {
            res.sendInfo("", data);
        }
    })
}

exports.deleteAddLess = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);
    const USER = req.user;

    if (issetNotEmpty(id)) {
        AddLess.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
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
            console.log(err);
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
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Ledger.getAll((err, data) => {
            if (err) {
                console.log(err)
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
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, name from ledger where status = ?', status, function (err, data) {
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
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Ledger Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Ledger Not Found! ")
    }

}






//product_category 

// exports.saveProduct_Category = function (req, res) {
//     const body = req.body;
//     body.id = req.query.id;
//     Product_Category.checkAndSaveOrUpdate(body, (err, result, msg) => {
//         if (err) {
//             console.log(err);
//             res.sendError(err);
//         } else {
//             res.sendSuccess(msg, result)
//         }
//     })
// }


// exports.getAllProduct_Categorys = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     Product_Category.getAll((err, data) => {
//         if (err) {
//             console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendSuccess("", data)
//         }
//     })
// }


exports.getAllProduct_CategorySB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, product_category as name from product_category',  function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

// exports.getProduct_Category = function (req, res) {
//     // const id = req.query.id;
//     // console.log("ID : " + id);
//     // const USER = req.user;

//     // Product_Category.find(Number(id), function (err, data) {
//     //     if (err) {
//     //         console.log(err);
//     //         res.sendError(err)
//     //     } else {
//     //         res.sendInfo("", data);
//     //     }
//     // })
//     var ID = req.query.id;
//     if(issetNotEmpty(ID))
//     {
//         Product_Category.find(Number(ID), function (err, data) {
//             if (err) {
//                 console.log(err);
//                 res.sendError(err)
//             } else {
//                 res.sendInfo("", data);
//             }
//         })
//     }
//     else{
//         Product_Category.getAll((err, data) => {
//             if (err) {
//                 console.log(err)
//                 res.sendError(err)
//             } else {
//                 res.sendSuccess("", data)
//             }
//         })
//     }
// }

// exports.deleteProduct_Category = function (req, res) {
//     const id = req.query.id;
//     console.log("ID : " + id);
//     const USER = req.user;

//     if (issetNotEmpty(id)) {
//         Product_Category.delete(Number(id), function (err, data) {
//             if (err) {
//                 console.log(err);
//                 res.sendError(err)
//             } else {
//                 res.sendInfo("Product Category Deleted Successfully!");
//             }
//         })
//     } else {
//         res.sendWarning("Product Category Not Found! ")
//     }

// }




exports.saveProduct_Category = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Product_Category.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
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
            console.log(err);
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
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    } else {
        Product_Category.getAll((err, data) => {

            if (err) {
                console.log(err)
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
                console.log(err);
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
    DBCON.query('select id as value, product_group as name from product_group ',  function (err, data) {
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
    DBCON.query('select id as value, master_group as name from master_group ',  function (err, data) {
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
//             console.log(err);
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
                console.log(err);
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
                console.log(err);
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
            console.log(err);
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
            console.log(err);
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
                console.log(err);
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
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Unit.getAll((err, data) => {
            if (err) {
                console.log(err)
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
    DBCON.query('select id as value, name from ledger_group ', function (err, data) {
        if (err) {
            console.log(err)
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
    DBCON.query('select id as value, unit as name from unit ', function (err, data) {
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
//             console.log(err);
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data);
//         }
//     })
// }

exports.deleteLedger_Group = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Ledger_Group.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
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
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Unit.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
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
            console.log(err);
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
            console.log(err);
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
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Ledger_Category.getAll((err, data) => {
            if (err) {
                console.log(err)
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
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Product.getAll((err, data) => {
            if (err) {
                console.log(err)
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
    DBCON.query('select id as value, name from ledger_category ', function (err, data) {
        if (err) {
            console.log(err)
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
    DBCON.query('select id as value, name from product ',function (err, data) {
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
//             console.log(err);
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data);
//         }
//     })
// }

exports.deleteLedger_Category = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Ledger_Category.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
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
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Product.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
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
            console.log(err);
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
            console.log(err);
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
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Color.getAll((err, data) => {
            if (err) {
                console.log(err)
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
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        
        Process.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}





exports.deleteColor = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Color.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
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
            res.sendInfo("", data[0].mobile)
        }
    })

}

exports.getUnitForProductID = function(req,res){
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    var product_id = req.query.product_id ? req.query.product_id : null;
    DBCON.query('select unit_id from product  where id = ? ', product_id, function (err, data) {
        if(err){
            res.sendError(err)
        }else{
            res.sendInfo("", data[0].unit_id)
        }
    })

}


exports.getProcessSBForOrderID = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    var order_id = req.query.order_id ? req.query.order_id : null;
    DBCON.query('select process.id as value, process.process as name from  order_process left join process on process.id = order_process.process_id  where order_process.order_id = ? ', order_id, function (err, data) {
        if (err) {
            console.log(err)
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
exports.getMobileForLedgerID = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    var ledger_id = req.query.ledger_id ? req.query.ledger_id : null;
    DBCON.query('select mobile from ledger  where id = ? ', ledger_id, function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data[0].mobile)
        }
    })
}


// exports.getAllFabricsSB = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     const status = body.status ? body.status : 'active';
//     DBCON.query('select id as value, name from fabrics ', function (err, data) {
//         if (err) {
//             console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data)
//         }
//     })
// }

exports.deleteProcess = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        
        Process.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
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
            console.log(err);
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
            console.log(err);
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
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        MasterGroup.getAll((err, data) => {
            if (err) {
                console.log(err)
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
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        
        Size.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}





exports.deleteMasterGroup = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        MasterGroup.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
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
    DBCON.query('select id as value, name from size ', function (err, data) {
        if (err) {
            console.log(err)
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
    DBCON.query('select id as value, color as name from color ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteSize = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
       
        Size.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
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
            console.log(err);
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
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Master.getAll((err, data) => {
            if (err) {
                console.log(err)
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
    DBCON.query('select id as value, name from master ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteMaster = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Master.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
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
    DBCON.query('select id as value, ledger_category as name from ledger_category ', function (err, data) {
        if (err) {
            console.log(err)
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
    DBCON.query('select id as value, ledger_group as name from ledger_group ', function (err, data) {
        if (err) {
            console.log(err)
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
            console.log(err);
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
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Employee_Category.getAll((err, data) => {
            if (err) {
                console.log(err)
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
    DBCON.query('select id as value, name from employee_category ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteEmployee_Category = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Employee_Category.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
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
            console.log(err);
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
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Employee.getAll((err, data) => {
            if (err) {
                console.log(err)
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
    DBCON.query('select id as value, name from employee ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteEmployee = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Employee.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
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
    DBCON.query('select id as value, employee_category as name from employee_category ', function (err, data) {
        if (err) {
            console.log(err)
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
    DBCON.query('select id as value, shift as name from shift ', function (err, data) {
        if (err) {
            console.log(err)
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
    DBCON.query('select id as value, designation as name from designation ', function (err, data) {
        if (err) {
            console.log(err)
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
    DBCON.query('select id as value, department as name from department ', function (err, data) {
        if (err) {
            console.log(err)
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
    DBCON.query('select id as value, employee as name from employee ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}
exports.getAllBranchSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, branch as name from branch ', function (err, data) {
        if (err) {
            console.log(err)
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
    DBCON.query('select id as value, bank as name from bank ', function (err, data) {
        if (err) {
            console.log(err)
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
            console.log(err);
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
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Branch.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.getAllBranchSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select id as value, name from branch ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteBranch = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Branch.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
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
            console.log(err);
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
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Department.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.getAllDepartmentSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select id as value, name from department ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteDepartment = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Department.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Department Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Department Not Found! ")
    }

}






