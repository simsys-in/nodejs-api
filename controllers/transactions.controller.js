const DBCON = require('../db_config');
const {
    issetNotEmpty
} = require('../helpers/common');
const OrderProgramModel = require('../models/order_program.model');
const OrderProgram = new OrderProgramModel();


const FabricInwardModel = require('../models/fabric_inward.model');
const FabricInward = new FabricInwardModel();

const FabricOutwardModel = require('../models/fabric_outward.model');
const FabricOutward = new FabricOutwardModel();

const FabricInvoiceModel = require('../models/fabric_invoice.model');
const FabricInvoice = new FabricInvoiceModel();

const FabricReturnModel = require('../models/fabric_return.model');
const FabricReturn = new FabricReturnModel();

const JobworkOutwardModel = require('../models/jobwork_outward.model');
const JobworkOutward = new JobworkOutwardModel();
const Yarn_InwardModel = require('../models/yarn_inward_mas.model');
const Yarn_Inward = new Yarn_InwardModel();

const Yarn_InvoiceModel = require('../models/yarn_invoice_mas.model');
const Yarn_Invoice = new Yarn_InvoiceModel();

const Yarn_ReturnModel = require('../models/yarn_return_mas.model');
const Yarn_Return = new Yarn_ReturnModel();

const Jobwork_InwardModel = require('../models/jobwork_inward_mas.model');
const Jobwork_Inward = new Jobwork_InwardModel();

const Yarn_OutwardModel = require('../models/yarn_outward_mas.model');
const Yarn_Outward = new Yarn_OutwardModel();


const CuttingProgramModel = require('../models/cutting_program.model');
const CuttingProgram = new CuttingProgramModel();

//jobwork invoice
const JobworkInvoiceModel = require('../models/jobwork_invoice.model');
const JobworkInvoice = new JobworkInvoiceModel();

//garments invoice
const GarmentsInvoiceModel = require('../models/garments_invoice.model');
const GarmentsInvoice = new GarmentsInvoiceModel();


//orderProgram
exports.saveOrderProgram = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    OrderProgram.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getOrderProgram = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        OrderProgram.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        OrderProgram.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}


exports.getSizeSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, size as name from size ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}


exports.getStyleSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select product.id as value, product.product as name from product left join product_category on product.product_category_id = product_category.id where product_category="Style" ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getOrderSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value,order_no as name from order_program ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getColorSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value,color as name from color ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getOrderSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value,order_no as name from order_program ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getLedgerNameSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    // const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, name from ledger where ledger_group_id = 1 ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getProcessSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value,process as name from process ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getProductSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value,product as name from product ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}



exports.getFabricSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select product.id as value, product.product as name from product left join product_category on product.product_category_id = product_category.id where product_category="FABRIC" ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getNextOrderNo = function(req, res){
    OrderProgram.getNextOrderNo((err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result)
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

exports.deleteOrderProgram = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        OrderProgram.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Order Program Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Order Program Not Found! ")
    }

}


//fabric inward

exports.saveFabricInward = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    FabricInward.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}

exports.getNextFabricInwardVouNo = function(req, res){
    FabricInward.getNextFabricInwardVouNo((err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result)
        }
    })
}
exports.getNextYarnInwardVouNo = function(req, res){
    Yarn_Inward.getNextYarnInwardVouNo((err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result)
        }
    })
}
exports.getNextYarnOutwardVouNo = function(req, res){
    Yarn_Outward.getNextYarnOutwardVouNo((err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result)
        }
    })
}
exports.getNextYarnReturnVouNo = function(req, res){
    Yarn_Return.getNextYarnReturnVouNo((err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result)
        }
    })
}


exports.getFabricInward = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        FabricInward.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        FabricInward.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}


// exports.getSizeSB = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     const status = body.status ? body.status : 'active'
//     DBCON.query('select id as value, size as name from size ', function (err, data) {
//         if (err) {
//             console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data)
//         }
//     })
// }


// exports.getStyleSB = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     const status = body.status ? body.status : 'active'
//     DBCON.query('select product.id as value, product.product as name from product left join product_category on product.product_category_id = product_category.id where product_category="Style" ', function (err, data) {
//         if (err) {
//             console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data)
//         }
//     })
// }

// exports.getFabricSB = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     const status = body.status ? body.status : 'active'
//     DBCON.query('select product.id as value, product.product as name from product left join product_category on product.product_category_id = product_category.id where product_category="FABRIC" ', function (err, data) {
//         if (err) {
//             console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data)
//         }
//     })
// }


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

