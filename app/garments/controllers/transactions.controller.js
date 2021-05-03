const DBCON = require('../../../db_config');
const {
    issetNotEmpty
} = require('../../../helpers/common');
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

//garments delivery note
const GarmentsDeliveryNoteModel = require('../models/garments_delivery_note.model');
const GarmentsDeliveryNote = new GarmentsDeliveryNoteModel();

//garments receipt note
const GarmentsReceiptNoteModel = require('../models/garments_receipt_note.model');
const GarmentsReceiptNote = new GarmentsReceiptNoteModel();

//knitting program
const KnittingProgramModel = require('../models/knitting_program.model');
const KnittingProgram = new KnittingProgramModel();

//purchase order
const YarnPurchaseOrderModel = require('../models/yarn_purchase_order.model');
const YarnPurchaseOrder = new YarnPurchaseOrderModel();

//purchase order
const GeneralPurchaseOrderModel = require('../models/general_purchase_order.model');
const GeneralPurchaseOrder = new GeneralPurchaseOrderModel();


//orderProgram
exports.saveOrderProgram = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    OrderProgram.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
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
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        OrderProgram.getAll((err, data) => {
            if (err) {
                // console.log(err)
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
            // console.log(err)
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
            // console.log(err)
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
    DBCON.query('select id as value,order_no as name from order_program order by id desc', function (err, data) {
        if (err) {
            // console.log(err)
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
            // console.log(err)
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
            // console.log(err)
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
            // console.log(err)
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
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}



// exports.getFabricSB = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     const status = body.status ? body.status : 'active'
//     DBCON.query('select product.id as value, product.product as name from product left join product_category on product.product_category_id = product_category.id where product_category="FABRIC" ', function (err, data) {
//         if (err) {
            // console.log(err)
//             res.sendError(err)
//         } else 
//             res.sendInfo("", data)
//         }
//     })
// }

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
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        OrderProgram.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
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
            // console.log(err);
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
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        FabricInward.getAll((err, data) => {
            if (err) {
                // console.log(err)
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
            // console.log(err)
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
            // console.log(err)
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
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        FabricInward.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
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
            // console.log(err);
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
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        FabricOutward.getAll((err, data) => {
            if (err) {
                // console.log(err)
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
            // console.log(err)
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
            // console.log(err)
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
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        FabricOutward.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
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
            // console.log(err);
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
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        FabricInvoice.getAll((err, data) => {
            if (err) {
                // console.log(err)
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
            // console.log(err)
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
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        FabricInvoice.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
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
            // console.log(err);
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
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        FabricReturn.getAll((err, data) => {
            if (err) {
                // console.log(err)
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
            // console.log(err)
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
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        FabricReturn.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
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
            // console.log(err);
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
            // console.log(err);
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
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Yarn_Inward.getAll((err, data) => {
            if (err) {
                // console.log(err)
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
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteYarn_Inward = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Yarn_Inward.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
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
            // console.log(err);
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
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        
        JobworkOutward.getAll((err, data) => {
            if (err) {
                // console.log(err)
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
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Yarn_Invoice.getAll((err, data) => {
            if (err) {
                // console.log(err)
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
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteYarn_Invoice = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Yarn_Invoice.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
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
            // console.log(err);
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
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Yarn_Return.getAll((err, data) => {
            if (err) {
                // console.log(err)
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
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteYarn_Return = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Yarn_Return.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
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
            // console.log(err);
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
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Jobwork_Inward.getAll((err, data) => {
            if (err) {
                // console.log(err)
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
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteJobwork_Inward = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Jobwork_Inward.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
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
            // console.log(err);
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
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        Yarn_Outward.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}



exports.deleteJobworkOutward = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

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
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.deleteYarn_Outward = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        Yarn_Outward.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Yarn Outward Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Yarn Outward Not Found! ")
    }


}

// exports.getAllLedgerNameSB = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     const status = body.status ? body.status : 'active';
//     DBCON.query('select id as value, ledger as name from ledger ', function (err, data) {
//         if (err) {
            // console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data)
//         }
//     })
// }

// exports.getAllProcessSB = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     const status = body.status ? body.status : 'active';
//     DBCON.query('select id as value, process as name from process ', function (err, data) {
//         if (err) {
//             console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data)
//         }
//     })
// }

// exports.getAllFabricsSB = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     const status = body.status ? body.status : 'active'
//     DBCON.query('select product.id as value, product.product as name from product left join product_category on product.product_category_id = product_category.id where product_category = "FABRIC" ', function (err, data) {
//         if (err) {
//             console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data)
//         }
//     })
// }

exports.getAllOrderSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active'
    DBCON.query('select id as value, order_no as name from order_program ', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}
// exports.getAllColorSB = function (req, res) {
//     const body = req.body;
//     const USER = req.user;
//     body.company = USER.company
//     const status = body.status ? body.status : 'active'
//     DBCON.query('select id as value, color as name from color ', function (err, data) {
//         if (err) {
            // console.log(err)
//             res.sendError(err)
//         } else {
//             res.sendInfo("", data)
//         }
//     })
// }



























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
            // console.log(err);
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
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        CuttingProgram.getAll((err, data) => {
            if (err) {
                // console.log(err)
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
            // console.log(err)
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
    if(issetNotEmpty(req.query.order_id) && issetNotEmpty(req.query.from_process_id))
    {
        DBCON.query('select cutting_program_inventory.color_id, cutting_program_inventory.size1, cutting_program_inventory.size1 as max_size1, cutting_program_inventory.size2, cutting_program_inventory.size2 as max_size2,cutting_program_inventory.size3, cutting_program_inventory.size3 as max_size3,cutting_program_inventory.size4, cutting_program_inventory.size4 as max_size4,cutting_program_inventory.size5, cutting_program_inventory.size5 as max_size5,cutting_program_inventory.size6, cutting_program_inventory.size6 as max_size6,cutting_program_inventory.size7, cutting_program_inventory.size7 as max_size7,cutting_program_inventory.size8, cutting_program_inventory.size8 as max_size8,cutting_program_inventory.size9, cutting_program_inventory.size9 as max_size9 from cutting_program left join cutting_program_inventory on cutting_program_inventory.vou_id = cutting_program.id where order_id =?', req.query.order_id, function (err, cuttingInventory) {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                DBCON.query(`select jobwork_outward_inventory.color_id, jobwork_outward_inventory.size1,  jobwork_outward_inventory.size2, jobwork_outward_inventory.size3, jobwork_outward_inventory.size4, jobwork_outward_inventory.size5, jobwork_outward_inventory.size6, jobwork_outward_inventory.size7, jobwork_outward_inventory.size8, jobwork_outward_inventory.size9 from jobwork_outward left join jobwork_outward_inventory on jobwork_outward_inventory.vou_id = jobwork_outward.id where jobwork_outward.order_id = ${req.query.order_id} and from_process_id = ${req.query.from_process_id}`, (err, outwardInventory) => {
                    if(err)
                    {
                        res.sendError(err)
                    }
                    else{
                        var returnData = _.remove(cuttingInventory, (item) => {
                            outwardInventory.map(outward => {
                                return outward.color_id === item.color_id;
                            })
                        });

                        // cuttingInventory.map(cutting => {
                        //     outwardInventory.map(outward => {
                        //         if(outward.color_id === cutting.color_id)
                        //         {

                        //         }
                        //     })
                        // })
                        res.sendInfo("", returnData);
                    }
                })
            }
        })
    }
    else{
        res.sendInfo("", []);
    }
}




exports.deleteCuttingProgram = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        CuttingProgram.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Cutting Program Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Cutting Program Not Found! ")
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

exports.getFabricsForOrderIDForCuttingProgram = (req, res) => {
    const ORDER_ID = req.query.order_id;

    DBCON.query(`select product.product as name, product.id as value from order_fabric left join product on product.id = order_fabric.fabric_id where order_id  = ${ORDER_ID}`, (err, data) => {
        if(err)
        {
            // console.log(err);
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
            // console.log(err);
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
    DBCON.query('select jobwork_outward_inventory.color_id, jobwork_outward_inventory.size1,jobwork_outward_inventory.size1 as max_size1, jobwork_outward_inventory.size2,jobwork_outward_inventory.size2 as max_size2,jobwork_outward_inventory.size3,jobwork_outward_inventory.size3 as max_size3,jobwork_outward_inventory.size4,jobwork_outward_inventory.size4 as max_size4,jobwork_outward_inventory.size5,jobwork_outward_inventory.size5 as max_size5,jobwork_outward_inventory.size6,jobwork_outward_inventory.size6 as max_size6,jobwork_outward_inventory.size7,jobwork_outward_inventory.size7 as max_size7,jobwork_outward_inventory.size8,jobwork_outward_inventory.size8 as max_size8,jobwork_outward_inventory.size9,jobwork_outward_inventory.size9 as max_size9 from jobwork_outward left join jobwork_outward_inventory on jobwork_outward_inventory.vou_id = jobwork_outward.id where jobwork_outward.order_id =?  and to_process_id =? and ledger_id =?', [ req.query.order_id, req.query.to_process_id, req.query.ledger_id], function (err, data) {
        if (err) {
            // console.log(err)
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
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}

exports.getJobworkInwardColorDetails = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select jobwork_inward_inventory.color_id, jobwork_inward_inventory.size1, jobwork_inward_inventory.size2,jobwork_inward_inventory.size3,jobwork_inward_inventory.size4,jobwork_inward_inventory.size5,jobwork_inward_inventory.size6,jobwork_inward_inventory.size7,jobwork_inward_inventory.size8,jobwork_inward_inventory.size9 from jobwork_inward left join jobwork_inward_inventory on jobwork_inward_inventory.vou_id = jobwork_inward.id where jobwork_inward.order_id =?', req.query.order_id, function (err, data) {
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

exports.getNextYarnInvoiceVouNo = function(req, res){
    Yarn_Invoice.getNextYarnInvoiceVouNo((err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result)
        }
    })
}

exports.getNextJobworkInwardVouNo = function(req, res){
    Jobwork_Inward.getNextJobworkInwardVouNo((err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result)
        }
    })
}

exports.getJobworkInvoiceReport = (req, res) => {
    const ID = req.query.id;
    JobworkInvoice.getJobworkInvoiceReport(ID, (err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result);
        }
    })
}
exports.getYarnInvoiceReport = (req, res) => {
    const ID = req.query.id;
    Yarn_Invoice.getYarnInvoiceReport(ID, (err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result);
        }
    })
}
exports.getYarnOutwardReport = (req, res) => {
    const ID = req.query.id;
    Yarn_Outward.getYarnOutwardReport(ID, (err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result);
        }
    })
}

const DyeingProgramModel = require('../models/dyeing_program.model');
const DyeingProgram = new DyeingProgramModel();

exports.saveDyeingProgram = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    DyeingProgram.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}

exports.getNextDyeingProgramVouNo = function(req, res){
    DyeingProgram.getNextDyeingProgramVouNo((err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result)
        }
    })
}

exports.getDyeingProgram = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        DyeingProgram.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        DyeingProgram.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}


exports.deleteDyeingProgram = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        DyeingProgram.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Dyeing  Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Dyeing Program Not Found! ")
    }

}

exports.getDyeingProgramReport = (req, res) => {
    const ID = req.query.id;
    DyeingProgram.getDyeingProgramReport(ID, (err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result);
        }
    })
}
//fabric return report 
exports.getFabricReturnReport = (req, res) => {
    const ID = req.query.id;
    FabricReturn.getFabricReturnReport(ID, (err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result);
        }
    })
}
//yarn inward report
exports.getYarnInwardReport = (req, res) => {
    const ID = req.query.id;
    Yarn_Inward.getYarnInwardReport(ID, (err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result);
        }
    })
}
//yarn return report 
exports.getYarnReturnReport = (req, res) => {
    const ID = req.query.id;
    Yarn_Return.getYarnReturnReport(ID, (err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result);
        }
    })
}
exports.getDyeingProgramReport = (req, res) => {
    const ID = req.query.id;
    DyeingProgram.getDyeingProgramReport(ID, (err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result);
        }
    })
}
//report yarn purchase order 

exports.getYarnPurchaseOrderReport = (req, res) => {
    const ID = req.query.id;
    YarnPurchaseOrder.getYarnPurchaseOrderReport(ID, (err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result);
        }
    })
}
//report general purchase order
exports.getGeneralPurchaseOrderReport = (req, res) => {
    const ID = req.query.id;
    GeneralPurchaseOrder.getGeneralPurchaseOrderReport(ID, (err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result);
        }
    })
}

exports.getCuttingRateForOrderID = (req, res) => {
    const ORDER_ID = req.query.order_id;
    const PROCESS_ID = req.query.process_id;

    const QUERY = `SELECT  rate FROM order_process WHERE order_id = ${ORDER_ID} and process_id = ${PROCESS_ID};`;

    DBCON.query(QUERY, (err, result) => {
        if(err)
        {
            console.log(err);
            res.sendError(err);
        }
        else {
            res.sendInfo("",result[0] ? result[0].rate : 0);
        }
    })
}

exports.getShortageReport = (req, res) => {
    const ORDER_ID = req.query.order_id;
    const PROCESS_ID = req.query.process_id;
    var shortage_details = {}


    const QUERY = `select order_program.order_no, order_program.vou_date, order_program.due_date , product.product,size.size from order_program left join size on size.id = order_program.size_id left join product on product.id = order_program.style_id where order_program.id = ${ORDER_ID};`;

    DBCON.query(QUERY, (err, result) => {
        if(err)
        {
            console.log(err);
            res.sendError(err);
        }
        else {
            shortage_details = result[0];

            const GET_CUTTINGPROGRAM_QUERY = `select ledger.ledger,process.process, cutting_program.inventory_qty_total, cutting_program.process_id, cutting_program_inventory.color_id, cutting_program_inventory.fabric_id from cutting_program left join cutting_program_inventory on cutting_program_inventory.vou_id = cutting_program.id left join ledger on ledger.id = cutting_program_inventory.ledger_id left join process on process.id = cutting_program.process_id WHERE cutting_program.order_id = ${ORDER_ID} ;`;

            DBCON.query(GET_CUTTINGPROGRAM_QUERY, (err,cuttingprogram)=>{
                if (err){
                    res.sendError(err);
                }else{
                    
                    shortage_details.cuttingprogram = cuttingprogram;

                const GET_PROCESSDETAILS_QUERY = `select ledger.ledger, process.process, jobwork_outward.inventory_qty_total as outward_qty_total ,jobwork_inward.inventory_qty_total as inward_qty_total, jobwork_outward.ledger_id, jobwork_outward.vouno, jobwork_inward.vouno from jobwork_outward left join jobwork_inward on jobwork_inward.process_id = jobwork_outward.to_process_id left join ledger on ledger.id = jobwork_outward.ledger_id left join process on process.id = jobwork_outward.to_process_id and jobwork_outward.from_process_id WHERE jobwork_outward.order_id = ${ORDER_ID} and jobwork_outward.to_process_id = ${PROCESS_ID};`;
                DBCON.query(GET_PROCESSDETAILS_QUERY,(err,processdetails) =>{
                    if(err){
                        res.sendError(err);
                    }else{
                        shortage_details.processdetails = [];
                        if(processdetails.length){
                            processdetails.map((process, key) => {
                                const FROMPROCESS_QUERY = `select process from process where id = ${process.from_process_id}`
                                DBCON.query(FROMPROCESS_QUERY,(err,fromprocess)=>{
                                    if(err){
                                        res.sendError(err);
                                    }else{
                                        processdetails.fromprocess = fromprocess[0] ? fromprocess[0].process : "";
                                        if(key === processdetails.index - 1)
                                        {
                                            shortage_details.processdetails=processdetails;
                                            res.sendInfo("", shortage_details)
                                        }
                                    }
                                })        
                            })
                        }
                        else{
                            res.sendInfo("", shortage_details)
                        }
                    }
                }
                )
                }
            }
            )
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


exports.getNextJobworkInvoiceVouNo = function(req, res){
    JobworkInvoice.getNextJobworkInvoiceVouNo((err, result) => {
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
    FabricOutward.getNextFabricOutwardVouNo((err, result) => {
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
    FabricReturn.getNextFabricReturnVouNo((err, result) => {
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
    FabricInvoice.getNextFabricInvoiceVouNo((err, result) => {
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
            // console.log(err);
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
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        GarmentsInvoice.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}



exports.deleteGarmentsInvoice = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        GarmentsInvoice.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Garments Invoice Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Garments Invoice Not Found! ")
    }

}

exports.getNextGarmentsInvoiceVouNo = function(req, res){
    GarmentsInvoice.getNextGarmentsInvoiceVouNo((err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result)
        }
    })
}

exports.getMarketingUserSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select id as value, name as name from users ', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}


exports.getLedgerForOrderAndProcessID = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select ledger_id  from order_process where order_process.order_id =? and order_process.process_id=?', [req.query.order_id,req.query.process_id],function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

//garments delivery note


exports.saveGarmentsDeliveryNote = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    GarmentsDeliveryNote.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getGarmentsDeliveryNote = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        GarmentsDeliveryNote.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        GarmentsDeliveryNote.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}



exports.deleteGarmentsDeliveryNote = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        GarmentsDeliveryNote.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Garments Delivery Note Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Garments Delivery Note Not Found! ")
    }

}

exports.getNextGarmentsDeliveryNoteVouNo = function(req, res){
    GarmentsDeliveryNote.getNextGarmentsDeliveryNoteVouNo((err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result)
        }
    })
}

//garments receipt note


exports.saveGarmentsReceiptNote = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    GarmentsReceiptNote.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getGarmentsReceiptNote = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        GarmentsReceiptNote.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        GarmentsReceiptNote.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}



exports.deleteGarmentsReceiptNote = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        GarmentsReceiptNote.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Garments Receipt Note Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Garments Receipt Note Not Found! ")
    }

}

exports.getNextGarmentsReceiptNoteVouNo = function(req, res){
    GarmentsReceiptNote.getNextGarmentsReceiptNoteVouNo((err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result)
        }
    })
}


//fabric outward report

exports.getFabricOutwardReport = (req, res) => {
    const ID = req.query.id;
    FabricOutward.getFabricOutwardReport(ID, (err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result);
        }
    })
}

exports.getNextJobworkOutwardVouNo = function(req, res){
    JobworkOutward.getNextJobworkOutwardVouNo((err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result)
        }
    })
}

//fabric Inward report

exports.getFabricInwardReport = (req, res) => {
    const ID = req.query.id;
    FabricInward.getFabricInwardReport(ID, (err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result);
        }
    })
}

//fabric Invoice report

exports.getFabricInvoiceReport = (req, res) => {
    const ID = req.query.id;
    FabricInvoice.getFabricInvoiceReport(ID, (err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result);
        }
    })
}

//knitting program


exports.saveKnittingProgram = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    KnittingProgram.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getKnittingProgram = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        KnittingProgram.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        KnittingProgram.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}



exports.deleteKnittingProgram = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        KnittingProgram.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Knitting Program Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Knitting Program Not Found! ")
    }

}

exports.getNextKnittingProgramVouNo = function(req, res){
    KnittingProgram.getNextKnittingProgramVouNo((err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result)
        }
    })
}

exports.getYarnSB = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select product.id as value, product.product as name from product left join product_category on product.product_category_id = product_category.id where product_category="YARN" ', function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getFabricOutwardInventoryDetails = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select fabric_outward_inventory.fabric_id, fabric_outward_inventory.color_id,fabric_outward_inventory.dia,fabric_outward_inventory.roll,fabric_outward_inventory.roll as max_roll,fabric_outward_inventory.weight,fabric_outward_inventory.weight as max_weight,fabric_outward_inventory.gsm from fabric_outward left join fabric_outward_inventory on fabric_outward_inventory.vou_id = fabric_outward.id where fabric_outward.ledger_id =?', req.query.ledger_id, function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getFabricInwardInventoryDetails = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select fabric_inward_inventory.fabric_id, fabric_inward_inventory.color_id,fabric_inward_inventory.dia,fabric_inward_inventory.roll,fabric_inward_inventory.roll as max_roll,fabric_inward_inventory.weight,fabric_inward_inventory.weight as max_weight,fabric_inward_inventory.gsm from fabric_inward left join fabric_inward_inventory on fabric_inward_inventory.vou_id = fabric_inward.id where fabric_inward.ledger_id =?', req.query.ledger_id, function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getYarnOutwardInventoryDetails = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select yarn_outward_inventory.fabric_id,yarn_outward_inventory.gsm,yarn_outward_inventory.counts,yarn_outward_inventory.qtybag_per,yarn_outward_inventory.qtybag_per as max_qtybag_per,yarn_outward_inventory.qty_bag,yarn_outward_inventory.qty_bag as max_qty_bag,yarn_outward_inventory.qty_kg from yarn_outward left join yarn_outward_inventory on yarn_outward_inventory.vou_id = yarn_outward.id where yarn_outward.ledger_id =?', req.query.ledger_id, function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getYarnInwardInventoryDetails = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select yarn_inward_inventory.fabric_id,yarn_inward_inventory.gsm,yarn_inward_inventory.counts,yarn_inward_inventory.qtybag_per,yarn_inward_inventory.qtybag_per as max_qtybag_per,yarn_inward_inventory.qty_bag,yarn_inward_inventory.qty_bag as max_qty_bag,yarn_inward_inventory.qty_kg from yarn_inward left join yarn_inward_inventory on yarn_inward_inventory.vou_id = yarn_inward.id where yarn_inward.ledger_id =?', req.query.ledger_id, function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data)
        }
    })
}