exports.deleteFabricInward = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        FabricInward.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Fabric Inward Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Fabric Inward Not Found! ")
    }

}



//fabric outward

exports.saveFabricOutward = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    FabricOutward.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getFabricOutward = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        FabricOutward.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        FabricOutward.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}


// exports.getSizeSB = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     const status = body.status ? body.status : 'active'
//     DBCON.query('select id as value, size as name from size ', function (err, data) {
//         if (err) {
//             console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data)
//         }
//     })
// }


// exports.getStyleSB = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     const status = body.status ? body.status : 'active'
//     DBCON.query('select product.id as value, product.product as name from product left join product_category on product.product_category_id = product_category.id where product_category="Style" ', function (err, data) {
//         if (err) {
//             console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data)
//         }
//     })
// }

// exports.getFabricSB = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     const status = body.status ? body.status : 'active'
//     DBCON.query('select product.id as value, product.product as name from product left join product_category on product.product_category_id = product_category.id where product_category="FABRIC" ', function (err, data) {
//         if (err) {
//             console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data)
//         }
//     })
// }


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

exports.deleteFabricOutward = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        FabricOutward.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Fabric Outward Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Fabric Outward Not Found! ")
    }

}


//fabric invoice

exports.saveFabricInvoice = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    FabricInvoice.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getFabricInvoice = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        FabricInvoice.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        FabricInvoice.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}


// exports.getSizeSB = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     const status = body.status ? body.status : 'active'
//     DBCON.query('select id as value, size as name from size ', function (err, data) {
//         if (err) {
//             console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data)
//         }
//     })
// }


// exports.getStyleSB = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     const status = body.status ? body.status : 'active'
//     DBCON.query('select product.id as value, product.product as name from product left join product_category on product.product_category_id = product_category.id where product_category="Style" ', function (err, data) {
//         if (err) {
//             console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data)
//         }
//     })
// }

// exports.getFabricSB = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     const status = body.status ? body.status : 'active'
//     DBCON.query('select product.id as value, product.product as name from product left join product_category on product.product_category_id = product_category.id where product_category="FABRIC" ', function (err, data) {
//         if (err) {
//             console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data)
//         }
//     })
// }


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

exports.deleteFabricInvoice = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        FabricInvoice.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Fabric Invoice Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Fabric Invoice Not Found! ")
    }

}


//fabric return

exports.saveFabricReturn = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    FabricReturn.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getFabricReturn = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        FabricReturn.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        FabricReturn.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}


// exports.getSizeSB = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     const status = body.status ? body.status : 'active'
//     DBCON.query('select id as value, size as name from size ', function (err, data) {
//         if (err) {
//             console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data)
//         }
//     })
// }


// exports.getStyleSB = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     const status = body.status ? body.status : 'active'
//     DBCON.query('select product.id as value, product.product as name from product left join product_category on product.product_category_id = product_category.id where product_category="Style" ', function (err, data) {
//         if (err) {
//             console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data)
//         }
//     })
// }

// exports.getFabricSB = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     const status = body.status ? body.status : 'active'
//     DBCON.query('select product.id as value, product.product as name from product left join product_category on product.product_category_id = product_category.id where product_category="FABRIC" ', function (err, data) {
//         if (err) {
//             console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data)
//         }
//     })
// }


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

exports.deleteFabricReturn = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        FabricReturn.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Fabric Return Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Fabric Return Not Found! ")
    }

}

//Jobwork outward

exports.saveJobworkOutward = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    JobworkOutward.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}
exports.saveYarn_Inward = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Yarn_Inward.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}
exports.getYarn_Inward = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Yarn_Inward.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Yarn_Inward.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.getAllYarn_InwardSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, name from yarn_inward ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteYarn_Inward = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Yarn_Inward.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Yarn Inward Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Yarn Inward Not Found! ")
    }

}

exports.saveYarn_Invoice = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Yarn_Invoice.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getJobworkOutward = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        JobworkOutward.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        
        JobworkOutward.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.getYarn_Invoice = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Yarn_Invoice.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Yarn_Invoice.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.getAllYarn_InvoiceSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, name from yarn_invoice ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteYarn_Invoice = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Yarn_Invoice.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Yarn Invoice Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Yarn Invoice Not Found! ")
    }

}

exports.saveYarn_Return = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Yarn_Return.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}

exports.getYarn_Return = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Yarn_Return.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Yarn_Return.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.getAllYarn_ReturnSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, name from yarn_return ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteYarn_Return = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Yarn_Return.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Yarn Return Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Yarn Return Not Found! ")
    }

}