exports.getGarmentsDeliveryNotePrint = (req, res) => {
    GarmentsDeliveryNote.getGarmentsDeliveryNotePrint(req.query.id, (err, result) => {
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

exports.getGarmentsReceiptNotePrint = (req, res) => {
    GarmentsReceiptNote.getGarmentsReceiptNotePrint(req.query.id, (err, result) => {
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


exports.getJobworkInwardReport = (req, res) => {
    const ID = req.query.id;
    Jobwork_Inward.getJobworkInwardReport(ID, (err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result);
        }
    })
}


exports.getGarmentsDeliveryNoteInventoryDetails = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select garments_delivery_note_inventory.product_id, 0 as amount, 0 as disc_percentage, garments_delivery_note_inventory.unit,ifnull(garments_delivery_note_inventory.size1_qty, 0) as size1_qty,ifnull(garments_delivery_note_inventory.size1_qty, 0) as max_size1_qty,ifnull(garments_delivery_note_inventory.size2_qty, 0) as size2_qty,ifnull(garments_delivery_note_inventory.size2_qty, 0) as max_size2_qty,ifnull(garments_delivery_note_inventory.size3_qty, 0) as size3_qty,ifnull(garments_delivery_note_inventory.size3_qty, 0) as max_size3_qty,ifnull(garments_delivery_note_inventory.size4_qty, 0) as size4_qty,ifnull(garments_delivery_note_inventory.size4_qty, 0) as max_size4_qty,ifnull(garments_delivery_note_inventory.size5_qty, 0) as size5_qty,ifnull(garments_delivery_note_inventory.size5_qty, 0) as max_size5_qty,ifnull(garments_delivery_note_inventory.size6_qty, 0) as size6_qty,ifnull(garments_delivery_note_inventory.size6_qty, 0) as max_size6_qty,ifnull(garments_delivery_note_inventory.size7_qty, 0) as size7_qty,ifnull(garments_delivery_note_inventory.size7_qty, 0) as max_size7_qty,ifnull(garments_delivery_note_inventory.size8_qty, 0) as size8_qty,ifnull(garments_delivery_note_inventory.size8_qty, 0) as max_size8_qty,ifnull(garments_delivery_note_inventory.size9_qty, 0) as size9_qty,ifnull(garments_delivery_note_inventory.size9_qty, 0) as max_size9_qty from garments_delivery_note left join garments_delivery_note_inventory on garments_delivery_note_inventory.vou_id = garments_delivery_note.id where garments_delivery_note.ledger_id =?', req.query.ledger_id, function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            data.map((item, index) => {
                item.size_details = [];
                if(index === data.length - 1)
                {
                    res.sendInfo("", data)
                }
            })
        }
    })
}

//purchase order


exports.saveYarnPurchaseOrder = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    YarnPurchaseOrder.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getYarnPurchaseOrder = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        YarnPurchaseOrder.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        YarnPurchaseOrder.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}



exports.deleteYarnPurchaseOrder = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        YarnPurchaseOrder.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Yarn Purchase Order Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Yarn Purchase Order Not Found! ")
    }

}

exports.getNextYarnPurchaseOrderVouNo = function(req, res){
    YarnPurchaseOrder.getNextYarnPurchaseOrderVouNo((err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result)
        }
    })
}

exports.getHsnAndRateForProductId = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    var product_id = req.query.product_id ? req.query.product_id : null;
    DBCON.query('select id as product_id, unit_id,hsnsac,purchase_amount from product  where id = ? ', product_id, function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            res.sendInfo("", data[0])
        }
    })
}
//general purchase order


exports.saveGeneralPurchaseOrder = function (req, res) {
    const body = req.body;
    body.id = req.query.id;
    GeneralPurchaseOrder.checkAndSaveOrUpdate(body, (err, result, msg) => {
        if (err) {
            // console.log(err);
            res.sendError(err);
        } else {
            res.sendSuccess(msg, result)
        }
    })
}


exports.getGeneralPurchaseOrder = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        GeneralPurchaseOrder.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        GeneralPurchaseOrder.getAll((err, data) => {
            if (err) {
                // console.log(err)
                res.sendError(err)
            } else {
                res.sendSuccess("", data)
            }
        })
    }
}