exports.saveJobwork_Inward = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Jobwork_Inward.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}

exports.getJobwork_Inward = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Jobwork_Inward.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Jobwork_Inward.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.getAllJobwork_InwardSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, name from jobwork_inward ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteJobwork_Inward = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Jobwork_Inward.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Jobwork Inward Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Jobwork Inward Not Found! ")
    }

}


exports.saveYarn_Outward = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    Yarn_Outward.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}

exports.getYarn_Outward = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        Yarn_Outward.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Yarn_Outward.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}



exports.deleteJobworkOutward = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        
        JobworkOutward.delete(Number(id), function (err, data) {
            res.sendInfo("Jobwork Outward Deleted Successfully!");
        })
    
} else {
    res.sendWarning("Jobwork Outward Not Found! ")
}

}
exports.getAllYarn_OutwardSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, name from yarn_outward ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteYarn_Outward = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Yarn_Outward.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Yarn Outward Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Yarn Outward Not Found! ")
    }


}

exports.getAllLedgerNameSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select id as value, ledger as name from ledger ', function (err, data) {
        if (err) {
            console.log(err)
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
    DBCON.query('select id as value, process as name from process ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getAllFabricsSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select product.id as value, product.product as name from product left join product_category on product.product_category_id = product_category.id where product_category = "FABRIC" ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getAllOrderSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, order_no as name from order_program ', function (err, data) {
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
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, color as name from color ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}



























/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////




exports.saveCuttingProgram = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    CuttingProgram.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}

exports.getCuttingProgram = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        CuttingProgram.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        CuttingProgram.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}

exports.getAllCuttingProgramSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select id as value, name from cutting_program ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getCuttingProgramColorDetails = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select cutting_program_inventory.color_id, cutting_program_inventory.size1, cutting_program_inventory.size2,cutting_program_inventory.size3,cutting_program_inventory.size4,cutting_program_inventory.size5,cutting_program_inventory.size6,cutting_program_inventory.size7,cutting_program_inventory.size8,cutting_program_inventory.size9 from cutting_program left join cutting_program_inventory on cutting_program_inventory.vou_id = cutting_program.id where order_id =?', req.query.order_id, function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}


exports.deleteCuttingProgram = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        CuttingProgram.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Yarn Outward Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Yarn Outward Not Found! ")
    }

}

exports.getNextCuttingProgLotNo = (req, res) => {
    CuttingProgram.getNextLotNo((err, nextLotNo) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("",nextLotNo);
        }
    })
}

exports.getStyleForOrderId = (req, res) => {
    const ORDER_ID = req.query.order_id ? req.query.order_id : null;
    if(issetNotEmpty(ORDER_ID))
    {
        OrderProgram.getStyleForOrderId(ORDER_ID,(err, style_id) => {
            if(err)
            {
                res.sendError(err);
            }
            else{
                res.sendInfo("",style_id);
            }
        })
    }
    else{
        res.sendError("Order Not Found!")
    }
}

exports.getSizesForOrderID = (req, res) => {
    const ORDER_ID = req.query.order_id;

    DBCON.query(`select concat(size.size1, ",", size.size2, ",",size.size3, ",",size.size4, ",",size.size5, ",",size.size6, ",",size.size7, ",",size.size8, ",",size.size9) as sizes from order_program left join size on size.id = order_program.size_id where order_program.id = ${ORDER_ID}`, (err, data) => {
        if(err)
        {
            console.log(err);
            res.sendError(err);
        }
        else{
            var sizes = data.length > 0 ? data[0].sizes !== null ? data[0].sizes : "" : "";
            console.log(sizes);
            sizes = sizes.split(",");
            res.sendInfo("", sizes);
        }
    })

}

exports.getFabricsForOrderID = (req, res) => {
    const ORDER_ID = req.query.order_id;

    DBCON.query(`select product.product as name, product.id as value from order_fabric left join product on product.id = order_fabric.fabric_id where order_id  = ${ORDER_ID}`, (err, data) => {
        if(err)
        {
            console.log(err);
            res.sendError(err);
        }
        else{
            res.sendInfo("", data);
        }
    })

}

exports.getFabricDetailForOrder = (req, res) => {
    const ORDER_ID = req.query.order_id;
    const FABRIC_ID = req.query.fabric_id;

    DBCON.query(`select order_fabric.dia, order_fabric.gsm from order_fabric left join product on product.id = order_fabric.fabric_id where order_id  = ${ORDER_ID} and fabric_id = ${FABRIC_ID}`, (err, data) => {
        if(err)
        {
            console.log(err);
            res.sendError(err);
        }
        else{
            res.sendInfo("", data);
        }
    })

}