exports.deleteGeneralPurchaseOrder = function (req, res) {
    const id = req.query.id;
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        GeneralPurchaseOrder.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("General Purchase Order Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("General Purchase Order Not Found! ")
    }

}

exports.getNextGeneralPurchaseOrderVouNo = function(req, res){
    GeneralPurchaseOrder.getNextGeneralPurchaseOrderVouNo((err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result)
        }
    })
}

exports.getGarmentsInvoiceInventoryDetails = function (req, res) {
    const body = req.body;
    const USER = req.user;
    body.company = USER.company
    const status = body.status ? body.status : 'active';
    DBCON.query('select garments_invoice_inventory.product_id,garments_invoice_inventory.color_id,ifnull(garments_invoice_inventory.size1_qty, 0) as size1,ifnull(garments_invoice_inventory.size1_qty, 0) as max_size1,ifnull(garments_invoice_inventory.size2_qty, 0) as size2,ifnull(garments_invoice_inventory.size2_qty, 0) as max_size2,ifnull(garments_invoice_inventory.size3_qty, 0) as size3,ifnull(garments_invoice_inventory.size3_qty, 0) as max_size3,ifnull(garments_invoice_inventory.size4_qty, 0) as size4,ifnull(garments_invoice_inventory.size4_qty, 0) as max_size4,ifnull(garments_invoice_inventory.size5_qty, 0) as size5,ifnull(garments_invoice_inventory.size5_qty, 0) as max_size5,ifnull(garments_invoice_inventory.size6_qty, 0) as size6,ifnull(garments_invoice_inventory.size6_qty, 0) as max_size6,ifnull(garments_invoice_inventory.size7_qty, 0) as size7,ifnull(garments_invoice_inventory.size7_qty, 0) as max_size7,ifnull(garments_invoice_inventory.size8_qty, 0) as size8,ifnull(garments_invoice_inventory.size8_qty, 0) as max_size8,ifnull(garments_invoice_inventory.size9_qty, 0) as size9,ifnull(garments_invoice_inventory.size9_qty, 0) as max_size9,garments_invoice_inventory.qty from garments_invoice left join garments_invoice_inventory on garments_invoice_inventory.vou_id = garments_invoice.id where garments_invoice.ledger_id =?', req.query.ledger_id, function (err, data) {
        if (err) {
            // console.log(err)
            res.sendError(err)
        } else {
            data.map((item, index) => {
                item.size_details = [];
                if(index === data.length - 1)
                {
                    res.sendInfo("", data)
                }
            })
        }
    })
}

exports.getOrderProgramReport = (req, res) => {
    const ID = req.query.id;
    OrderProgram.getOrderProgramReport(ID, (err, result) => {
        if(err)
        {
            res.sendError(err);
        }
        else{
            res.sendInfo("", result);
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
            // console.log(err);
            res.sendError(err);
        }
        else{
            res.sendInfo("",result);
        }
    });

}



exports.getSizeForProduct = (req, res) => {
    const PRODUCT_ID = req.query.product_id;
    if(issetNotEmpty(PRODUCT_ID))
    {
        DBCON.query(`select concat(size.size1, ",", size.size2, ",",size.size3, ",",size.size4, ",",size.size5, ",",size.size6, ",",size.size7, ",",size.size8, ",",size.size9) as sizes from product_details left join size on size.id = product_details.size_id where product_details.product_id = ${PRODUCT_ID}`, (err, result ) => {
            if(err)
            {
                res.sendError(err);
            }
            else{
                var sizes = result.length > 0 ? result[0].sizes !== null ? result[0].sizes : "" : "";
                // console.log(sizes);
                sizes = sizes.split(",");
                res.sendInfo("", sizes);
            }
        })
    }
    else{
        res.sendError("Product not found!")
    }
}


exports.getGarmentsInvoicePrint = (req, res) => {
    GarmentsInvoice.getGarmentsInvoicePrint(req.query.id, (err, result) => {
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
exports.getJobworkInvoice = function (req, res) {
    var ID = req.query.id;
    if (issetNotEmpty(ID)) {
        JobworkInvoice.find(Number(ID), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("", data);
            }
        })
    } else {
        JobworkInvoice.getAll((err, data) => {
            if (err) {
                // console.log(err)
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
    // console.log("ID : " + id);

    if (issetNotEmpty(id)) {
        JobworkInvoice.delete(Number(id), function (err, data) {
            if (err) {
                // console.log(err);
                res.sendError(err)
            } else {
                res.sendInfo("Jobwork Invoice Deleted Successfully!");
            }
        })
    } else {
        res.sendWarning("Jobwork Invoice Not Found! ")
    }

}