exports.getJobworkOutwardReport = (req, res) => {
    const ID = req.query.id;
    JobworkOutward.getJobworkOutwardReport(ID, (err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result);
        }
    })
}


/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////
/////////////////// Hariprakash Workspace //////////////////

exports.getJobworkOutwardColorDetails = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select jobwork_outward_inventory.color_id, jobwork_outward_inventory.size1, jobwork_outward_inventory.size2,jobwork_outward_inventory.size3,jobwork_outward_inventory.size4,jobwork_outward_inventory.size5,jobwork_outward_inventory.size6,jobwork_outward_inventory.size7,jobwork_outward_inventory.size8,jobwork_outward_inventory.size9 from jobwork_outward left join jobwork_outward_inventory on jobwork_outward_inventory.vou_id = jobwork_outward.id where jobwork_outward.order_id =?', req.query.order_id, function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

// jobwork invoice
exports.saveJobworkInvoice = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    JobworkInvoice.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
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


exports.getNextJobworkInwardVouNo = function(req, res){
    JobworkInvoice.getNextJobworkInwardVouNo((err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result)
        }
    })
}

exports.getNextFabricOutwardVouNo = function(req, res){
    JobworkInvoice.getNextFabricOutwardVouNo((err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result)
        }
    })
}

exports.getNextFabricReturnVouNo = function(req, res){
    JobworkInvoice.getNextFabricReturnVouNo((err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result)
        }
    })
}

exports.getNextFabricInvoiceVouNo = function(req, res){
    JobworkInvoice.getNextFabricInvoiceVouNo((err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result)
        }
    })
}

//garments invoice
exports.saveGarmentsInvoice = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    GarmentsInvoice.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getGarmentsInvoice = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        GarmentsInvoice.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        GarmentsInvoice.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}



exports.deleteGarmentsInvoice = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        GarmentsInvoice.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Garments Invoice Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Garments Invoice Not Found! ")
    }

}

// exports.getNextGarmentsInvoiceVouNo = function(req, res){
//     JobworkInvoice.getNextGarmentsInvoiceVouNo((err, result) => {
//         if(err)
//         {
//             res.sendError(err);
//         }
//         else{
//             res.sendInfo("", result)
//         }
//     })
// }

exports.getMarketingUserSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select id as value, name as name from users ', function (err, data) {
        if (err) {
            console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
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



exports.getOrdersForLedgerAndProcess = (req, res) => {
    const PROCESS = req.query.process;
    const LEDGER = req.query.ledger;

    DBCON.query(`select order_program.id as order_id, order_process.rate, order_program.product_id, order_program.size_id, jobwork_inward.inventory_qty_total as qty, (jobwork_inward.inventory_qty_total * order_process.rate) as amount from order_process left join order_program on order_program.id = order_process.order_id left join jobwork_inward on jobwork_inward.order_id = order_process.order_id  where order_process.process_id = ${PROCESS} and order_process.ledger_id = ${LEDGER} and jobwork_inward.inventory_qty_total > 0;`, (err, result) => {
        if(err)
        {
            console.log(err);
            res.sendError(err);
        }
        else{
            res.sendInfo("",result);
        }
    });

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
exports.getJobworkInvoice = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        JobworkInvoice.find(Number(ID), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        JobworkInvoice.getAll((err, data) => {
            if (err) {
                console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}



exports.getProductAndSizeSBForOrderID = (req, res) => {
    const ORDER_ID = req.query.order_id ? req.query.order_id : null;
    if(issetNotEmpty(ORDER_ID))
    {
        DBCON.query(`select style_id, size_id from order_program where id = ${ORDER_ID}`,(err, data) => {
            if(err)
            {
                res.sendError(err);
            }
            else{
                data.map(item => {
                    item.style_id = Number(item.style_id);
                    item.size_id = Number(item.size_id);
                })
                res.sendInfo("",data);
            }
        })
    }
    else{
        res.sendError("Jobwork Invoice Not Found!")
    }
}


exports.deleteJobworkInvoice = function (req, res) {
    const id = req.query.id;
    console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        JobworkInvoice.delete(Number(id), function (err, data) {
            if (err) {
                console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Jobwork Invoice Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Jobwork Invoice Not Found! ")
    }

}
